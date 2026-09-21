import { View, type ViewProps } from 'react-native';

type CardProps = ViewProps & {
  featured?: boolean;
  variant?: 'default' | 'elevated' | 'glass' | 'dark';
};

export function Card({
  featured,
  variant = 'default',
  className,
  style,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-surface border border-[#E2E8F0] shadow-xs',
    elevated: 'bg-surface border border-[#E2E8F0] shadow-xs',
    glass: 'bg-white border border-[#E2E8F0] shadow-xs',
    dark: 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]',
  }[variant];

  const featuredStyle = featured
    ? 'border-[#0EA5E9] bg-white'
    : '';

  return (
    <View
      className={`rounded-2xl p-6 transition-all ${variantStyles} ${featuredStyle} ${className ?? ''}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
