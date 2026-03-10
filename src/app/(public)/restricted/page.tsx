import { Suspense } from 'react';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import RestrictedAccessComponent from '@/components/layout/RestrictedAccessComponent';

const RestrictedAccessPage = ({
  searchParams,
}: {
  searchParams?: any
}) => {
  const feature = searchParams?.feature;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      <RestrictedAccessComponent feature={feature} />
    </Suspense>
  );
};

export default RestrictedAccessPage;
