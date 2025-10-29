import { ClipboardClock, Settings, Grid } from 'lucide-react';

export const clientMenuItems = [
  { label: 'Dashboard', href: '/client/dashboard', icon: Grid },
  {
    label: 'My Appointments',
    href: '/client/appointments',
    icon: ClipboardClock,
  },
  { label: 'Settings', href: '/client/settings', icon: Settings },
];
