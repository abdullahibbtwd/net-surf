import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Feather>['name'];

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = 20, color = '#0F172A' }: IconProps) {
  return <Feather name={name} size={size} color={color} />;
}

export const portalColors = {
  ink: '#0F172A',
  muted: '#475569',
  accent: '#0EA5E9',
  accentHover: '#0284C7',
  canvas: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  success: '#10B981',
  successText: '#059669',
  successBg: '#ECFDF5',
  successBorder: '#A7F3D0',
  warning: '#8A5100',
  secondary: '#006C49',
} as const;
