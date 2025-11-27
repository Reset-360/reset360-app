'use client';

import useAuthStore from '@/store/AuthState';
import { formatName } from '@/utils/formatHelper';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AdaptsCTA } from '@/components/client/adapts/AdaptsCTA';

export default function ClientDashboardPage() {
  const profile = useAuthStore((state) => state.clientProfile);

  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl font-main font-bold text-gray-800 mb-4">
        Hello{' '}
        <span className="text-primary capitalize">
          {formatName(profile?.firstName ?? '')},
        </span>
      </h2>
      <p className="text-gray-600 mb-8">
        Here’s a quick overview of your recent activity and progress.
      </p>

      <div className="grid md:grid-cols-3 gap-6 hidden">
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600 mb-2">
            ADAPTS Score
          </h3>
          <p className="text-4xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500 mt-2">Last updated 3 days ago</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600 mb-2">
            Next Session
          </h3>
          <p className="text-gray-800 font-medium">--</p>
          <p className="text-sm text-gray-500 mt-2">with Coach ---</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-violet-600 mb-2">
            Total Sessions
          </h3>
          <p className="text-4xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-500 mt-2">Keep up the progress!</p>
        </div>
      </div>

      <div className="my-5">
        <AdaptsCTA />
      </div>
    </div>
  );
}
