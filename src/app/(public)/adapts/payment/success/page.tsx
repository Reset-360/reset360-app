import { Suspense } from 'react';
import PaymentStatusComponent from './component/PaymentStatusComponent';
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
      <PaymentStatusComponent purchaseId={purchaseId ? String(purchaseId) : ""} />
    </Suspense>
  );
};

export default PaymentSuccessPage;
