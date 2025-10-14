import { EClientSegment, EGender } from '@/types/client';
import * as yup from 'yup';

const phoneRegExp = /^[0-9]{10}$/;

const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 6);

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your first name')
    .max(120)
    .nullable(),

  lastName: yup
    .string()
    .required('Please enter your last name')
    .max(120)
    .nullable(),

  username: yup
    .string()
    .required('Please enter your username')
    .max(120)
    .nullable(),

  email: yup
    .string()
    .email('Please enter a valid email address.')
    .nullable(),

  phone: yup
    .string()
    .matches(phoneRegExp, {
      message: 'Please enter a valid 10-digit phone number.',
      excludeEmptyString: false,
    })
    .nullable()
    // 👇 Custom test to ensure either email or phone is filled
    .test(
      'email-or-phone',
      'Please provide at least an email or phone number.',
      function (value) {
        const { email } = this.parent;
        return !!(value || email);
      }
    ),

  gender: yup.string().required('Please select your gender'),

  birthDate: yup
    .date()
    .required('Birthdate is required')
    .max(new Date(), 'Birthdate cannot be in the future')
    .max(minAgeDate, 'You must be at least 6 years old'),

  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]\\;/]/,
      "Password must contain at least one special character"
    )
    .max(100, 'Password must not exceed 100 characters'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'The passwords you entered must match'),
});

export interface ClientRegisterSchema {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  segment: EClientSegment;
  birthDate: Date | string;
  gender: EGender | string,
  email?: string;
  phone?: string;
  countryCode?: string;
}
