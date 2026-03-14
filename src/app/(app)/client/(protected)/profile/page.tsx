'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MapPin, Briefcase, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

import ProfileHeader from '@/components/client/profile/ProfileHeader';
import ProfileAvatarCard from '@/components/client/profile/ProfileAvatarCard';
import PersonalInfoTab from '@/components/client/profile/PersonalInfoTab';
import ContactLocationTab from '@/components/client/profile/ContactLocationTab';
import AdditionalInfoTab from '@/components/client/profile/AdditionalInfoTab';
import { ProfileData } from '@/types/client';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import useAuthStore from '@/store/AuthState';
import useQuizStore from '@/store/QuizState';
import { cn } from '@/lib/utils';
import ChangePasswordTab from '@/components/client/profile/ChangePasswordTab';
import {
  buildUpdateProfilePayload,
  updateClientProfile,
} from '@/services/profileService';
import { IUser } from '@/types/user';
import { ApiServiceError } from '@/lib/axios';

const defaultProfileData: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  phone: '',
  countryCode: '',
  gender: '',
  birthDate: '',
  segment: '',
  maritalStatus: '',
  address: '',
  city: '',
  country: '',
  highestEducationalAttainment: '',
  occupation: '',
  presentingConcerns: [],
  notes: '',
  imageUrl: '',
  locale: 'en', // sensible default
  timezone: 'UTC', // sensible default
};

/**
 * Extracts the country code prefix from a stored phone number.
 * Falls back to '+63' (Philippines) if not detectable.
 * Adjust the logic to match however your backend stores phone numbers.
 */
const deriveCountryCode = (phone?: string): string => {
  if (!phone) return '+63';
  const match = phone.match(/^(\+\d{1,3})/);
  return match ? match[1] : '+63';
};

const ProfilePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>(defaultProfileData);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);

  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);
  const setUser = useAuthStore((s) => s.setUser);
  const setClientProfile = useAuthStore((s) => s.setClientProfile);

  useEffect(() => {
    if (user && clientProfile) {
      setProfile({
        // --- from IClient ---
        firstName: clientProfile?.firstName ?? '',
        lastName: clientProfile?.lastName ?? '',
        gender: clientProfile?.gender ?? '',
        birthDate: clientProfile?.birthDate
          ? new Date(clientProfile.birthDate).toISOString().split('T')[0]
          : '',
        segment: clientProfile?.segment ?? '',
        maritalStatus: clientProfile?.maritalStatus ?? '',
        address: clientProfile?.address ?? '',
        city: clientProfile?.city ?? '',
        country: clientProfile?.country ?? 'Philippines',
        highestEducationalAttainment:
          clientProfile?.highestEducationalAttainment ?? '',
        occupation: clientProfile?.occupation ?? '',
        presentingConcerns: clientProfile?.presentingConcerns ?? [],
        notes: clientProfile?.notes ?? '',
        imageUrl: clientProfile?.imageUrl ?? '',

        // --- from IUser ---
        username: user?.username ?? '',
        email: user?.email ?? '',
        phone: user?.phone ?? '',

        // --- derived / defaults ---
        countryCode: deriveCountryCode(user?.phone),
        locale: 'en',
        timezone: 'Asia/Manila',
      });

      setLoading(false);
    }
  }, [user, clientProfile]);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleConcernsChange = (concerns: string[]) => {
    setProfile((prev) => ({ ...prev, presentingConcerns: concerns }));
  };

  const handleSave = async () => {
    if (!clientProfile?._id) return;

    setIsSaving(true);
    try {
      const payload = buildUpdateProfilePayload(profile);
      const result = await updateClientProfile(clientProfile._id, payload);

      // Sync Zustand store with the updated data returned from the server
      if (result.profile)
        setClientProfile(result.profile as typeof clientProfile);
      if (result.user) setUser(result.user as IUser);

      toast.success('Your profile has been saved successfully.');
    } catch (err) {
      if (err instanceof ApiServiceError) {
        // Errors come back as { [field]: "message" } — show the first one
        const firstMessage = Object.values(err?.errors)[0];
        toast.error(firstMessage ?? 'Failed to update profile.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <ProfileHeader onSave={handleSave} isSaving={isSaving} />

      <ProfileAvatarCard
        firstName={clientProfile?.firstName ?? profile.firstName}
        lastName={clientProfile?.lastName ?? profile.lastName}
        username={user?.username ?? profile.username}
        segment={clientProfile?.segment ?? profile.segment}
        imageUrl={clientProfile?.imageUrl ?? profile.imageUrl}
      />

      <Tabs
        defaultValue="personal"
        className="space-y-6"
        onValueChange={(v) => setActiveTab(v)}
        orientation="vertical"

      >
        <TabsList className="overflow-x-auto h-auto grid w-full grid-cols-2 lg:grid-cols-4 bg-primary/20 mb-2" >
          <TabsTrigger value="personal" className="gap-2 flex justify-start lg:justify-center">
            <User className="w-4 h-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 flex justify-start lg:justify-center">
            <MapPin className="w-4 h-4" />
            Contact & Location
          </TabsTrigger>
          <TabsTrigger value="additional" className="gap-2 flex justify-start lg:justify-center">
            <Briefcase className="w-4 h-4" />
            Additional Info
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className={cn(
              'gap-2 flex justify-start lg:justify-center',
              activeTab === 'security' && 'bg-primary text-primary-foreground'
            )}
          >
            <KeyRound className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoTab profile={profile} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="contact">
          <ContactLocationTab profile={profile} onChange={handleChange} />
        </TabsContent>

        <TabsContent value="additional">
          <AdditionalInfoTab
            profile={profile}
            onChange={handleChange}
            onConcernsChange={handleConcernsChange}
          />
        </TabsContent>

        <TabsContent value="security">
          <ChangePasswordTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
