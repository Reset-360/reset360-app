'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@/components/ui/button';
import { schema } from '@/forms/useLoginSchema';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { getUser, loginUser } from '@/services/authService';
import { renderApiError } from '@/lib/utils';
import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import { getClientProfile } from '@/services/clientService';
import useAuthStore from '@/store/AuthState';
import { EUserRole } from '@/types/user';
import { getMemberProfile, getOrgLatestPurchase } from '@/services/organizationService';
import { useOrgStore } from '@/store/OrgState';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const { redirectByRole } = useRoleRedirect();
  const { setUser, setClientProfile, setOrgMember } = useAuthStore(state => state);
  const { setOrganization, setPurchase, setSeatBatch } = useOrgStore(state => state);

  const handleLoginSubmit = async (
    values: any,
    setSubmitting: (isSubmitting: boolean) => void,
    setErrors: (errors: any ) => void
  ) => {
    try {
      const response = await loginUser(values);
      const user = await getUser();

      if (user.role == EUserRole.ADMIN) {
        setErrors({ password: 'Username or password did not match.'})
        return
      }
      
      // setup store data
      setUser(user);

      switch (user.role) {
        case EUserRole.CLIENT: {
          const profile = await getClientProfile(user._id);
          setClientProfile(profile);
          break;
        }
        case EUserRole.COACH: {
          console.log('prep coach');
          break;
        }
        case EUserRole.ORG_ADMIN: {
          const member = await getMemberProfile(user._id);
          const org = member.organization;
          setOrgMember(member)
          setOrganization(member.organization)
          
          const dataRecord = await getOrgLatestPurchase(org._id)
          if (dataRecord) {
            setPurchase(dataRecord.purchase)
            setSeatBatch(dataRecord.batch)

            if (needsSeatGeneration(dataRecord.batch)) {
              // Go to setup screen FIRST
              router.replace("/org-setup");
              return; // stop normal redirect
            }
          }
          
          break;
        }
      }

      redirectByRole(user.role);
    } catch (err: any) {
      if (err.message == 'Invalid credentials' || err.id == 'Profile not found') {
        setErrors({ password: 'Username or password did not match.'})
        return
      }

      renderApiError(err);
      console.log(err)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-[80%] flex flex-col">
      <nav>
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1"
        >
          <Image
            src="/logo/reset360_full_250.png"
            alt="Reset 360 Logo"
            width={150}
            height={50}
          />
        </Link>
      </nav>

      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold font-main">
            Hello, Welcome back to{' '}
            <span className="text-primary">Reset 360</span>
          </h1>
          <p className="text-lg font-main">
            Your mental health coaching companion
          </p>
        </div>

        <div className="">
          <h2 className="text-2xl mb-2 font-main">Login</h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-[280px]">
            Sign in with your username and password to access your account.
          </p>

          <Formik
            initialValues={{ username: '', password: '', rememberMe: false }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              handleLoginSubmit(values, setSubmitting, setErrors);
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
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
                    className="text-red-500 font-label text-xs mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>

                  <Field
                    as={Input}
                    type="password"
                    name="password"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 font-label text-xs mt-1"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={values.rememberMe}
                      onCheckedChange={(checked) =>
                        setFieldValue('rememberMe', checked)
                      }
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="font-label text-xs text-muted-foreground"
                    >
                      Keep me signed in
                    </Label>
                  </div>
                  <Link
                    href="/forgot"
                    className="text-primary font-label text-xs hover:text-foreground mr-1"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>

          <hr className="my-6 border-t border-muted-foreground" />
          <p className="text-center text-muted-foreground font-label">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-foreground">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const needsSeatGeneration = (batch?: any) => {
  if (!batch) return false;
  if (batch.status === "DONE") return false;
  return (batch.seatsIssued ?? 0) < (batch.totalSeats ?? 0) || batch.status === "GENERATING";
};

export default LoginPage;
