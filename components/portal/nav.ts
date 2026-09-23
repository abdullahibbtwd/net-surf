import type { Href } from 'expo-router';
import type { ComponentProps } from 'react';
import type { Feather } from '@expo/vector-icons';
import type { PortalCopyKey } from './copy';

export type PortalIcon = ComponentProps<typeof Feather>['name'];

export type PortalNavItem = {
  href: Href;
  labelKey: PortalCopyKey;
  icon: PortalIcon;
  match: (pathname: string) => boolean;
  badge?: 'dot' | number;
};

export const portalNavItems: PortalNavItem[] = [
  {
    href: '/app',
    labelKey: 'navHome',
    icon: 'home',
    match: (p) => p === '/app' || p === '/app/',
  },
  {
    href: '/app/speed',
    labelKey: 'navSpeed',
    icon: 'wifi',
    match: (p) => p.startsWith('/app/speed'),
  },
  {
    href: '/app/billing',
    labelKey: 'navBilling',
    icon: 'file-text',
    match: (p) => p.startsWith('/app/billing'),
  },
  {
    href: '/app/alerts',
    labelKey: 'navAlerts',
    icon: 'bell',
    match: (p) => p.startsWith('/app/alerts') || p.startsWith('/app/status'),
    badge: 'dot',
  },
  {
    href: '/app/support',
    labelKey: 'navSupport',
    icon: 'tool',
    match: (p) => p.startsWith('/app/support'),
  },
];

export const portalSecondaryLinks: PortalNavItem[] = [
  {
    href: '/app/status',
    labelKey: 'navStatus',
    icon: 'activity',
    match: (p) => p.startsWith('/app/status'),
  },
  {
    href: '/app/wifi-config',
    labelKey: 'navWifi',
    icon: 'settings',
    match: (p) => p.startsWith('/app/wifi-config'),
  },
];
