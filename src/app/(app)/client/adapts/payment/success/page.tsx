import { Suspense } from 'react';
import PaymentStatusSplash from '@/components/client/payments/PaymentStatusSplash';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

const PaymentSuccessPage = ({
  searchParams,
}: {
  searchParams?: any
}) => {
  const purchaseId = searchParams?.purchaseId;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      <PaymentStatusSplash purchaseId={purchaseId ? String(purchaseId) : ""} />
    </Suspense>
  );
};

export default PaymentSuccessPage;
