import { Card, CardContent } from '@/components/ui/card';
import clsx from 'clsx';
import React, { useState } from 'react';
import { IAdaptsPriceTier } from '@/types/settings';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { formatCents } from '@/utils/formatHelper';
import { Button } from '@/components/ui/button';
import usePaymentStore from '@/store/PaymentState';
import { useRouter } from 'next/navigation';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';

type PricingCardProps = {
  tier: IAdaptsPriceTier;
  active?: boolean;
  discount: number;
  index: number
};

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  active,
  discount,
  index
}) => {
  const router = useRouter();

  const [hovered, setHovered] = useState(false);
  const setSelectedTierId = useOrgRegistrationStore(s => s.setSelectedTierId);

  const handleRegister = () => {
    setSelectedTierId(tier.id)
    router.push('/organizations')
  }

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx('rounded-sm shadow hover:shadow-lg transition')}
      data-aos="fade-up"
      data-aos-delay={100 * index}
    >
      <CardContent className="relative text-left flex flex-col justify-between h-full">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-card-foreground">
              {tier.name}
            </h3>
            {active && <Badge variant="default">Most Popular</Badge>}
          </div>
          <div className="flex items-center gap-3 mb-1"></div>

          <p className="text-muted-foreground text-xs mb-5">
            {tier.description}
          </p>

          <div className="mb-5">
            <div className="flex items-baseline gap-1">
              <span className="text-muted-foreground text-lg">₱</span>
              <span className="text-4xl font-bold text">
                {formatCents(tier.unitAmount)}
              </span>
              <span className="text-muted-foreground text-sm">/seat</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs mt-1">
                {tier.minQty} - {tier.maxQty} seats
              </p>
              {discount > 0 ? (
                <span className="text-xs text-accent">
                  Save ₱{formatCents(discount)}/seat
                </span>
              ) : (
                ''
              )}
            </div>
          </div>

          <ul className="space-y-2.5 mb-6">
            {tier.features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant={active || hovered ? 'default' : 'outline'}
          size="lg"
          className="w-full"
          onClick={handleRegister}
        >
          Select Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
