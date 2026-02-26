import * as Yup from "yup";

export const schema = Yup.object({
  intendedUse: Yup.string().required('Choose intended usage'),

  billingContact: Yup.string().nullable(),
  billingEmail: Yup.string().email("Enter a valid email").required("Billing email is required"),

  billingAddress: Yup.string().required("Billing address is required"),
  vatId: Yup.string().nullable(),

  agreeTos: Yup.boolean().oneOf(
    [true],
    'You must agree to the Terms of Service'
  ),
  agreeDpa: Yup.boolean().oneOf(
    [true],
    'You must agree to the Data Processing Agreement'
  ),
  agreePrivacy: Yup.boolean().oneOf(
    [true],
    'You must agree to the Privacy Policy Agreement'
  ),
  confirmAuthority: Yup.boolean().oneOf([true], 'You must confirm authority'),
});

export type BillingProfile = {
  intendedUse?: string;

  billingContact?: string;
  billingEmail: string;
  poNumber?: string;

  billingAddress: string;
  vatId?: string;

  agreeTos: boolean;
  agreeDpa: boolean;
  agreePrivacy: boolean;
  confirmAuthority: boolean;

  totalAmount: number;
};

