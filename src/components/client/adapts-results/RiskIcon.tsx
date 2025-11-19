import { AlertTriangle, Scale3D, CheckCircle2 } from 'lucide-react';

type RiskIconProps = {
  riskLevel: string;
  className?: string; // optional override for styling
};

const RiskIcon: React.FC<RiskIconProps> = ({ riskLevel, className }) => {
  if (riskLevel.includes('High')) {
    return (
      <AlertTriangle className={className ?? 'w-5 h-5 text-destructive'} />
    );
  }

  if (riskLevel.includes('Moderate')) {
    return <Scale3D className={className ?? 'w-5 h-5 text-amber-500'} />;
  }

  return <CheckCircle2 className={className ?? 'w-5 h-5 text-emerald-500'} />;
};

export default RiskIcon;
