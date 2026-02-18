import { Card, CardContent } from '@/components/ui/card';
import { IAdaptsPriceTier } from '@/types/settings';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import { ShoppingCart, RefreshCw } from 'lucide-react';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import { formatCents } from '@/utils/formatHelper';
import SectionHeader from '../SectionHeader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ConfirmSeatsAndPlanFormProps {
  tiers: IAdaptsPriceTier[];
  formRef: any;
}

const ConfirmSeatsAndPlanForm: React.FC<ConfirmSeatsAndPlanFormProps> = ({
  tiers,
  formRef,
}) => {
  const selectedTierId = useOrgRegistrationStore((s) => s.selectedTierId);
  const setSelectedTierId = useOrgRegistrationStore((s) => s.setSelectedTierId);
  const showPlanPicker = useOrgRegistrationStore((s) => s.showPlanPicker);
  const setShowPlanPicker = useOrgRegistrationStore((s) => s.setShowPlanPicker);
  const seats = useOrgRegistrationStore((s) => s.seats);
  const setSeats = useOrgRegistrationStore((s) => s.setSeats);

  const [seatCount, setSeatCount] = useState(seats ?? 0);

  const plan = selectedTierId
    ? tiers?.find((t) => t.id === selectedTierId)
    : tiers[0];

  const total = useMemo(() => {
    const seatCost = plan?.unitAmount as number;

    return seatCount * seatCost;
  }, [plan, seatCount]);

  const handlePlanSelect = (tierId: string) => {
    const plan = tiers?.find((t) => t.id === tierId);
    if (plan) setSeatCount(plan.minQty);

    setSelectedTierId(tierId);
    setShowPlanPicker(false);
  };

  const onValidate = (values: any) => {
    const errors: Partial<Record<any, string>> = {};

    if (!values.seats) {
      errors.seats = 'Number of seats is required';
    } else {
      if (plan?.minQty !== undefined && values.seats < plan.minQty) {
        errors.seats = `Seats must be at least ${plan.minQty}`;
      }

      if (plan?.maxQty !== undefined && values.seats > plan.maxQty) {
        errors.seats = `Seats cannot exceed ${plan.maxQty}`;
      }
    }

    return errors;
  };

  const onSubmit = (values: any) => {
    setSeats(values.seats);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="form-section space-y-5">
          <SectionHeader
            title="Confirm Plan & Seat Quantity"
            icon={ShoppingCart}
          />

          {/* Compact Plan Confirmation */}
          {!showPlanPicker ? (
            <div className="rounded-xl border-2 border-primary p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Selected Plan
                  </p>
                  <p className="text-xl font-extrabold text-foreground mt-0.5">
                    {plan?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary">
                    ₱{formatCents(plan?.unitAmount ?? 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">/ seat</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Seat Range:{' '}
                <span className="font-medium text-foreground">
                  {plan?.minQty} - {plan?.maxQty}
                </span>
              </p>

              <button
                type="button"
                onClick={() => setShowPlanPicker(true)}
                className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change Plan
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">
                Choose your plan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {tiers?.map((tier, i) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handlePlanSelect(tier.id)}
                    className={`border-2 rounded-sm p-3 border-primary tier-card text-left ${tier.id === selectedTierId ? 'bg-primary/10' : ''}`}
                  >
                    <p className="font-semibold text-foreground text-sm">
                      {tier.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tier.minQty} - {tier.maxQty}
                    </p>
                    <p className="mt-2">
                      <span className="text-xl font-extrabold text-primary">
                        ₱{formatCents(tier.unitAmount ?? 0)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {' '}
                        / seat
                      </span>
                    </p>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowPlanPicker(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Seat Input */}
          <Formik
            innerRef={formRef}
            initialValues={{
              seats: seatCount,
            }}
            validate={onValidate}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <Label htmlFor="orgName">
                    Number of Seats <span className="text-primary">*</span>
                  </Label>
                  <Field
                    as={Input}
                    type="number"
                    name="seats"
                    placeholder="1"
                    required
                    onChange={(e: any) => {
                      setFieldValue('seats', e.target.value);
                      setSeatCount(e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="seats"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </Form>
            )}
          </Formik>

          {/* Live Total */}
          <div className="rounded-xl border border-border bg-muted/40 p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium text-foreground">{plan?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Seats</span>
              <span className="font-medium text-foreground">{seatCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per Seat</span>
              <span className="font-medium text-foreground">
                ₱{formatCents(plan?.unitAmount ?? 0)}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-baseline">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-extrabold text-2xl text-primary">
                ₱{formatCents(total ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfirmSeatsAndPlanForm;
