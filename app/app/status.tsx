import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { useLanguage } from '@/components/Language';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

export default function StatusScreen() {
  const { t } = useLanguage();
  const [spinning, setSpinning] = useState(false);

  const refresh = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <PortalFrame
      title={t.statusTitle}
      pageTitle={t.statusPageTitle}
      headerRight={
        <Pressable accessibilityLabel="Refresh Status" onPress={refresh} className="p-1">
          <View style={{ transform: [{ rotate: spinning ? '180deg' : '0deg' }] }}>
            <Icon name="refresh-cw" size={20} color="#475569" />
          </View>
        </Pressable>
      }
    >
      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 flex-row gap-2.5">
            <View className="mt-0.5 h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]">
              <Icon name="navigation" size={16} color={portalColors.accent} />
            </View>
            <View className="flex-1">
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                {t.serviceLocation}
              </Text>
              <Text className="text-[14px] font-semibold leading-tight text-[#0F172A]">
                {t.serviceAddress}
              </Text>
              <Text className="mt-0.5 text-[12px] text-[#475569]">
                {t.nodeLabel}{' '}
                <Text className="font-medium text-[#0F172A]">{t.nodeName}</Text>
              </Text>
            </View>
          </View>
          <View className="flex-row items-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5">
            <View className="mr-1 h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            <Text className="text-[11px] font-semibold uppercase text-[#059669]">{t.synced}</Text>
          </View>
        </View>
      </View>

      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View className="items-center py-2">
          <View className="mb-2.5 flex-row items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-1.5">
            <View className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            <Text className="text-[14px] font-semibold text-[#059669]">{t.allSystemsOk}</Text>
          </View>
          <Text className="max-w-[280px] text-center text-[14px] leading-5 text-[#475569]">
            {t.noIncidents}
          </Text>
          <View className="mt-4 w-full flex-row gap-2 border-t border-[#E2E8F0] pt-3">
            <MetricTile label={t.latency} value="4.2 ms" />
            <MetricTile label={t.packetLoss} value="0.00%" valueColor="#059669" />
            <MetricTile label={t.uptime} value="99.98%" />
          </View>
        </View>
      </View>

      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-[13px] font-semibold text-[#0F172A]">{t.districtGrid}</Text>
            <Text className="text-[12px] text-[#475569]">{t.metroRing}</Text>
          </View>
          <View className="rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5">
            <Text className="text-[11px] font-semibold uppercase text-[#0EA5E9]">{t.liveTelemetry}</Text>
          </View>
        </View>

        <View className="relative h-[184px] items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2">
          <MapNode top={60} left={40} label="Lyulin" />
          <MapNode top={42} left={130} label="Center" size="lg" />
          <MapNode top={120} left={135} label="Lozenets" />
          <MapNode top={60} right={75} label="Druzhba" />
          <View className="absolute right-[45px] top-[110px] items-center">
            <View className="relative h-7 w-7 items-center justify-center">
              <View className="absolute h-7 w-7 rounded-full bg-[#0EA5E9] opacity-30" />
              <View className="h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#0EA5E9]">
                <View className="h-1.5 w-1.5 rounded-full bg-white" />
              </View>
            </View>
            <View className="mt-1 rounded border border-[#0EA5E9]/30 bg-white px-1.5 py-0.5">
              <Text className="text-[10px] font-bold text-[#0EA5E9]">{t.youHere}</Text>
            </View>
          </View>
        </View>

        <View className="mt-3 flex-row items-center justify-between px-1">
          <View className="flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-[#10B981]" />
            <Text className="text-[12px] text-[#475569]">{t.allHubsNormal}</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
            <Text className="text-[12px] text-[#475569]">{t.yourGateway}</Text>
          </View>
        </View>
      </View>

      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <Text className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
          {t.networkLogs}
        </Text>
        <View className="flex-row items-center justify-between border-b border-[#E2E8F0] py-2">
          <View className="flex-row items-center gap-2">
            <Icon name="check-circle" size={18} color="#059669" />
            <Text className="text-[14px] font-semibold text-[#0F172A]">{t.zeroOutages}</Text>
          </View>
          <View className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5">
            <Text className="text-[12px] text-[#059669]">{t.normal}</Text>
          </View>
        </View>
        <View className="mt-3 flex-row items-start gap-2.5">
          <View className="mt-0.5 h-7 w-7 items-center justify-center rounded border border-amber-200 bg-amber-50">
            <Icon name="tool" size={14} color="#8A5100" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-[13px] font-semibold text-[#0F172A]">{t.scheduledMaint}</Text>
              <View className="rounded border border-amber-200 bg-amber-50 px-1.5">
                <Text className="text-[10px] font-bold text-[#8A5100]">{t.planned}</Text>
              </View>
            </View>
            <Text className="mt-0.5 text-[12px] font-medium text-[#0EA5E9]">{t.maintWindow}</Text>
            <Text className="mt-1 text-[12px] leading-relaxed text-[#475569]">{t.maintBody}</Text>
          </View>
        </View>
      </View>

      <View className="gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <View>
          <Text className="text-[13px] font-semibold text-[#0F172A]">{t.localSlowness}</Text>
          <Text className="mt-0.5 text-[12px] text-[#475569]">{t.localSlownessSub}</Text>
        </View>
        <View className="flex-row gap-2.5">
          <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-1.5 rounded-xl border border-[#0EA5E9] bg-sky-50 active:scale-[0.98]">
            <Icon name="activity" size={16} color="#006591" />
            <Text className="text-xs font-semibold text-[#006591]">{t.runDiagnostics}</Text>
          </Pressable>
          <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-1.5 rounded-xl bg-[#0EA5E9] active:scale-[0.98]">
            <Icon name="alert-triangle" size={16} color="#FFFFFF" />
            <Text className="text-xs font-semibold text-white">{t.reportIssue}</Text>
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
          <View className="flex-row items-center gap-1.5">
            <Icon name="phone" size={14} color={portalColors.accent} />
            <Text className="text-xs font-medium text-[#0F172A]">0700 12 345</Text>
          </View>
          <Pressable
            onPress={() => Linking.openURL('mailto:support@netsurf.bg')}
            className="flex-row items-center gap-1"
          >
            <Icon name="mail" size={12} color={portalColors.accent} />
            <Text className="text-[11px] font-medium text-[#0EA5E9]">support@netsurf.bg</Text>
          </Pressable>
        </View>
      </View>
    </PortalFrame>
  );
}

function MetricTile({
  label,
  value,
  valueColor = '#0F172A',
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View className="flex-1 items-center justify-center rounded-xl bg-[#F8FAFC] p-2">
      <Text className="mb-0.5 text-[11px] font-semibold uppercase text-[#475569]">{label}</Text>
      <Text className="text-[14px] font-semibold" style={{ color: valueColor }}>
        {value}
      </Text>
    </View>
  );
}

function MapNode({
  top,
  left,
  right,
  label,
  size = 'sm',
}: {
  top: number;
  left?: number;
  right?: number;
  label: string;
  size?: 'sm' | 'lg';
}) {
  const dim = size === 'lg' ? 14 : 12;
  return (
    <View className="absolute items-center" style={{ top, left, right }}>
      <View
        className="rounded-full border-2 border-white bg-[#10B981] shadow-sm"
        style={{ width: dim, height: dim }}
      />
      <Text className="mt-1 rounded border border-[#E2E8F0] bg-white/80 px-1 text-[10px] font-semibold text-[#475569]">
        {label}
      </Text>
    </View>
  );
}
