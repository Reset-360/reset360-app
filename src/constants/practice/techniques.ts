import { TechniqueId } from './content';

export const TECHNIQUE_COLORS: Record<
  TechniqueId,
  { bg: string; text: string; border: string; glow: string; pill: string }
> = {
  breathing: {
    bg: 'from-sky-950/80 to-sky-900/60',
    text: 'text-sky-300',
    border: 'border-sky-700/40',
    glow: 'shadow-sky-500/20',
    pill: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  },
  grounding: {
    bg: 'from-emerald-950/80 to-emerald-900/60',
    text: 'text-emerald-300',
    border: 'border-emerald-700/40',
    glow: 'shadow-emerald-500/20',
    pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  reframing: {
    bg: 'from-violet-950/80 to-violet-900/60',
    text: 'text-violet-300',
    border: 'border-violet-700/40',
    glow: 'shadow-violet-500/20',
    pill: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  bodyscan: {
    bg: 'from-rose-950/70 to-rose-900/80',
    text: 'text-rose-300',
    border: 'border-rose-700/40',
    glow: 'shadow-rose-500/20',
    pill: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  journaling: {
    bg: 'from-blue-950/80 to-blue-900/80',
    text: 'text-blue-300',
    border: 'border-blue-700/40',
    glow: 'shadow-blue-500/20',
    pill: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
};
