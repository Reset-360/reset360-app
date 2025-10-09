'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { schema } from '@/forms/useRegisterSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, subYears } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Helper: minimum age = 6 years old
const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 6);
// Default selected = today - 18 years
const defaultDate = subYears(new Date(), 18);

const RegisterPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="w-full md:w-[80%] flex flex-col mx-auto px-4 md:px-0 py-8">
      {/* Logo */}
      <nav className="mb-8">
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo/logo_32.png"
            alt="Reset 360 Logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-sans font-bold text-violet-500">
            Reset 360
          </span>
        </Link>
      </nav>

      {/* Register Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
        <p className="text-md text-muted-foreground mb-6">
          Begin your reset: your journey to balance starts here.
        </p>

        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: '',
            gender: '',
            birthDate: defaultDate,
            email: '',
            phone: '',
            countryCode: '+63',
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting }) => {
            setError('');
            try {
              console.log('Form data:', values);
              // router.push('/dashboard');
            } catch {
              setError('Something went wrong. Please try again.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-5">
              {/* Fake fields to prevent autofill */}
              <input
                type="text"
                name="fakeusernameremembered"
                autoComplete="off"
                className="hidden"
              />
              <input
                type="password"
                name="fakepasswordremembered"
                autoComplete="new-password"
                className="hidden"
              />

              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Field
                  as={Input}
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoComplete="new-username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Field
                    as={Input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  type="text"
                  name="email"
                  placeholder="Email"
                  autoComplete="new-email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="flex gap-3">
                  <Select
                    value={values.countryCode}
                    onValueChange={(val) => setFieldValue('countryCode', val)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="+Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+63">+63</SelectItem>
                      <SelectItem value="+9">+9</SelectItem>
                    </SelectContent>
                  </Select>

                  <Field name="phone">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        inputMode="numeric"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFieldValue('phone', value);
                        }}
                        className="flex-1"
                      />
                    )}
                  </Field>
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Birthdate + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Birthdate */}
                <div>
                  <Label htmlFor="birthDate">Birthdate</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !values.birthDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {values.birthDate
                          ? format(new Date(values.birthDate), 'PPP')
                          : 'Select your birthdate'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          values.birthDate
                            ? new Date(values.birthDate)
                            : defaultDate
                        }
                        onSelect={(date) => {
                          if (date) {
                            setFieldValue('birthDate', date);
                          } else {
                            setFieldValue('birthDate', defaultDate);
                          }
                          setOpen(false);
                        }}
                        defaultMonth={defaultDate}
                        captionLayout="dropdown"
                        disabled={(date) =>
                          date > new Date() || date > minAgeDate
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Gender */}
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => setFieldValue('gender', value)}
                    defaultValue={values.gender}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                {isSubmitting ? 'Creating your account...' : 'Create Account'}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <hr className="my-8 border-t border-muted-foreground/40" />
        <p className="text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-foreground font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
