import * as Yup from 'yup';

const phoneRegExp = /^[0-9]{10}$/;

export const schema = Yup.object().shape({
  orgName: Yup.string().required('Organization name is required'),
  orgType: Yup.string().required('Organization type is required'),
  industry: Yup.string().nullable(),
  orgSize: Yup.string().nullable(),
  website: Yup.string()
    .nullable()
    .test('is-url-or-empty', 'Enter a valid URL', (v) => {
      if (!v) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    }),
  country: Yup.string().required('Country/Region is required'),
  taxId: Yup.string().nullable(),

  adminName: Yup.string().required('Full name is required'),
  adminTitle: Yup.string().nullable(),
  adminEmail: Yup.string()
    .email('Enter a valid email')
    .required('Work email is required'),
  adminPhone: Yup.string()
    .matches(phoneRegExp, {
      message: 'Please enter a valid 10-digit phone number.',
      excludeEmptyString: false,
    })
    .required('Phone number is required'),
  itContact: Yup.string().nullable(),
});

export interface OrgRegistrationProfile {
  orgName: string;
  orgType: string;
  industry?: string;
  orgSize?: string;
  website?: string;
  country: string;
  taxId?: string;

  adminName: string;
  adminTitle?: string;
  adminEmail: string;
  adminPhone: string;
  itContact?: string;
}
