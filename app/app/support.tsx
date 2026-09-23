import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

const guides = [
  {
    id: 'wifi',
    icon: 'wifi' as const,
    title: 'Wi-Fi & Home Network',
    subtitle: '5GHz setup, channel tips',
    accent: true,
    body: [
      'Keep your NetSurf Dual-Band router at least 1 meter above floor level and away from thick concrete walls.',
      'Connect Smart TVs and streaming consoles to NetSurf_5G_Home for gigabit throughput.',
    ],
  },
  {
    id: 'billing',
    icon: 'credit-card' as const,
    title: 'Billing & EasyPay Codes',
    subtitle: 'Grace period, client codes',
    body: [
      'Invoices are generated on the 1st with payment grace period until the 25th. Pay at any EasyPay desk using subscriber code #8821940.',
    ],
  },
  {
    id: 'tv',
    icon: 'monitor' as const,
    title: '4K TV Box & EPG Guide',
    subtitle: 'Stream reload, channel pairing',
    body: [
      'To clear the 4K IPTV stream cache, turn off the decoder power switch for 10 seconds, then reconnect via LAN port 2 on your optical gateway.',
    ],
  },
  {
    id: 'fiber',
    icon: 'settings' as const,
    title: 'Fiber Cable & LOS Warning',
    subtitle: 'Yellow optical patch care',
    body: [
      'Do not sharply bend the yellow optical patch cord. If the LOS indicator blinks red, the optical laser connection requires field inspection.',
    ],
  },
];

