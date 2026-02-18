import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { schema } from '@/forms/useOrgProfileSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import SectionHeader from '../SectionHeader';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  Shield,
  Users,
  FileText,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import { COUNTRIES } from '@/constants/country';

const ORG_TYPES = [
  'Private',
  'Government',
  'NGO',
  'School',
  'Healthcare',
  'Other',
];
const ORG_SIZES = ['1–10', '11–50', '51–200', '201–1000', '1000+'];

interface OrganizationInfoFormProps {
  formRef: any;
  goNext: () => void;
}

const OrganizationInfoForm: React.FC<OrganizationInfoFormProps> = ({
  formRef,
  goNext,
}) => {
  const { setOrgProfile, orgProfile: profile } = useOrgRegistrationStore();

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        orgName: profile?.orgName ?? '',
        orgType: profile?.orgType ?? '',
        industry: profile?.industry ?? '',
        orgSize: profile?.orgSize ?? '',
        website: profile?.website ?? '',
        country: profile?.country ?? '',
        taxId: profile?.taxId ?? '',

        adminName: profile?.adminName ?? '',
        adminTitle: profile?.adminTitle ?? '',
        adminEmail: profile?.adminEmail ?? '',
        adminPhone: profile?.adminPhone ?? '',
        itContact: profile?.itContact ?? '',
      }}
      validationSchema={schema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        // ✅ this only runs when valid
        setOrgProfile({
          orgName: values.orgName,
          orgType: values.orgType,
          industry: values.industry || undefined,
          orgSize: values.orgSize || undefined,
          website: values.website || undefined,
          country: values.country,
          taxId: values.taxId || undefined,

          adminName: values.adminName,
          adminTitle: values.adminTitle || undefined,
          adminEmail: values.adminEmail,
          adminPhone: values.adminPhone,
          itContact: values.itContact || undefined,
        });

        goNext(); // ✅ move step forward

        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue, setFieldTouched, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-6">
            {/* Organization Information */}
            <Card>
              <CardContent className="space-y-5">
                <SectionHeader
                  title="Organization Information"
                  icon={Building2}
                />

                <div>
                  <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-4 h-4 text-primary" />
                    Legal Organization Name{' '}
                    <span className="text-primary">*</span>
                  </Label>

                  {/* If your InputField is a simple controlled component, easiest is just Field as={Input} */}
                  <Field
                    as={Input}
                    name="orgName"
                    placeholder="Acme Corporation"
                  />

                  <ErrorMessage
                    name="orgName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <Building2 className="w-4 h-4 text-primary" />
                    Organization Type <span className="text-primary">*</span>
                  </label>

                  {/* shadcn Select isn't a native input, so we wire it via setFieldValue */}
                  <Select
                    value={values.orgType}
                    onValueChange={(v) => {
                      setFieldValue('orgType', v);
                      setFieldTouched('orgType', true, false);
                    }}
                  >
                    <SelectTrigger className="w-full bg-card">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ORG_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {touched.orgType ? (
                    <ErrorMessage
                      name="orgType"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Building2 className="w-4 h-4 text-primary" />
                      Industry / Sector
                    </Label>
                    <Field
                      as={Input}
                      name="industry"
                      placeholder="Healthcare, Education, etc."
                    />
                    <ErrorMessage
                      name="industry"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-2">
                      <Users className="w-4 h-4 text-primary" /> Organization
                      Size
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {ORG_SIZES.map((size) => {
                        const active = values.orgSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              setFieldValue('orgSize', size);
                              setFieldTouched('orgSize', true, false);
                            }}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                              active
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-card text-foreground border-border hover:border-primary/50'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>

                    <ErrorMessage
                      name="orgSize"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Globe className="w-4 h-4 text-primary" />
                      Website URL
                    </Label>
                    <Field
                      as={Input}
                      name="website"
                      placeholder="https://www.organization.com"
                    />
                    <ErrorMessage
                      name="website"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Globe className="w-4 h-4 text-primary" />
                      Country <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={values.country}
                      onValueChange={(value) => {
                        setFieldValue('country', value);
                        setFieldTouched('country', true, false);
                      }}
                    >
                      <SelectTrigger className="w-full bg-card">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>

                      <SelectContent className="max-h-60">
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <FileText className="w-4 h-4 text-primary" />
                    Tax ID / Registration Number (Optional)
                  </Label>
                  <Field
                    as={Input}
                    name="taxId"
                    placeholder="e.g., 123-456-789"
                  />
                  <ErrorMessage
                    name="taxId"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Primary Administrator */}
            <Card>
              <CardContent className="form-section space-y-5">
                <SectionHeader title="Primary Administrator" icon={User} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <User className="w-4 h-4 text-primary" />
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Field
                      as={Input}
                      name="adminName"
                      placeholder="Juan Dela Cruz"
                    />
                    <ErrorMessage
                      name="adminName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <User className="w-4 h-4 text-primary" />
                      Title / Role
                    </Label>
                    <Field
                      as={Input}
                      name="adminTitle"
                      placeholder="HR Director"
                    />
                    <ErrorMessage
                      name="adminTitle"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Mail className="w-4 h-4 text-primary" />
                      Work Email <span className="text-primary">*</span>
                    </Label>
                    <Field
                      as={Input}
                      name="adminEmail"
                      type="email"
                      placeholder="admin@organization.com"
                    />
                    <ErrorMessage
                      name="adminEmail"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number <span className="text-primary">*</span>
                    </Label>
                    <Field
                      as={Input}
                      name="adminPhone"
                      placeholder="+63 912 345 6789"
                    />
                    <ErrorMessage
                      name="adminPhone"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1.5">
                    <User className="w-4 h-4 text-primary" />
                    IT Contact (Optional)
                  </Label>
                  <Field
                    as={Input}
                    name="itContact"
                    placeholder="IT Department contact"
                  />
                  <ErrorMessage
                    name="itContact"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <p className="text-xs text-muted-foreground bg-accent/10 rounded-lg p-3 border border-accent">
                  <Shield className="w-3.5 h-3.5 inline-block mr-1 text-accent" />
                  This user will have Super Admin access to manage seats,
                  billing, and reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizationInfoForm;
