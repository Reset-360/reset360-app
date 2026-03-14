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
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Briefcase, GraduationCap } from 'lucide-react';
import { ProfileData } from '@/types/client';
import PresentingConcernsSelect from './PresentingConcernsSelect';

interface AdditionalInfoTabProps {
  profile: ProfileData;
  onChange: (field: string, value: string) => void;
  onConcernsChange: (concerns: string[]) => void;
}

const AdditionalInfoTab = ({
  profile,
  onChange,
  onConcernsChange,
}: AdditionalInfoTabProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          Additional Information
        </CardTitle>
        <CardDescription>
          Education, occupation, and other details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education">
              <GraduationCap className="w-3.5 h-3.5 inline mr-1.5" />
              Highest Educational Attainment
            </Label>
            <Input
              id="education"
              value={profile.highestEducationalAttainment}
              onChange={(e) =>
                onChange('highestEducationalAttainment', e.target.value)
              }
              placeholder="e.g., Bachelor's Degree"
              maxLength={150}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">
              <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />
              Occupation
            </Label>
            <Input
              id="occupation"
              value={profile.occupation}
              onChange={(e) => onChange('occupation', e.target.value)}
              placeholder="e.g., Software Engineer"
              maxLength={50}
            />
          </div>
        </div>

        <Separator />

        <PresentingConcernsSelect
          value={profile.presentingConcerns}
          onChange={onConcernsChange}
        />

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={profile.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Any additional notes..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoTab;
