import type { Href } from 'expo-router';
import type { ComponentProps } from 'react';
import type { Feather } from '@expo/vector-icons';

export type PortalIcon = ComponentProps<typeof Feather>['name'];

export type PortalNavItem = {
  href: Href;
  label: string;
  shortLabel?: string;
  icon: PortalIcon;
  match: (pathname: string) => boolean;
  badge?: 'dot' | number;
};

export const portalNavItems: PortalNavItem[] = [
  {
    href: '/app',
    label: 'Home',
    icon: 'home',
    match: (p) => p === '/app' || p === '/app/',
  },
  {
    href: '/app/speed',
    label: 'Speed',
    shortLabel: 'Speed',
    icon: 'wifi',
    match: (p) => p.startsWith('/app/speed'),
  },
  {
    href: '/app/billing',
    label: 'Billing',
    icon: 'file-text',
    match: (p) => p.startsWith('/app/billing'),
  },
  {
    href: '/app/alerts',
    label: 'Alerts',
    icon: 'bell',
    match: (p) => p.startsWith('/app/alerts') || p.startsWith('/app/status'),
    badge: 'dot',
  },
  {
    href: '/app/support',
    label: 'Support',
    icon: 'tool',
    match: (p) => p.startsWith('/app/support'),
  },
];

export const portalSecondaryLinks: PortalNavItem[] = [
  {
    href: '/app/status',
    label: 'Service status',
    icon: 'activity',
    match: (p) => p.startsWith('/app/status'),
  },
  {
    href: '/app/wifi-config',
    label: 'Wi-Fi configuration',
    icon: 'settings',
    match: (p) => p.startsWith('/app/wifi-config'),
  },
];
