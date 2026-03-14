'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Lock } from 'lucide-react';
import {
  EClientSegment,
  EGender,
  EMaritalStatus,
  ProfileData,
} from '@/types/client';
import useQuizStore from '@/store/QuizState';

export const GENDER_OPTIONS = [
  { label: EGender.MALE, value: EGender.MALE },
  { label: EGender.FEMALE, value: EGender.FEMALE },
];

export const SEGMENT_OPTIONS = [
  { label: 'Student', value: EClientSegment.STUDENT },
  { label: 'Teacher', value: EClientSegment.TEACHER },
  { label: 'Parent', value: EClientSegment.PARENT },
  { label: 'College / Young Adult', value: EClientSegment.INDIVIDUAL },
];

export const MARITAL_STATUS_OPTIONS = [
  { label: EMaritalStatus.SINGLE, value: EMaritalStatus.SINGLE },
  { label: EMaritalStatus.MARRIED, value: EMaritalStatus.MARRIED },
  { label: EMaritalStatus.DIVORCED, value: EMaritalStatus.DIVORCED },
  { label: EMaritalStatus.WIDOWED, value: EMaritalStatus.WIDOWED },
];

interface PersonalInfoTabProps {
  profile: ProfileData;
  onChange: (field: string, value: string) => void;
}

const PersonalInfoTab = ({ profile, onChange }: PersonalInfoTabProps) => {
  const hasPrevAttempts = useQuizStore((s) => s.hasPrevAttempts);
  console.log(hasPrevAttempts)
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </CardTitle>
        <CardDescription>Basic details about you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              maxLength={50}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              maxLength={50}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate">
              Birth Date{' '}
              {hasPrevAttempts ? (
                <Lock className="w-3 h-3 text-foreground" />
              ) : null}
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={profile.birthDate}
              onChange={(e) => onChange('birthDate', e.target.value)}
              disabled={hasPrevAttempts}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">
              Gender{' '}
              {hasPrevAttempts ? (
                <Lock className="w-3 h-3 text-foreground" />
              ) : null}
            </Label>
            <Select
              value={profile.gender}
              onValueChange={(v) => onChange('gender', v)}
              disabled={hasPrevAttempts}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {GENDER_OPTIONS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="segment">
              I am a...{' '}
              {hasPrevAttempts ? (
                <Lock className="w-3 h-3 text-foreground" />
              ) : null}
            </Label>
            <Select
              value={profile.segment}
              onValueChange={(v) => onChange('segment', v)}
              disabled={hasPrevAttempts}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select segment" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {SEGMENT_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select
              value={profile.maritalStatus}
              onValueChange={(v) => onChange('maritalStatus', v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {MARITAL_STATUS_OPTIONS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Read-only notice */}
        {hasPrevAttempts ? (
          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            <Lock className="w-4 h-4 mt-0.5 shrink-0" />
            <p>
              <span className="font-medium text-foreground">
                Gender, Birth Date, and Segment
              </span>{' '}
              cannot be changed. Please{' '}
              <a
                href="mailto:reggie@emotionalresetcenter.com"
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
              >
                contact support
              </a>{' '}
              if you need to update this information.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
