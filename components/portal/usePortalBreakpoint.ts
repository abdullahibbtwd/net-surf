import { useWindowDimensions } from 'react-native';

export type PortalBreakpoint = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  showSidebar: boolean;
  sidebarCompact: boolean;
  showBottomNav: boolean;
  contentMaxWidth: number;
  contentPaddingX: number;
  /** Vertical gap between page sections */
  sectionGap: number;
  /** Bottom clearance so content clears the fixed tab bar */
  bottomNavClearance: number;
};

/** Mobile < 768 · Tablet 768–1023 · Desktop ≥ 1024 */
export function usePortalBreakpoint(): PortalBreakpoint {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    showSidebar: !isMobile,
    sidebarCompact: isTablet,
    showBottomNav: isMobile,
    contentMaxWidth: isDesktop ? 920 : isTablet ? 700 : 100_000,
    contentPaddingX: isDesktop ? 40 : isTablet ? 28 : 20,
    sectionGap: isDesktop ? 24 : isTablet ? 20 : 16,
    bottomNavClearance: 88,
  };
}
