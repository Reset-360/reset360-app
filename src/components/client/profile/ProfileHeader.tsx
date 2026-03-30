'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

interface ProfileHeaderProps {
  onSave: () => void;
  isSaving?: boolean;
}
const ProfileHeader = ({ onSave, isSaving  }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My <span className="text-primary">Profile</span></h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences
        </p>
      </div>
      <Button onClick={onSave} disabled={isSaving} className="gap-2">
        {isSaving
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <Save className="w-4 h-4" />
        }
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default ProfileHeader
