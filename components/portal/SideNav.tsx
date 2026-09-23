import { useEffect } from 'react';
import { Image } from 'expo-image';
import { Link, usePathname, type Href } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/components/Language';
import { Icon, portalColors } from './icons';
import { portalNavItems, portalSecondaryLinks, type PortalNavItem } from './nav';

const SPRING = { damping: 18, stiffness: 240, mass: 0.65 };

type SideNavProps = {
  compact?: boolean;
  onNavigate?: () => void;
  fullHeight?: boolean;
};

export function SideNav({ compact = false, onNavigate, fullHeight = false }: SideNavProps) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  const width = compact ? 84 : 268;
  const isWeb = Platform.OS === 'web';

  return (
    <View
      className="border-r border-[#E2E8F0] bg-white"
      style={{
        width,
        flex: fullHeight ? 1 : undefined,
        height: fullHeight ? (isWeb ? ('100dvh' as unknown as number) : '100%') : '100%',
        minHeight: fullHeight && isWeb ? ('100dvh' as unknown as number) : undefined,
        paddingTop: Math.max(insets.top, 16),
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <View className={`mb-7 shrink-0 ${compact ? 'items-center px-2' : 'px-5'}`}>
        <Link href="/app" asChild>
          <Pressable
            onPress={onNavigate}
            accessibilityLabel="NetSurf Home"
            className={`flex-row items-center gap-3 rounded-xl active:opacity-80 ${
              compact ? 'h-12 w-12 justify-center' : 'py-1'
            }`}
          >
            <View
              className="h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5E9]"
              style={
                Platform.OS === 'web'
                  ? { boxShadow: '0 8px 18px rgba(14, 165, 233, 0.28)' }
                  : undefined
              }
            >
              <Text className="text-[15px] font-extrabold tracking-tight text-white">N</Text>
            </View>
            {!compact ? (
              <View className="flex-1">
                <Text className="text-[16px] font-bold tracking-tight text-[#0F172A]">NetSurf</Text>
                <Text className="text-[12px] font-medium text-[#64748B]">{t.customerPortal}</Text>
              </View>
            ) : null}
          </Pressable>
        </Link>
      </View>

      <View className={`min-h-0 flex-1 ${compact ? 'px-2' : 'px-3'}`}>
        {!compact ? (
          <Text className="mb-2.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t.navMenu}
          </Text>
        ) : null}
        <View className="gap-1">
          {portalNavItems.map((item) => (
            <NavRow
              key={item.labelKey}
              item={item}
              label={t[item.labelKey]}
              active={item.match(pathname)}
              compact={compact}
              onNavigate={onNavigate}
            />
          ))}
        </View>

        <View className="mx-2 my-5 h-px bg-[#E2E8F0]" />

        {!compact ? (
          <Text className="mb-2.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
            {t.navNetwork}
          </Text>
        ) : null}
        <View className="gap-1">
          {portalSecondaryLinks.map((item) => (
            <NavRow
              key={item.labelKey}
              item={item}
              label={t[item.labelKey]}
              active={item.match(pathname)}
              compact={compact}
              onNavigate={onNavigate}
            />
          ))}
        </View>
      </View>

      <View className={`mt-auto shrink-0 ${compact ? 'items-center px-2' : 'px-3'}`}>
        <Link href={'/app/account' as Href} asChild>
          <Pressable
            onPress={onNavigate}
            className={`flex-row items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] active:bg-[#F1F5F9] ${
              compact ? 'h-12 w-12 justify-center' : 'p-3'
            }`}
          >
            <View className="h-9 w-9 overflow-hidden rounded-full border border-[#E2E8F0] bg-[#E0F2FE]">
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs_JXTF6MdkFopDWyZVfaT99Tb0p5AN1uwL8B6vhqMQpraACAHFx3xJzdprdMCvySomJfOXtwfFaEPhaearQkxRwTOKeVTBJolH2BQRuc-6p7IokiLm19mOsn45RiaKwm9sC5ZXbb55NyNMibUrvcfCfALygyPiqb_6bHV8phAs3OtETVQ7gEzIgYDBUMdVzR5be86IyRKlvlzQCLdHP4-oYXx-FZydhODAjTBIUk9ngUHOQeC7OobdA',
                }}
                className="h-full w-full"
                contentFit="cover"
              />
            </View>
            {!compact ? (
              <View className="min-w-0 flex-1">
                <Text className="text-[13px] font-semibold text-[#0F172A]" numberOfLines={1}>
                  Alex Petrov
                </Text>
                <Text className="text-[11px] text-[#64748B]" numberOfLines={1}>
                  {t.accountNumber}
                </Text>
              </View>
            ) : null}
            {!compact ? <Icon name="chevron-right" size={16} color="#94A3B8" /> : null}
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

function NavRow({
  item,
  label,
  active,
  compact,
  onNavigate,
}: {
  item: PortalNavItem;
  label: string;
  active: boolean;
  compact: boolean;
  onNavigate?: () => void;
}) {
  const progress = useSharedValue(active ? 1 : 0);
  const press = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, SPRING);
  }, [active, progress]);

  const rowStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255,255,255,0)', 'rgba(224, 242, 254, 1)'],
    ),
    transform: [{ scale: interpolate(press.value, [0, 1], [1, 0.97]) }],
  }));

  const accentStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scaleY: interpolate(progress.value, [0, 1], [0.25, 1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [1, 1.08]) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, -4])}deg` },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.78, 1]),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 2]) }],
  }));

  return (
    <Link href={item.href} asChild>
      <Pressable
        onPress={onNavigate}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={label}
        onPressIn={() => {
          press.value = withTiming(1, { duration: 90, easing: Easing.out(Easing.quad) });
        }}
        onPressOut={() => {
          press.value = withSpring(0, SPRING);
        }}
      >
        <Animated.View
          style={[
            {
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: compact ? 'center' : 'flex-start',
              gap: compact ? 0 : 12,
              paddingHorizontal: compact ? 0 : 12,
              paddingVertical: compact ? 0 : 10,
              height: compact ? 48 : undefined,
              width: compact ? '100%' : undefined,
            },
            rowStyle,
          ]}
        >
          {!compact ? (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: 3,
                  borderTopRightRadius: 99,
                  borderBottomRightRadius: 99,
                  backgroundColor: portalColors.accent,
                },
                accentStyle,
              ]}
            />
          ) : null}

          <Animated.View style={iconStyle}>
            <View className="relative">
              <Icon
                name={item.icon}
                size={compact ? 22 : 20}
                color={active ? portalColors.accent : '#475569'}
              />
              {item.badge === 'dot' && !active ? (
                <View className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full border border-white bg-[#0EA5E9]" />
              ) : null}
            </View>
          </Animated.View>

          {!compact ? (
            <Animated.Text
              style={[
                {
                  flex: 1,
                  fontSize: 14,
                  fontWeight: active ? '600' : '500',
                  color: active ? portalColors.accent : '#334155',
                },
                labelStyle,
              ]}
            >
              {label}
            </Animated.Text>
          ) : null}

          {!compact && item.badge === 'dot' && !active ? (
            <View className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
          ) : null}
        </Animated.View>
      </Pressable>
    </Link>
  );
}
