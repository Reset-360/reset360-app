import { Suspense } from 'react';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import OrgPaymentStatusSplash from '@/components/views/organization/dashboard/splash/OrgPaymentStatusSplash';

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
      <OrgPaymentStatusSplash purchaseId={purchaseId ? String(purchaseId) : ""} />
    </Suspense>
  );
};

export default PaymentSuccessPage;
