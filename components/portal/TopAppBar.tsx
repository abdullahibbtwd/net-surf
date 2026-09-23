import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, portalColors } from './icons';

type TopAppBarProps = {
  title?: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
  elevated?: boolean;
};

export function TopAppBar({
  title = 'NetSurf',
  subtitle,
  left,
  right,
  showMenuButton = false,
  onMenuPress,
  elevated = false,
}: TopAppBarProps) {
  return (
    <View
      className={`z-40 w-full shrink-0 flex-row items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-3 ${
        elevated ? '' : ''
      }`}
      style={{
        minHeight: 60,
        ...(elevated
          ? { boxShadow: '0 1px 0 rgba(15, 23, 42, 0.04)' }
          : null),
      }}
    >
      <View className="min-w-0 flex-1 flex-row items-center gap-3">
        {left ??
          (showMenuButton ? (
            <Pressable
              accessibilityLabel="Open navigation menu"
              onPress={onMenuPress}
              className="h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] active:bg-[#F1F5F9]"
            >
              <Icon name="menu" size={20} color={portalColors.ink} />
            </Pressable>
          ) : null)}

        <View className="min-w-0 flex-1">
          <Text
            className="text-[17px] font-bold leading-6 tracking-tight text-[#0F172A] md:text-[19px]"
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text className="mt-0.5 text-[12px] leading-4 text-[#64748B]" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="ml-3 flex-row items-center gap-2">{right ?? null}</View>
    </View>
  );
}
