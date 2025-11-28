import moment from 'moment';
import clsx from 'clsx';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getRiskAccentClasses,
  getRiskLevelColor,
} from '@/utils/adaptsResultHelper';
import RiskIcon from './RiskIcon';

type RiskCardProps = {
  riskLevel: string;
  description: string;
  completedAt?: Date;
};
const RiskCard: React.FC<RiskCardProps> = ({ riskLevel, description, completedAt }) => {
  const riskClasses = getRiskAccentClasses(riskLevel);

  return (
    <Card className={clsx('shadow-sm border', riskClasses, 'w-full h-full')}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg md:text-xl">
              Overall Emotional Risk Level
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Completed on {moment(completedAt).format('MMMM DD, yyyy')} at{' '}
              {moment(completedAt).format('hh:mm A')}
            </p>
          </div>
          <Badge
            className={clsx('text-xs text-white', getRiskLevelColor(riskLevel))}
          >
            {riskLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <p className="flex flex-shrink-0 items-center text-sm text-muted-foreground gap-2">
            <span
              className={clsx(
                'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                riskClasses
              )}
            >
              <RiskIcon riskLevel={riskLevel} />
            </span>
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskCard;
