import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Receipt, 
  User, 
  Building2, 
  Mail, 
  Phone,
  Calendar,
  Hash
} from "lucide-react";
import { IPurchase } from '@/types/payment';
import { formatCents, formatDate } from '@/utils/formatHelper';

interface ReceiptPreviewProps {
  purchase: IPurchase | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "paid": return "default";
    case "pending": return "secondary";
    case "failed": return "destructive";
    default: return "outline";
  }
};

const getItemDisplayName = (code: string) => {
  switch (code) {
    case "ADAPTS_SEAT": return "ADAPTS Assessment Seat";
    default: return code;
  }
};

export const ReceiptPreview = ({ purchase, open, onOpenChange }: ReceiptPreviewProps) => {
  if (!purchase) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Receipt className="w-5 h-5 text-primary" />
            Receipt Preview
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 pr-4">
            {/* Header with Ref and Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {purchase.ref}
                </code>
              </div>
              <Badge variant={getStatusBadgeVariant(purchase.status)} className="capitalize">
                {purchase.status}
              </Badge>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(purchase.createdAt)}
            </div>

            <Separator />

            {/* Buyer Information */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                {purchase.buyer.type === "organization" ? (
                  <Building2 className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-primary" />
                )}
                {purchase.buyer.type === "organization" ? "Organization" : "Individual"}
              </h4>
              
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                {purchase.buyer.organizationName && (
                  <p className="font-medium text-foreground">
                    {purchase.buyer.organizationName}
                  </p>
                )}
                <p className="text-sm text-foreground">{purchase.buyer.contactName}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {purchase.buyer.contactEmail}
                </div>
                {purchase.buyer.contactPhone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {purchase.buyer.contactPhone}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Items</h4>
              <div className="space-y-2">
                {purchase.pricingSnapshot.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between bg-muted/30 rounded-lg p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {getItemDisplayName(item.code)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCents(item.unitAmount)} × {item.quantity}
                      </p>
                      {item.matchedTierName && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {item.matchedTierName}
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-foreground">
                      {formatCents(item.totalAmount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatCents(purchase.pricingSnapshot.subtotalAmount)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-foreground">Total</span>
                <span className="text-primary">
                  {formatCents(purchase.pricingSnapshot.totalAmount)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 text-center text-xs text-muted-foreground">
              <p>Thank you for your purchase!</p>
              <p className="mt-1">Reference: {purchase.ref}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
