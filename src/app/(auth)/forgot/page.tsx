'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { schema } from '@/forms/useLoginSchema';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="w-full md:w-[80%] flex flex-col">
      <nav>
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1"
        >
          <Image
            src="/logo/logo_32.png"
            alt="Reset 360 Logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-sans font-bold text-violet-500 ">
            Reset 360
          </span>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col justify-center">
        <div className="">
          <h2 className="text-2xl">Recover your account</h2>
          <p className="text-md text-muted-foreground leading-none mb-5 max-w-[280px]">
            Forgot your password? Just enter your username and we’ll help you
            recover access.
          </p>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              setError('');
              try {
                console.log('Form data:', values);
                // Example: await api.post("/auth/login", values)
                // router.push('/dashboard');
              } catch (err) {
                setError('Invalid credentials');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Field
                    as={Input}
                    type="username"
                    name="username"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Recovering...' : 'Continue'}
                </Button>
              </Form>
            )}
          </Formik>

          <hr className="my-6 border-t border-muted-foreground" />
          <p className="text-center text-muted-foreground">
            Go back to{' '}
            <Link href="/login" className="text-foreground">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
