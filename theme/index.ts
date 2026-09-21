export const themeTeal = {
  textPrimary: '#0F172A', // Core text / Headlines
  actionPrimary: '#0EA5E9', // Sole accent color for buttons, links, active states
  surfaceAccent: '#F8FAFC', // Neutral alternate section background
  border: '#E2E8F0', // Hairline 1px border
} as const;

export const colors = {
  surface: '#FFFFFF',
  canvas: '#F8FAFC',
  line: '#E2E8F0',
  ink: '#0F172A',
  muted: '#475569',
  accent: '#0EA5E9',
  accentSoft: '#F8FAFC',
  purple: '#0EA5E9',
  brand: '#0EA5E9',
  navy: '#0F172A',
  cyan: '#0EA5E9',
  mint: '#F8FAFC',
  gold: '#0EA5E9',
  danger: '#EF4444',
} as const;

export const elevation = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.04,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
  elevation: 2,
} as const;

export const brand = {
  name: 'netsurf',
  portal: 'https://auth.net-surf.net',
  phoneNew: '0882991611',
  phoneNewDisplay: '0882 991 611',
  phoneCurrent: '0885250000',
  phoneCurrentDisplay: '0885 250 000',
  email: 'hello@netsurf.bg',
} as const;
