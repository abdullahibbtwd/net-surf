import { useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Icon, PortalFrame } from '@/components/portal';

export default function AlertsScreen() {
  const [tab, setTab] = useState<'alerts' | 'prefs'>('alerts');
  const [prefs, setPrefs] = useState({ network: true, billing: true, offers: false });

  return (
    <PortalFrame
      title="NetSurf - Notifications & Preferences"
      pageTitle="Notifications"
      headerRight={
        <Pressable>
          <Text className="text-[13px] font-semibold text-[#0EA5E9]">Mark all read</Text>
        </Pressable>
      }
    >
      <View className="flex-row rounded-xl bg-[#EAEDFF] p-1">
        <Pressable
          onPress={() => setTab('alerts')}
          className={`flex-1 rounded-lg py-1.5 ${tab === 'alerts' ? 'bg-white shadow-sm' : ''}`}
        >
          <Text
            className={`text-center text-[13px] font-semibold ${
              tab === 'alerts' ? 'text-[#0F172A]' : 'text-[#475569]'
            }`}
          >
            All Alerts
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('prefs')}
          className={`flex-1 rounded-lg py-1.5 ${tab === 'prefs' ? 'bg-white shadow-sm' : ''}`}
        >
          <Text
            className={`text-center text-[13px] font-semibold ${
              tab === 'prefs' ? 'text-[#0F172A]' : 'text-[#475569]'
            }`}
          >
            Preferences
          </Text>
        </Pressable>
      </View>

      {tab === 'alerts' ? (
        <View>
          <View className="mb-2.5 flex-row items-center justify-between">
            <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">Recent Alerts</Text>
            <View className="flex-row items-center rounded-full border border-[#006C49] bg-[#6FFBBE] px-2 py-0.5">
              <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#006C49]" />
              <Text className="text-[12px] text-[#002113]">Sofia East Node: Live</Text>
            </View>
          </View>

          <View className="gap-3">
            <AlertCard
              icon="check-circle"
              iconBg="bg-[#6CF8BB]"
              iconColor="#006C49"
              title="Scheduled Maintenance Complete"
              time="2h ago"
              body="Mladost 4 node fiber upgrade finished at 04:30 AM. Speeds restored to 1 Gbps."
              footer={
                <View className="mt-2.5 flex-row items-center gap-2">
                  <View className="rounded bg-[#EAEDFF] px-2 py-0.5">
                    <Text className="text-[12px] text-[#0F172A]">Node #ML4-SOF</Text>
                  </View>
                  <Text className="text-[12px] font-medium text-[#006C49]">Verified Stable</Text>
                </View>
              }
            />

            <AlertCard
              icon="file-text"
              iconBg="bg-[#C9E6FF]"
              iconColor="#006591"
              title="Invoice Generated for November"
              time="Yesterday"
              body="Monthly invoice #NET-849201 is ready. Amount: 34.90 лв."
              footer={
                <View className="mt-3 flex-row gap-2">
                  <Link href="/app/billing" asChild>
                    <Pressable className="rounded-lg bg-[#0EA5E9] px-3 py-1">
                      <Text className="text-[13px] font-semibold text-white">Pay Now</Text>
                    </Pressable>
                  </Link>
                  <Pressable className="rounded-lg bg-[#EAEDFF] px-3 py-1">
                    <Text className="text-[13px] font-semibold text-[#0F172A]">View PDF</Text>
                  </Pressable>
                </View>
              }
            />

            <AlertCard
              icon="wifi"
              iconBg="bg-[#EAEDFF]"
              iconColor="#006591"
              title="Wi-Fi Signal Optimization"
              time="3 days ago"
              body="Your router detected channel interference and auto-switched to channel 48 for lower latency."
              footer={
                <View className="mt-2.5 flex-row gap-4">
                  <Text className="text-[12px] text-[#475569]">12ms Latency</Text>
                  <Text className="text-[12px] text-[#475569]">5 GHz Band</Text>
                </View>
              }
            />
          </View>

          <Link href="/app/status" asChild>
            <Pressable className="mt-4 flex-row items-center justify-between rounded-xl border border-[#BEC8D2] bg-[#EAEDFF] p-3">
              <View className="flex-row items-center gap-2.5">
                <View className="h-7 w-7 items-center justify-center rounded-full bg-[#C9E6FF]">
                  <Icon name="activity" size={14} color="#006591" />
                </View>
                <Text className="text-[13px] font-semibold text-[#0F172A]">View live service status</Text>
              </View>
              <Icon name="chevron-right" size={16} color="#475569" />
            </Pressable>
          </Link>
        </View>
      ) : (
        <View>
          <Text className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
            Notification Preferences
          </Text>
          <View className="overflow-hidden rounded-xl border border-[#BEC8D2] bg-white">
            <PrefRow
              title="Network & Outage Alerts"
              subtitle="Critical service interruptions and repair updates"
              value={prefs.network}
              onToggle={() => setPrefs((p) => ({ ...p, network: !p.network }))}
            />
            <View className="ml-3.5 h-px bg-[#BEC8D2]" />
            <PrefRow
              title="Payment & Billing Reminders"
              subtitle="Invoices and auto-pay receipts"
              value={prefs.billing}
              onToggle={() => setPrefs((p) => ({ ...p, billing: !p.billing }))}
            />
            <View className="ml-3.5 h-px bg-[#BEC8D2]" />
            <PrefRow
              title="Special Offers & Upgrades"
              subtitle="New speed tiers, partner TV channels"
              value={prefs.offers}
              onToggle={() => setPrefs((p) => ({ ...p, offers: !p.offers }))}
            />
          </View>

          <Pressable className="mt-4 flex-row items-center justify-between rounded-xl border border-[#BEC8D2] bg-[#EAEDFF] p-3">
            <View className="flex-row items-center gap-2.5">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#C9E6FF]">
                <Icon name="message-circle" size={14} color="#006591" />
              </View>
              <Text className="text-[13px] font-semibold text-[#0F172A]">Need SMS dispatch notifications?</Text>
            </View>
            <Icon name="chevron-right" size={16} color="#475569" />
          </Pressable>
        </View>
      )}
    </PortalFrame>
  );
}