export default function SupportScreen() {
  const [openId, setOpenId] = useState<string | null>('wifi');

  return (
    <PortalFrame
      title="NetSurf - Support & Help"
      pageTitle="Support & Help"
      subtitle="Sofia, Mladost 4 (Online)"
      headerRight={
        <Pressable accessibilityLabel="Search" className="h-9 w-9 items-center justify-center rounded-xl">
          <Icon name="search" size={20} color="#334155" />
        </Pressable>
      }
    >
      {/* Active ticket */}
      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View className="mb-2 flex-row items-start justify-between">
          <View className="flex-row items-center gap-2">
            <View className="rounded-md border border-sky-100 bg-sky-50 px-2 py-0.5">
              <Text className="text-[11px] font-bold uppercase tracking-wider text-[#0EA5E9]">
                Ticket #TK-98214
              </Text>
            </View>
            <Text className="text-[11px] text-[#475569]">Today, 10:14</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5">
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <Text className="text-[11px] font-semibold text-emerald-700">Assigned</Text>
          </View>
        </View>
        <Text className="mb-1 text-[14px] font-semibold text-[#0F172A]">Wi-Fi 6 Router Upgrade Request</Text>
        <Text className="mb-3 text-[12px] leading-snug text-[#475569]">
          Field technician scheduled for optical gateway deployment & testing.
        </Text>
        <View className="flex-row items-center justify-between border-t border-[#E2E8F0] pt-2.5">
          <View className="flex-row items-center gap-1.5">
            <Icon name="user" size={16} color="#94A3B8" />
            <Text className="text-[12px] font-medium text-[#475569]">Nikolay Ivanov</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-[12px] font-semibold text-[#0EA5E9]">Track status</Text>
            <Icon name="chevron-right" size={14} color={portalColors.accent} />
          </View>
        </View>
      </View>

      {/* Diagnostics */}
      <View className="gap-3.5 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
              <Icon name="zap" size={16} color={portalColors.accent} />
            </View>
            <Text className="text-[14px] font-bold text-[#0F172A]">Hardware Diagnostics</Text>
          </View>
          <Text className="text-[11px] font-medium text-[#475569]">Auto-checked 2m ago</Text>
        </View>

        <View className="flex-row gap-2.5">
          <View className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">Fiber ONT</Text>
              <View className="h-2 w-2 rounded-full bg-[#10B981]" />
            </View>
            <Text className="text-[13px] font-bold text-[#0F172A]">Huawei GPON</Text>
            <Text className="mt-0.5 text-[11px] font-medium text-emerald-600">Synced (-18.2 dBm)</Text>
          </View>
          <View className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
                Gateway Ping
              </Text>
              <Icon name="activity" size={14} color="#10B981" />
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-[15px] font-bold text-[#0F172A]">3.8</Text>
              <Text className="text-[11px] font-medium text-[#475569]">ms</Text>
            </View>
            <Text className="mt-0.5 text-[11px] font-medium text-emerald-600">0% Packet Loss</Text>
          </View>
        </View>

        <Pressable className="h-11 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:scale-[0.99]">
          <Icon name="refresh-cw" size={16} color="#FFFFFF" />
          <Text className="text-[13px] font-semibold text-white">Run Auto-Troubleshoot</Text>
        </Pressable>
      </View>

      {/* Direct channels */}
      <View className="gap-2.5">
        <Text className="px-1 text-[12px] font-bold uppercase tracking-wider text-[#475569]">Direct Channels</Text>

        <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-start justify-between">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                <Icon name="message-circle" size={20} color={portalColors.accent} />
              </View>
              <View>
                <Text className="text-[14px] font-bold text-[#0F172A]">Live Chat</Text>
                <Text className="text-[12px] text-[#475569]">Bulgarian & English support</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5">
              <View className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <Text className="text-[11px] font-semibold text-emerald-700">~2 min wait</Text>
            </View>
          </View>
          <Pressable className="h-10 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:scale-[0.99]">
            <Text className="text-[13px] font-semibold text-white">Start Chat</Text>
            <Icon name="arrow-right" size={16} color="#FFFFFF" />
          </Pressable>
        </View>

        <ChannelRow
          icon="phone"
          title="0700 12 345"
          badge="24/7 Toll-free"
          subtitle="Bulgaria ISP National Dispatch"
          actionLabel="Call"
          onAction={() => Linking.openURL('tel:070012345')}
        />
        <ChannelRow
          icon="calendar"
          title="Field Technician"
          subtitle="Fiber splicing & in-home check"
          actionLabel="Book Slot"
        />
        <ChannelRow
          icon="map-pin"
          title="Mladost 4 Branch"
          badge="Until 20:00"
          badgeTone="success"
          subtitle="Al. Malinov Blvd 78 • 1.2 km"
          actionLabel="Map"
          actionAccent
        />
      </View>

      {/* Knowledge base */}
      <View className="gap-2.5">
        <View className="flex-row items-center justify-between px-0.5">
          <Text className="text-[12px] font-bold uppercase tracking-wider text-[#475569]">Knowledge Base</Text>
          <Text className="text-[11px] text-[#475569]">4 Guides</Text>
        </View>

        <View className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          {guides.map((guide, index) => {
            const open = openId === guide.id;
            return (
              <View
                key={guide.id}
                className={`p-3.5 ${index < guides.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
              >
                <Pressable
                  onPress={() => setOpenId(open ? null : guide.id)}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-1 flex-row items-center gap-2.5">
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-lg ${
                        guide.accent ? 'bg-sky-50' : 'bg-slate-100'
                      }`}
                    >
                      <Icon
                        name={guide.icon}
                        size={16}
                        color={guide.accent ? portalColors.accent : '#334155'}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[13px] font-bold text-[#0F172A]">{guide.title}</Text>
                      <Text className="text-[11px] text-[#475569]">{guide.subtitle}</Text>
                    </View>
                  </View>
                  <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#94A3B8" />
                </Pressable>
                {open ? (
                  <View className="ml-4 mt-3 border-l-2 border-[#0EA5E9] py-1 pl-6 pr-1">
                    {guide.body.map((line) => (
                      <Text key={line} className="mb-1.5 text-[12px] leading-5 text-[#475569]">
                        {line}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>

      <View className="flex-row items-center gap-2.5 rounded-xl border border-sky-100 bg-sky-50/70 p-3">
        <Icon name="info" size={16} color={portalColors.accent} />
        <Text className="flex-1 text-[11px] text-sky-900">
          Mladost 4 fiber node telemetry active. Peak network traffic normal.
        </Text>
      </View>
    </PortalFrame>
  );
}

function ChannelRow({
  icon,
  title,
  subtitle,
  badge,
  badgeTone,
  actionLabel,
  actionAccent,
  onAction,
}: {
  icon: 'phone' | 'calendar' | 'map-pin';
  title: string;
  subtitle: string;
  badge?: string;
  badgeTone?: 'success';
  actionLabel: string;
  actionAccent?: boolean;
  onAction?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-sm">
      <View className="flex-1 flex-row items-center gap-3 pr-2">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          <Icon name={icon} size={20} color="#334155" />
        </View>
        <View className="flex-1">
          <View className="flex-row flex-wrap items-center gap-1.5">
            <Text className="text-[14px] font-bold text-[#0F172A]">{title}</Text>
            {badge ? (
              <View
                className={`rounded px-1.5 py-0.5 ${
                  badgeTone === 'success' ? 'bg-emerald-50' : 'bg-slate-100'
                }`}
              >
                <Text
                  className={`text-[10px] font-medium ${
                    badgeTone === 'success' ? 'text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {badge}
                </Text>
              </View>
            ) : null}
          </View>
          <Text className="text-[11px] text-[#475569]">{subtitle}</Text>
        </View>
      </View>
      <Pressable
        onPress={onAction}
        className="h-9 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-3"
      >
        <Text className={`text-[12px] font-semibold ${actionAccent ? 'text-[#0EA5E9]' : 'text-[#0F172A]'}`}>
          {actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}
