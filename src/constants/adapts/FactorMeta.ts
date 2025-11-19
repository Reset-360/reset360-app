import { Factor } from '@/types/adapts';

export const FACTOR_META: Record<
  Factor,
  { label: string; description: string; group: 'anxiety' | 'mood' }
> = {
  SoA: {
    label: 'Social Anxiety',
    description: 'Worry or discomfort in social or performance situations.',
    group: 'anxiety',
  },
  PD: {
    label: 'Panic Symptoms',
    description: 'Sudden spikes of fear, panic, or intense physical anxiety.',
    group: 'anxiety',
  },
  SeA: {
    label: 'Separation Anxiety',
    description:
      'Distress related to separation from important people or places.',
    group: 'anxiety',
  },
  GAD: {
    label: 'Generalized Anxiety',
    description: 'Ongoing worry or tension across different areas of life.',
    group: 'anxiety',
  },
  OCD: {
    label: 'Obsessive–Compulsive Symptoms',
    description:
      'Repeated thoughts or urges and urges to perform certain behaviors.',
    group: 'anxiety',
  },
  MDD: {
    label: 'Depressive Symptoms',
    description:
      'Low mood, loss of interest, or changes in energy and motivation.',
    group: 'mood',
  },
};