function AlertCard({
  icon,
  iconBg,
  iconColor,
  title,
  time,
  body,
  footer,
}: {
  icon: 'check-circle' | 'file-text' | 'wifi';
  iconBg: string;
  iconColor: string;
  title: string;
  time: string;
  body: string;
  footer?: ReactNode;
}) {
  return (
    <View className="rounded-xl border border-[#BEC8D2] bg-white p-3.5 shadow-sm">
      <View className="flex-row items-start gap-3">
        <View className={`mt-0.5 h-9 w-9 items-center justify-center rounded-full ${iconBg}`}>
          <Icon name={icon} size={18} color={iconColor} />
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-[14px] font-semibold text-[#0F172A]" numberOfLines={1}>
              {title}
            </Text>
            <Text className="ml-2 text-[12px] text-[#475569]">{time}</Text>
          </View>
          <Text className="mt-1 text-[14px] leading-5 text-[#475569]">{body}</Text>
          {footer}
        </View>
      </View>
    </View>
  );
}

function PrefRow({
  title,
  subtitle,
  value,
  onToggle,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between p-3.5">
      <View className="flex-1 pr-3">
        <Text className="text-[14px] font-semibold text-[#0F172A]">{title}</Text>
        <Text className="mt-0.5 text-[12px] text-[#475569]">{subtitle}</Text>
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        onPress={onToggle}
        className={`h-6 w-11 justify-center rounded-full p-0.5 ${
          value ? 'items-end bg-[#0EA5E9]' : 'items-start bg-[#BEC8D2]'
        }`}
      >
        <View className="h-5 w-5 rounded-full border border-[#BEC8D2] bg-white" />
      </Pressable>
    </View>
  );
}
