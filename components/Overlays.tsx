import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import type { InternetPackage } from '@/services';
import { AuroraDemo } from './AuroraDemo';
import { ChannelListSheet } from './ChannelListSheet';
import { CheckoutSheet } from './CheckoutSheet';
import { CoverageDrawer } from './CoverageDrawer';

type OverlayContextValue = {
  openCoverage: () => void;
  openOrder: (plan: InternetPackage) => void;
  openChannels: (plan: InternetPackage) => void;
  openAurora: () => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: PropsWithChildren) {
  const [coverage, setCoverage] = useState(false);
  const [orderPlan, setOrderPlan] = useState<InternetPackage | null>(null);
  const [channelPlan, setChannelPlan] = useState<InternetPackage | null>(null);
  const [aurora, setAurora] = useState(false);

  const value = useMemo(
    () => ({
      openCoverage: () => setCoverage(true),
      openOrder: setOrderPlan,
      openChannels: setChannelPlan,
      openAurora: () => setAurora(true),
    }),
    [],
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
      <CoverageDrawer visible={coverage} onClose={() => setCoverage(false)} />
      <CheckoutSheet plan={orderPlan} onClose={() => setOrderPlan(null)} />
      <ChannelListSheet plan={channelPlan} onClose={() => setChannelPlan(null)} />
      <AuroraDemo visible={aurora} onClose={() => setAurora(false)} />
    </OverlayContext.Provider>
  );
}

export function useOverlays() {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error('useOverlays must be used inside OverlayProvider');
  }
  return ctx;
}
