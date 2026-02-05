'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import clsx from 'clsx';
import {
  Building2,
  Calendar,
  ExternalLink,
  Eye,
  Package,
  Receipt,
  User,
} from 'lucide-react';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  getAssessmentByUserId,
  getLatestAssessment,
} from '@/services/adaptsService';
import useAuthStore from '@/store/AuthState';
import { ERiskLevel, IAssessment } from '@/types/adapts';
import {
  getRiskLevelColor,
  getRiskTextColor,
} from '@/utils/adaptsResultHelper';
import ResultDetailsDialog from '@/components/client/history/ResultDetailsDialog';
import { IPurchase } from '@/types/payment';
import { getClientPurchases } from '@/services/clientService';
import { formatCents, formatDate } from '@/utils/formatHelper';
import { ReceiptPreview } from '@/components/client/orders/ReceiptPreview';

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'paid':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getItemDisplayName = (code: string) => {
  switch (code) {
    case 'ADAPTS_SEAT':
      return 'ADAPTS Assessment Seat';
    default:
      return code;
  }
};

const HistoryPage = () => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [isLoading, setIsLoading] = useState(true);
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<IPurchase | null>(
    null
  );
  const [receiptOpen, setReceiptOpen] = useState(false);

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchAll = async () => {
      try {
        const data = await getClientPurchases();

        setPurchases(data.purchases);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  // Calculate stats
  const totalOrders = purchases.length;
  const paidOrders = purchases.filter((p) => p.status === 'paid').length;
  const totalSpent = purchases
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.pricingSnapshot.totalAmount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-10 px-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order <span className="text-primary">History</span>
        </h1>
        <p className="text-muted-foreground">
          Here’s everything you’ve ordered.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 bg-card border-border/50 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">
                {totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border/50 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-foreground">{paidOrders}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border/50 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-foreground">
                {formatCents(totalSpent)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <span className="text-amber-600 font-semibold">₱</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-card border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                All Orders
              </h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              {purchases.length} total
            </Badge>
          </div>
        </div>

        {purchases.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">
                  Reference
                </TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Items</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase, index) => (
                <TableRow
                  key={purchase.ref}
                  className="border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {purchase.ref}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(purchase.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {purchase.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm text-foreground">
                            {getItemDisplayName(item.code)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            ×{item.quantity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">
                        {formatCents(purchase.pricingSnapshot.totalAmount)}
                      </p>
                      {purchase.pricingSnapshot.items[0]?.matchedTierName && (
                        <p className="text-xs text-green-600">
                          {purchase.pricingSnapshot.items[0].matchedTierName}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(purchase.status)}
                      className="capitalize"
                    >
                      {purchase.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setSelectedPurchase(purchase);
                        setReceiptOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Receipt className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No orders yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Your purchase history will appear here.
            </p>
          </div>
        )}
      </Card>

      {/* Receipt Preview Dialog */}
      <ReceiptPreview
        purchase={selectedPurchase}
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
      />
    </div>
  );
};

export default HistoryPage;
