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
import { MapPin } from 'lucide-react';
import { ProfileData } from '@/types/client';
import { COUNTRIES } from '@/constants/country';

interface ContactLocationTabProps {
  profile: ProfileData;
  onChange: (field: string, value: string) => void;
}

const ContactLocationTab = ({ profile, onChange }: ContactLocationTabProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Contact & Location
        </CardTitle>
        <CardDescription>
          Your contact details and address information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => onChange('username', e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => onChange('email', e.target.value)}
              maxLength={150}
            />
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 w-24">
              <Label htmlFor="countryCode">Code</Label>
              <Input
                id="countryCode"
                value={profile.countryCode}
                onChange={(e) => onChange('countryCode', e.target.value)}
                placeholder="+63"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="9XXXXXXXXX"
                maxLength={10}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={profile.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Street address"
            maxLength={250}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={profile.city}
              onChange={(e) => onChange('city', e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={profile.country}
              onValueChange={(v) => onChange('country', v)}
            >
              <SelectTrigger className="w-full" id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="w-full max-h-60">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactLocationTab;
