import { useEffect } from 'react';
import { Link, usePathname } from 'expo-router';
import { Platform, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, portalColors } from './icons';
import { portalNavItems, type PortalNavItem } from './nav';

const BOUNCE = { damping: 12, stiffness: 260, mass: 0.55 };
const SOFT = { damping: 18, stiffness: 180, mass: 0.7 };

type BottomNavProps = {
  fixed?: boolean;
};

export function BottomNav({ fixed = true }: BottomNavProps) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <View
      className="border-t border-[#E2E8F0] bg-white"
      style={[
        {
          paddingBottom: bottomPad,
          ...(Platform.OS === 'web'
            ? { boxShadow: '0 -8px 28px rgba(15, 23, 42, 0.06)' }
            : {
                shadowColor: '#0F172A',
                shadowOpacity: 0.08,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: -4 },
                elevation: 14,
              }),
        },
        fixed
          ? Platform.OS === 'web'
            ? ({ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 } as const)
            : ({ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100 } as const)
          : null,
      ]}
    >
      <View
        className="mx-auto w-full max-w-[420px] flex-row items-end"
        style={{ height: 64, paddingHorizontal: 20, justifyContent: 'space-between' }}
      >
        {portalNavItems.map((tab) => (
          <BottomTab key={tab.label} item={tab} active={tab.match(pathname)} />
        ))}
      </View>
    </View>
  );
}

function BottomTab({ item, active }: { item: PortalNavItem; active: boolean }) {
  const progress = useSharedValue(active ? 1 : 0);
  const press = useSharedValue(0);
  const pop = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, SOFT);
    if (active) {
      pop.value = withSequence(
        withTiming(0.86, { duration: 70, easing: Easing.out(Easing.quad) }),
        withSpring(1.18, BOUNCE),
        withSpring(1, SOFT),
      );
    } else {
      pop.value = withSpring(1, SOFT);
    }
  }, [active, progress, pop]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.45, 1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => {
    const activeScale = interpolate(progress.value, [0, 1], [0.92, 1.32]);
    const pressScale = interpolate(press.value, [0, 1], [1, 0.88]);
    return {
      transform: [
        { scale: activeScale * pop.value * pressScale },
        { translateY: interpolate(progress.value, [0, 1], [2, -4]) },
      ],
    };
  });

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.55, 1]),
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [4, 0]) },
      { scale: interpolate(progress.value, [0, 1], [0.92, 1]) },
    ],
    color: interpolateColor(progress.value, [0, 1], ['#94A3B8', portalColors.accent]),
  }));

  return (
    <Link href={item.href} asChild>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={item.label}
        onPressIn={() => {
          press.value = withTiming(1, { duration: 80 });
        }}
        onPressOut={() => {
          press.value = withSpring(0, SOFT);
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 6,
          maxWidth: 72,
        }}
      >
        <View style={{ width: 48, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          {/* Soft glow behind active icon */}
          <Animated.View
            pointerEvents="none"
            style={[
              {
                position: 'absolute',
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: '#BAE6FD',
              },
              glowStyle,
            ]}
          />
          <Animated.View style={iconStyle}>
            <View style={{ position: 'relative' }}>
              <Icon
                name={item.icon}
                size={active ? 28 : 22}
                color={active ? portalColors.accent : '#94A3B8'}
              />
              {item.badge === 'dot' && !active ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: -2,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: portalColors.accent,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                  }}
                />
              ) : null}
            </View>
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            {
              marginTop: 2,
              fontSize: active ? 11 : 10,
              lineHeight: 13,
              letterSpacing: 0.15,
              fontWeight: active ? '700' : '600',
              textAlign: 'center',
            },
            labelStyle,
          ]}
        >
          {item.shortLabel ?? item.label}
        </Animated.Text>
      </Pressable>
    </Link>
  );
}
