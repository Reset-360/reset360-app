import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import { IAdaptsPriceTier } from '@/types/settings';
import React, { useMemo, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { schema } from '@/forms/useOrgBillingSchema';
import SectionHeader from '../SectionHeader';
import {
  Building2,
  CreditCard,
  FileText,
  Mail,
  User,
} from 'lucide-react';
import { formatCents, toCents } from '@/utils/formatHelper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import TermsOfServiceDialog from './TermsOfServiceDialog';
import DataProcessingAgreementDialog from './DataProcessingAgreementDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';

const INTENDED_USES = [
  'Hiring / Pre-employment',
  'Student Screening',
  'Employee Wellness',
  'Research',
  'Clinical',
  'Others',
];

interface LicenseAndBillingFormProps {
  formRef: any;
  goNext: () => void;
  tiers: IAdaptsPriceTier[];
}

const LicenseAndBillingForm: React.FC<LicenseAndBillingFormProps> = ({
  formRef,
  tiers,
  goNext,
}) => {
  const seats = useOrgRegistrationStore((s) => s.seats);
  const selectedTierId = useOrgRegistrationStore((s) => s.selectedTierId);
  const billingProfile = useOrgRegistrationStore((s) => s.billingProfile);
  const setBillingProfile = useOrgRegistrationStore((s) => s.setBillingProfile);

  const [showTosModal, setShowTosModal] = useState(false);
  const [showDpaModal, setShowDpaModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const plan = tiers.find((t) => t.id === selectedTierId);
  const total = useMemo(() => seats * (plan?.unitAmount ?? 0), [plan, seats]);

  return (
    <>
      <Formik
        innerRef={formRef}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          intendedUse: billingProfile?.intendedUse ?? '',

          billingContact: billingProfile?.billingContact ?? '',
          billingEmail: billingProfile?.billingEmail ?? '',

          billingAddress: billingProfile?.billingAddress ?? '',
          vatId: billingProfile?.vatId ?? '',

          agreeTos: billingProfile?.agreeTos ?? false,
          agreeDpa: billingProfile?.agreeDpa ?? false,
          agreePrivacy: billingProfile?.agreePrivacy ?? false,
          confirmAuthority: billingProfile?.confirmAuthority ?? false,
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          // ✅ only runs if valid
          setBillingProfile({
            intendedUse: values.intendedUse || undefined,

            billingContact: values.billingContact || undefined,
            billingEmail: values.billingEmail,

            billingAddress: values.billingAddress,
            vatId: values.vatId || undefined,

            agreeTos: values.agreeTos,
            agreeDpa: values.agreeDpa,
            agreePrivacy: values.agreePrivacy,
            confirmAuthority: values.confirmAuthority,

            totalAmount: total,
          });

          goNext();
          actions.setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-6">
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-5">
                  <SectionHeader
                    title="Licensing & Billing Setup"
                    icon={CreditCard}
                  />

                  {/* Compact order reminder */}
                  {plan && (
                    <div className="rounded-xl border border-primary bg-primary/10 p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Plan:
                        </div>{' '}
                        <div className="text-lg text-foreground">
                          {plan.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Number of Seats:
                        </div>{' '}
                        <div className="text-lg text-foreground">{seats}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Estimated Total:
                        </div>{' '}
                        <div className="font-extrabold text-primary text-lg">
                          ₱{formatCents(total)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Intended Use (shadcn Select -> Formik) */}
                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <FileText className="w-4 h-4 text-primary" /> Intended Use
                    </label>

                    <Select
                      value={values.intendedUse}
                      onValueChange={(v) => {
                        setFieldValue('intendedUse', v);
                        setFieldTouched('intendedUse', true, false);
                      }}
                    >
                      <SelectTrigger className="w-full bg-card">
                        <SelectValue placeholder="Select intended use" />
                      </SelectTrigger>
                      <SelectContent>
                        {INTENDED_USES.map((u: string) => (
                          <SelectItem key={u} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <ErrorMessage
                      name="intendedUse"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardContent className="space-y-5">
                  <h3 className="text-sm font-bold text-foreground">
                    Billing Information
                  </h3>
                  <p className="text-xs text-muted-foreground -mt-3">
                    Payment will be processed securely via PayMongo checkout.
                  </p>

                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <User className="w-4 h-4 text-primary" />
                      Billing Contact (if different)
                    </Label>
                    <Field
                      as={Input}
                      name="billingContact"
                      placeholder="Billing contact name"
                    />
                    <ErrorMessage
                      name="billingContact"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Building2 className="w-4 h-4 text-primary" />
                      Billing Address <span className="text-primary">*</span>
                    </Label>
                    <Field
                      as={Input}
                      name="billingAddress"
                      placeholder="123 Main Street, City, Country"
                    />
                    <ErrorMessage
                      name="billingAddress"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                        <Mail className="w-4 h-4 text-primary" />
                        Billing Email <span className="text-primary">*</span>
                      </Label>
                      <Field
                        as={Input}
                        name="billingEmail"
                        type="email"
                        placeholder="billing@organization.com"
                      />
                      <ErrorMessage
                        name="billingEmail"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                        <FileText className="w-4 h-4 text-primary" />
                        VAT / Tax ID (if applicable)
                      </Label>
                      <Field as={Input} name="vatId" placeholder="VAT number" />
                      <ErrorMessage
                        name="vatId"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Agreements */}
              <Card>
                <CardContent className="form-section space-y-4">
                  <h3 className="text-sm font-bold text-foreground">
                    Legal Agreements
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={values.agreeTos}
                        onCheckedChange={(v) => {
                          setFieldValue('agreeTos', v === true);
                          setFieldTouched('agreeTos', true, false);
                        }}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => setShowTosModal(true)}
                          className="text-primary font-medium hover:underline cursor-pointer"
                        >
                          Terms of Service
                        </button>
                      </span>
                    </label>
                    <ErrorMessage
                      name="agreeTos"
                      component="div"
                      className="text-red-500 text-xs -mt-2 ml-7"
                    />

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={values.agreeDpa}
                        onCheckedChange={(v) => {
                          setFieldValue('agreeDpa', v === true);
                          setFieldTouched('agreeDpa', true, false);
                        }}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => setShowDpaModal(true)}
                          className="text-primary font-medium hover:underline cursor-pointer"
                        >
                          Data Processing Agreement
                        </button>
                      </span>
                    </label>
                    <ErrorMessage
                      name="agreeDpa"
                      component="div"
                      className="text-red-500 text-xs -mt-2 ml-7"
                    />

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={values.agreePrivacy}
                        onCheckedChange={(v) => {
                          setFieldValue('agreePrivacy', v === true);
                          setFieldTouched('agreePrivacy', true, false);
                        }}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I acknowledge and accept the{' '}
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="text-primary font-medium hover:underline cursor-pointer"
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                    <ErrorMessage
                      name="agreePrivacy"
                      component="div"
                      className="text-red-500 text-xs -mt-2 ml-7"
                    />

                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={values.confirmAuthority}
                        onCheckedChange={(v) => {
                          setFieldValue('confirmAuthority', v === true);
                          setFieldTouched('confirmAuthority', true, false);
                        }}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I confirm authority to enter this agreement on behalf of
                        the organization
                      </span>
                    </label>
                    <ErrorMessage
                      name="confirmAuthority"
                      component="div"
                      className="text-red-500 text-xs -mt-2 ml-7"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Form>
        )}
      </Formik>

      <TermsOfServiceDialog
        open={showTosModal}
        onOpenChange={setShowTosModal}
      />
      <DataProcessingAgreementDialog
        open={showDpaModal}
        onOpenChange={setShowDpaModal}
      />
      <PrivacyPolicyDialog
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
      />
    </>
  );
};

export default LicenseAndBillingForm;
