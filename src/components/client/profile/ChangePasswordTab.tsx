'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { KeyRound, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ApiServiceError, ApiValidationError } from '@/lib/axios';
import { changePassword } from '@/services/profileService';
import useAuthStore from '@/store/AuthState';

interface PasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const INITIAL: PasswordFields = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

interface PasswordRule {
  label: string;
  test: (pw: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw) => /\d/.test(pw) },
  { label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const ChangePasswordTab = () => {
  const user = useAuthStore(s => s.user)
  const [fields, setFields] = useState<PasswordFields>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof PasswordFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    // Clear the field error as soon as the user starts correcting it
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleShow = (field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordsMatch =
    fields.newPassword.length > 0 && fields.newPassword === fields.confirmPassword;
  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(fields.newPassword));
  const canSubmit =
    fields.currentPassword.length > 0 && allRulesPassed && passwordsMatch;

  const handleSubmit = async () => {
    if (!canSubmit || !user) return;
 
    setIsLoading(true);
    setFieldErrors({});
 
    try {
      await changePassword({
        userId: user._id,
        currentPassword: fields.currentPassword,
        newPassword: fields.newPassword,
      });

      toast.success('Password changed successfully.');
      setFields(INITIAL);
    } catch (err) {
      
      if (err instanceof ApiValidationError) {
        // Surface field-level errors inline (e.g. wrong current password)
        setFieldErrors(err.details);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-primary" />
          Change Password
        </CardTitle>
        <CardDescription>
          Enter your current password to set a new one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Current password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={show.current ? 'text' : 'password'}
              value={fields.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              placeholder="Enter your current password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => toggleShow('current')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {show.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.currentPassword && (
            <p className="text-xs text-destructive">{fieldErrors.currentPassword}</p>
          )}
        </div>

        {/* New password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={show.new ? 'text' : 'password'}
              value={fields.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              placeholder="Enter your new password"
              className="pr-10"
              disabled={!fields.currentPassword}
            />
            <button
              type="button"
              onClick={() => toggleShow('new')}
              disabled={!fields.currentPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password rules */}
          {fields.newPassword.length > 0 && (
            <ul className="mt-2 space-y-1">
              {PASSWORD_RULES.map((rule) => {
                const passed = rule.test(fields.newPassword);
                return (
                  <li key={rule.label} className={cn('flex items-center gap-2 text-xs', passed ? 'text-green-600' : 'text-muted-foreground')}>
                    {passed
                      ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      : <XCircle className="w-3.5 h-3.5 shrink-0" />
                    }
                    {rule.label}
                  </li>
                );
              })}
            </ul>
          )}

          {fieldErrors.newPassword && (
            <p className="text-xs text-destructive">{fieldErrors.newPassword}</p>
          )}
        </div>

        {/* Confirm new password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={show.confirm ? 'text' : 'password'}
              value={fields.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              placeholder="Re-enter your new password"
              className={cn(
                'pr-10',
                fields.confirmPassword.length > 0 && (passwordsMatch ? 'border-green-500 focus-visible:ring-green-500' : 'border-destructive focus-visible:ring-destructive')
              )}
              disabled={!fields.currentPassword}
            />
            <button
              type="button"
              onClick={() => toggleShow('confirm')}
              disabled={!fields.currentPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
            >
              {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fields.confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-xs text-destructive">Passwords do not match.</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className="w-full"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordTab;