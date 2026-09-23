import { useEffect, useState, type PropsWithChildren, type ReactNode } from 'react';
import Head from 'expo-router/head';
import { Modal, Platform, Pressable, ScrollView, View } from 'react-native';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useCustomTabBarClearance } from './CustomTabBar';
import { SideNav } from './SideNav';
import { TopAppBar } from './TopAppBar';
import { usePortalBreakpoint } from './usePortalBreakpoint';

type PortalFrameProps = PropsWithChildren<{
  title: string;
  pageTitle?: string;
  subtitle?: string;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  hideHeader?: boolean;
}>;

export function PortalFrame({
  title,
  pageTitle,
  subtitle,
  headerLeft,
  headerRight,
  hideHeader,
  children,
}: PortalFrameProps) {
  const bp = usePortalBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const bottomClearance = useCustomTabBarClearance();

  useEffect(() => {
    if (!bp.isMobile && drawerOpen) setDrawerOpen(false);
  }, [bp.isMobile, drawerOpen]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return undefined;
    const nodes = [document.documentElement, document.body, document.getElementById('root')];
    nodes.forEach((node) => node?.classList.add('portal-active'));
    return () => {
      nodes.forEach((node) => node?.classList.remove('portal-active'));
    };
  }, []);

  const isWeb = Platform.OS === 'web';

  return (
    <View
      className={isWeb ? 'portal-shell bg-[#F1F5F9]' : 'bg-[#F1F5F9]'}
      style={
        isWeb
          ? undefined
          : {
              flex: 1,
              height: bp.height,
              overflow: 'hidden',
            }
      }
    >
      <Head>
        <title>{title}</title>
      </Head>

      {bp.showSidebar ? (
        <View
          className={isWeb ? 'portal-sidebar' : undefined}
          style={
            isWeb
              ? { flexShrink: 0 }
              : { height: '100%', alignSelf: 'stretch', flexShrink: 0 }
          }
        >
          <SideNav compact={bp.sidebarCompact} fullHeight />
        </View>
      ) : null}

      <View
        className={isWeb ? 'portal-main' : undefined}
        style={
          isWeb
            ? undefined
            : { flex: 1, minHeight: 0, minWidth: 0, position: 'relative' }
        }
      >
        {!hideHeader ? (
          <TopAppBar
            title={pageTitle}
            subtitle={subtitle}
            left={headerLeft}
            right={
              <View className="flex-row items-center gap-2">
                <LanguageSwitcher />
                {headerRight}
              </View>
            }
            showMenuButton={bp.isMobile && !headerLeft}
            onMenuPress={() => setDrawerOpen(true)}
            elevated
          />
        ) : null}

        <ScrollView
          className={isWeb ? 'portal-scroll' : undefined}
          style={isWeb ? { flex: 1, minHeight: 0 } : { flex: 1 }}
          contentContainerStyle={{
            paddingTop: bp.isDesktop ? 32 : 20,
            paddingHorizontal: bp.contentPaddingX,
            paddingBottom: bottomClearance,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator
          bounces
          nestedScrollEnabled
        >
          <View
            style={{
              width: '100%',
              maxWidth: bp.contentMaxWidth,
              gap: bp.sectionGap,
            }}
          >
            {children}
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={drawerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDrawerOpen(false)}
      >
        <View className="flex-1 flex-row">
          <View className="h-full bg-white" style={{ width: 280 }}>
            <SideNav onNavigate={() => setDrawerOpen(false)} fullHeight />
          </View>
          <Pressable
            accessibilityLabel="Close navigation menu"
            className="flex-1 bg-[#0F172A]/45"
            onPress={() => setDrawerOpen(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
