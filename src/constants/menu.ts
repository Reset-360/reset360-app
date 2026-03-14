import { CircleUserRound, ClipboardClock, Home, Receipt } from 'lucide-react';

export const clientMenuItems = [
  {
    title: 'Home',
    url: '/client/dashboard',
    icon: Home,
  },
  {
    title: 'History',
    url: '/client/history',
    icon: ClipboardClock,
  },
  {
    title: 'Orders',
    url: '/client/orders',
    icon: Receipt,
  },
  {
    title: 'Profile',
    url: '/client/profile',
    icon: CircleUserRound,
  },
];

export const coachMenuItems = [
  {
    title: 'Home',
    url: '/coach/dashboard',
    icon: Home,
  },
];

export const orgMenuItems = [
  {
    title: 'Home',
    url: '/org/dashboard',
    icon: Home,
  },
  {
    title: 'Orders',
    url: '/org/orders',
    icon: Receipt,
  },
];
