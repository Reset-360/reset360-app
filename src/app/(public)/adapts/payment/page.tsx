'use client';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createIndividualPurchase, createPaymongoCheckout, createPaymongoIntent } from '@/services/paymentService';
import { getIndividualPricing } from '@/services/settingService';
import useAuthStore from '@/store/AuthState';
import usePaymentStore from '@/store/PaymentState';
import { IAdaptsPriceTier } from '@/types/settings';
import { formatCents } from '@/utils/formatHelper';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';

const Payment = () => {
  const user = useAuthStore(s => s.user)

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [setting, setSetting] = useState<IAdaptsPriceTier>();

  const setPurchaseId = usePaymentStore(s => s.setPurchaseId)
  const setPaymentId = usePaymentStore(s => s.setPaymentId)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [setting] = await Promise.all([getIndividualPricing()]);
        setSetting(setting);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const router = useRouter();

  /**
   * 1. Create Purchase record
   * 2. Create paymongo intent
   */
  const handlePayment = async () => {
    try {
      if (!user?._id) return 

      setProcessing(true)
      const purchase = await createIndividualPurchase(user._id);
      
      if (!purchase) {
        toast.error('An error occurred when creating a purchase')
        return
      }

      const paymongoCheckout = await createPaymongoCheckout(purchase._id)
      const checkoutUrl = paymongoCheckout.checkoutUrl

      setPurchaseId(purchase._id)
      setPaymentId(paymongoCheckout.paymentId)
      
      router.replace(checkoutUrl)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setProcessing(false)
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="backdrop-blur-sm bg-gradient-to-br from-card/90 to-primary/5 border-primary/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">ADAPTS Assessment</CardTitle>
            <CardDescription>
              Unlock your personalized wellness insights
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">₱{formatCents(setting?.unitAmount ?? 0)}</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>

            <ul className="space-y-3">
              {[
                'Comprehensive 50-item self-report assessment to measure the presence and frequency of depression and anxiety symptoms',
                'Personalized insights & recommendations',
                'Detailed ADAPTS score breakdown',
                'Lifetime access to your results',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>You will be redirected to PayMongo secure checkout to complete your payment.`</span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              size="lg"
              onClick={handlePayment}
              className="w-full bg-primary hover:opacity-90 transition-opacity text-primary-foreground"
              disabled={isProcessing}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
