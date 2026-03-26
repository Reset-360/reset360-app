import { ERiskBand } from '@/types/adapts';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RISK_CONFIG: Record<
  ERiskBand,
  {
    label: string;
    sublabel: string;
    icon: typeof CheckCircle2;
    cardClass: string;
    badgeClass: string;
    iconClass: string;
    pillClass: string;
  }
> = {
  low: {
    label: 'Within Expected Range',
    sublabel: 'Your emotional responses appear manageable at this time.',
    icon: CheckCircle2,
    cardClass: 'border-emerald-200 bg-emerald-50/60',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    iconClass: 'text-emerald-600',
    pillClass: 'bg-emerald-100 text-emerald-800',
  },
  moderate: {
    label: 'Borderline Elevated',
    sublabel:
      'Some areas of your responses suggest you may benefit from support.',
    icon: AlertCircle,
    cardClass: 'border-amber-200 bg-amber-50/60',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    iconClass: 'text-amber-600',
    pillClass: 'bg-amber-100 text-amber-800',
  },
  high: {
    label: 'Elevated — Support Recommended',
    sublabel:
      'Your responses indicate a level of distress that deserves prompt attention.',
    icon: AlertTriangle,
    cardClass: 'border-rose-200 bg-rose-50/60',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    iconClass: 'text-rose-600',
    pillClass: 'bg-rose-100 text-rose-800',
  },
};
