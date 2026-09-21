import { forwardRef, type ComponentRef, type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'card';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
};

const variants: Record<ButtonVariant, { wrap: string; text: string }> = {
  primary: {
    wrap: 'bg-[#0EA5E9] hover:bg-[#0284C7] active:scale-[0.98] shadow-xs',
    text: 'text-white font-medium text-center tracking-tight',
  },
  accent: {
    wrap: 'bg-[#0EA5E9] hover:bg-[#0284C7] active:scale-[0.98] shadow-xs',
    text: 'text-white font-medium text-center tracking-tight',
  },
  outline: {
    wrap: 'bg-white hover:bg-slate-50 border border-[#E2E8F0] active:scale-[0.98] shadow-xs',
    text: 'text-[#1E293B] font-medium text-center',
  },
  ghost: {
    wrap: 'bg-transparent hover:bg-slate-100/70 active:opacity-70',
    text: 'text-[#1E293B] font-medium text-center',
  },
  link: {
    wrap: 'bg-transparent px-0 py-0',
    text: 'text-[#0EA5E9] hover:underline font-medium',
  },
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 rounded-full',
  md: 'h-11 px-5 rounded-full',
  lg: 'h-12 px-7 rounded-full',
  card: 'h-11 px-4 rounded-xl w-full',
};

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  function Button(
    { label, variant = 'primary', size = 'md', icon, iconPosition = 'right', className, ...props },
    ref,
  ) {
    const styles = variants[variant];
    const sizing = variant === 'link' ? '' : sizes[size];

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityLabel={label}
        className={`flex-row items-center justify-center gap-2 transition-all ${styles.wrap} ${sizing} ${className ?? ''}`}
        {...props}
      >
        {icon && iconPosition === 'left' ? <View>{icon}</View> : null}
        <Text className={`text-sm sm:text-base ${styles.text}`}>{label}</Text>
        {icon && iconPosition === 'right' ? <View>{icon}</View> : null}
      </Pressable>
    );
  },
);

