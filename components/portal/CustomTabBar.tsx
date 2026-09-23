import { useEffect, useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/components/Language';
import { Icon } from './icons';
import type { PortalIcon } from './nav';
import { usePortalBreakpoint } from './usePortalBreakpoint';

// ─── Design tokens ────────────────────────────────────────────────────────────
const PILL_H = 62;
const PILL_RADIUS = 32;
const SPRING = { damping: 18, stiffness: 220, mass: 0.65 };

const BAR_BG = '#FFFFFF';
const BAR_BORDER = '#E2E8F0';
const ICON_MUTED = '#94A3B8';
const ICON_ACTIVE = '#0EA5E9';

type TabRoute = {
  key: string;
  name: string;
  params?: object;
};

export type CustomTabBarProps = {
  state: {
    index: number;
    routes: TabRoute[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptors: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any;
};

type TabMeta = {
  icon: PortalIcon;
  badge?: boolean;
};

const TAB_META: Record<string, TabMeta> = {
  index: { icon: 'home' },
  speed: { icon: 'wifi' },
  billing: { icon: 'file-text' },
  alerts: { icon: 'bell', badge: true },
  support: { icon: 'tool' },
};

const TAB_LABEL_KEYS: Record<string, 'navHome' | 'navSpeed' | 'navBilling' | 'navAlerts' | 'navSupport'> = {
  index: 'navHome',
  speed: 'navSpeed',
  billing: 'navBilling',
  alerts: 'navAlerts',
  support: 'navSupport',
};

/**
 * Floating tab bar — active tab uses color + scale only (no fill behind icon).
 */
export function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const bp = usePortalBreakpoint();

  const visibleRoutes = useMemo(
    () =>
      state.routes.filter((route) => {
        const options = descriptors[route.key]?.options;
        if ((options as { href?: null | string } | undefined)?.href === null) return false;
        return Boolean(TAB_META[route.name]);
      }),
    [state.routes, descriptors],
  );

  const activeVisibleIndex = Math.max(
    0,
    visibleRoutes.findIndex((route) => route.key === state.routes[state.index]?.key),
  );

  if (!bp.showBottomNav) return null;

  const bottomPad = Math.max(insets.bottom, 10) + 8;

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { paddingBottom: bottomPad }]}>
      <View style={styles.shell}>
        <View style={styles.bar}>
          {visibleRoutes.map((route, visibleIndex) => {
            const focused = visibleIndex === activeVisibleIndex;
            const meta = TAB_META[route.name] ?? { icon: 'circle' as PortalIcon };
            const labelKey = TAB_LABEL_KEYS[route.name];
            const label = labelKey ? t[labelKey] : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TabItem
                key={route.key}
                label={label}
                icon={meta.icon}
                focused={focused}
                badge={meta.badge}
                onPress={onPress}
                onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TabItem({
  label,
  icon,
  focused,
  badge,
  onPress,
  onLongPress,
}: {
  label: string;
  icon: PortalIcon;
  focused: boolean;
  badge?: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const progress = useSharedValue(focused ? 1 : 0);
  const press = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, SPRING);
  }, [focused, progress]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -3]) },
      {
        scale:
          interpolate(progress.value, [0, 1], [0.92, 1.08]) *
          interpolate(press.value, [0, 1], [1, 0.88]),
      },
    ],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.5, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [3, 0]) }],
  }));

  const iconColor = focused ? ICON_ACTIVE : ICON_MUTED;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        press.value = withTiming(1, { duration: 70, easing: Easing.out(Easing.quad) });
      }}
      onPressOut={() => {
        press.value = withSpring(0, SPRING);
      }}
      style={styles.tab}
    >
      <Animated.View style={[styles.iconWrap, iconStyle]}>
        <View>
          <Icon name={icon} size={focused ? 22 : 20} color={iconColor} />
          {badge && !focused && <View style={styles.badge} />}
        </View>
      </Animated.View>

      <Animated.Text
        style={[
          styles.label,
          { color: focused ? ICON_ACTIVE : ICON_MUTED, fontWeight: focused ? '700' : '500' },
          labelStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: Platform.OS === 'web' ? ('fixed' as unknown as 'absolute') : 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  shell: {
    width: '100%',
    maxWidth: 430,
    position: 'relative',
    overflow: 'visible',
  },
  bar: {
    height: PILL_H,
    borderRadius: PILL_RADIUS,
    backgroundColor: BAR_BG,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BAR_BORDER,
    overflow: 'visible',
    ...Platform.select({
      web: {
        boxShadow: '0 12px 36px rgba(15,23,42,0.10), 0 4px 12px rgba(15,23,42,0.06)',
      } as object,
      default: {
        shadowColor: '#0F172A',
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 16,
      },
    }),
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    gap: 2,
  },
  iconWrap: {
    width: 36,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});

export function useCustomTabBarClearance() {
  const insets = useSafeAreaInsets();
  const bp = usePortalBreakpoint();
  if (!bp.showBottomNav) return 40;
  return PILL_H + Math.max(insets.bottom, 10) + 24;
}
