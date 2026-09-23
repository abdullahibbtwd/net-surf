import { useState } from 'react';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

const MAX_SPEED = 1000;

export default function SpeedScreen() {
  const [speed, setSpeed] = useState(845);
  const [testing, setTesting] = useState(false);

  const progress = testing ? 0 : Math.min(speed / MAX_SPEED, 1);

  const runTest = () => {
    setTesting(true);
    setSpeed(0);
    setTimeout(() => {
      const next = Math.floor(Math.random() * (920 - 780 + 1)) + 780;
      setSpeed(next);
      setTesting(false);
    }, 1200);
  };

  return (
    <PortalFrame title="NetSurf - Wi-Fi Speed Test" pageTitle="Wi-Fi Speed Test">
      <View className="items-center">
        <View className="flex-row items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 shadow-sm">
          <View className="h-2 w-2 rounded-full bg-[#006C49]" />
          <Text className="text-[12px] font-medium text-[#0F172A]">Connected to NetSurf_5G_Home</Text>
          <Text className="text-[10px] text-[#BEC8D2]">•</Text>
          <Text className="text-[12px] text-[#475569]">Living Room Node</Text>
        </View>
      </View>

      <View className="items-center rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <View className="mb-1 self-end">
          <View className="flex-row items-center gap-1 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5">
            <View className="h-1.5 w-1.5 rounded-full bg-[#006C49]" />
            <Text className="text-[11px] font-semibold uppercase text-[#006C49]">Stable Fiber</Text>
          </View>
        </View>

        <View className="my-2 h-56 w-56 items-center justify-center">
          <View className="h-56 w-56 items-center justify-center rounded-full border-[12px] border-[#E2E8F0]">
            <View
              className="absolute inset-0 rounded-full border-[12px] border-transparent"
              style={{
                borderTopColor: '#0EA5E9',
                borderRightColor: progress > 0.25 ? '#0EA5E9' : 'transparent',
                borderBottomColor: progress > 0.5 ? '#0EA5E9' : 'transparent',
                borderLeftColor: progress > 0.75 ? '#0EA5E9' : 'transparent',
                transform: [{ rotate: `${progress * 360}deg` }],
                opacity: testing ? 0.35 : 1,
              }}
            />
            <View className="h-44 w-44 items-center justify-center rounded-full bg-white">
              <Icon name="wifi" size={28} color={portalColors.accent} />
              <Text className="text-[52px] font-extrabold leading-none text-[#0F172A]">
                {testing ? '...' : speed}
              </Text>
              <Text className="mt-1 text-[14px] font-medium text-[#475569]">Mbps Download</Text>
              <View className="mt-1 flex-row items-center gap-1">
                <Icon name="shield" size={14} color="#059669" />
                <Text className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">Ultra Fast</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 w-full flex-row gap-2 border-t border-[#E2E8F0] pt-4">
          <StatWell label="Ping / Latency" value="5" unit="ms" />
          <StatWell label="Jitter" value="1.2" unit="ms" />
          <StatWell label="Upload" value="412" unit="Mbps" />
        </View>
      </View>

      <Pressable
        disabled={testing}
        onPress={runTest}
        className={`h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] shadow-sm active:scale-[0.99] ${
          testing ? 'opacity-75' : ''
        }`}
      >
        <Icon name="refresh-cw" size={20} color="#FFFFFF" />
        <Text className="text-[16px] font-semibold text-white">
          {testing ? 'Testing Fiber Stream...' : 'Run New Speed Test'}
        </Text>
      </Pressable>

      <View className="gap-3 pt-1">
        <View className="flex-row items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <View className="flex-1 flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-xl border border-[#A7F3D0] bg-[#ECFDF5]">
              <Icon name="bar-chart-2" size={22} color="#006C49" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[14px] font-semibold text-[#0F172A]">Signal Strength</Text>
                <View className="rounded-full border border-[#A7F3D0]/60 bg-[#ECFDF5] px-2 py-0.5">
                  <Text className="text-[11px] font-bold uppercase text-[#006C49]">Optimal</Text>
                </View>
              </View>
              <Text className="mt-0.5 text-[12px] text-[#475569]">Excellent (-48 dBm) • 5 of 5 Bars</Text>
            </View>
          </View>
          <View className="h-6 flex-row items-end gap-1 pr-1">
            {[8, 12, 16, 20, 24].map((h) => (
              <View key={h} className="w-1.5 rounded-sm bg-[#006C49]" style={{ height: h }} />
            ))}
          </View>
        </View>

        <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#EAEDFF]">
                <Icon name="monitor" size={22} color={portalColors.accent} />
              </View>
              <View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-[14px] font-semibold text-[#0F172A]">Connected Devices</Text>
                  <View className="h-2 w-2 rounded-full bg-[#006C49]" />
                </View>
                <Text className="mt-0.5 text-[12px] text-[#475569]">14 Active on Current Node</Text>
              </View>
            </View>
            <Text className="text-[12px] font-semibold text-[#475569]">Manage</Text>
          </View>
          <View className="mt-3 flex-row flex-wrap gap-2 border-t border-[#E2E8F0] pt-3">
            {['2 TVs', '4 Phones', '1 Console', '7 IoT'].map((label) => (
              <View key={label} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1">
                <Text className="text-[11px] font-semibold uppercase text-[#475569]">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="flex-row items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <View className="mt-0.5 h-8 w-8 rounded-full bg-[#DE8712]/15 items-center justify-center">
            <Icon name="zap" size={16} color="#8A5100" />
          </View>
          <View className="flex-1">
            <Text className="text-[11px] font-bold uppercase tracking-wide text-[#0F172A]">Performance Tip</Text>
            <Text className="mt-0.5 text-[14px] leading-5 text-[#475569]">
              Keep your optical router elevated off the floor and away from thick concrete walls for full home
              coverage.
            </Text>
          </View>
        </View>
      </View>

      <Link href="/app/wifi-config" asChild>
        <Pressable className="flex-row items-center justify-center gap-1.5 py-2 active:opacity-70">
          <Icon name="settings" size={14} color="#64748B" />
          <Text className="text-[13px] font-semibold text-[#64748B]">Advanced settings</Text>
          <Icon name="chevron-right" size={14} color="#94A3B8" />
        </Pressable>
      </Link>
    </PortalFrame>
  );
}

function StatWell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View className="flex-1 rounded-xl border border-[#E2E8F0]/60 bg-[#F8FAFC] p-2.5">
      <Text className="text-center text-[12px] text-[#475569]">{label}</Text>
      <View className="mt-0.5 flex-row items-baseline justify-center gap-0.5">
        <Text className="text-[18px] font-bold text-[#0F172A]">{value}</Text>
        <Text className="text-[12px] text-[#475569]">{unit}</Text>
      </View>
    </View>
  );
}
