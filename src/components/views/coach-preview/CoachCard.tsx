import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Coach } from '@/types/coach';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CoachCardProps {
  coach: Coach;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach }) => (
  <Card className="keen-slider__slide p-6 hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50 flex justify-between">
    <div className="">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-violet-500 flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-glow">
        {coach.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>

      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {coach.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{coach.specialty}</p>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{coach.rating}</span>
          </div>
          <div>•</div>
          <div>{coach.sessions} sessions</div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {coach.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>

    <Button
      variant={coach.available ? 'default' : 'outline'}
      className="w-full"
      disabled={!coach.available}
    >
      {coach.available ? (
        <>
          <MessageCircle className="w-4 h-4" />
          Connect Now
        </>
      ) : (
        'Currently Unavailable'
      )}
    </Button>
  </Card>
);

export default CoachCard;
