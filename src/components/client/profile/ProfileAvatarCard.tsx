'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera } from 'lucide-react';
import { getSegmentLabel } from '@/utils/adaptsHelper';
import { EClientSegment } from '@/types/client';

interface ProfileAvatarCardProps {
  firstName: string;
  lastName: string;
  username: string;
  segment: string;
  imageUrl: string;
}

const ProfileAvatarCard = ({
  firstName,
  lastName,
  username,
  segment,
  imageUrl,
}: ProfileAvatarCardProps) => {
  const initials =
    `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  return (
    <Card className="bg-primary/20 border-border/50">
      <CardContent className="">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="w-15 h-15 border-2 border-border border-primary">
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* <button className="absolute inset-0 rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </button> */}
          </div>
          <div className="flex-1 flex justify-between items-start">
            <div>
              <p className="text-xl font-semibold text-foreground">
                {firstName} {lastName}
              </p>
              <p className="text-muted-foreground">@{username}</p>
            </div>

            <Badge variant="accent">
              {getSegmentLabel(segment as EClientSegment)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileAvatarCard;
