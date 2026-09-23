import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon, PortalFrame, portalColors, usePortalBreakpoint } from '@/components/portal';

export default function PortalHomeScreen() {
  const bp = usePortalBreakpoint();

  return (
    <PortalFrame
      title="NetSurf ISP - Customer Portal"
      pageTitle={bp.isMobile ? 'NetSurf' : 'Dashboard'}
      subtitle={bp.isMobile ? undefined : 'Sofia, Mladost 4 · Account #849201'}
      headerRight={
        <Link href="/app/account" asChild>
          <Pressable
            accessibilityLabel="Account settings"
            className="h-9 w-9 overflow-hidden rounded-full border border-[#E2E8F0] bg-[#E0F2FE] active:opacity-80 md:hidden"
          >
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs_JXTF6MdkFopDWyZVfaT99Tb0p5AN1uwL8B6vhqMQpraACAHFx3xJzdprdMCvySomJfOXtwfFaEPhaearQkxRwTOKeVTBJolH2BQRuc-6p7IokiLm19mOsn45RiaKwm9sC5ZXbb55NyNMibUrvcfCfALygyPiqb_6bHV8phAs3OtETVQ7gEzIgYDBUMdVzR5be86IyRKlvlzQCLdHP4-oYXx-FZydhODAjTBIUk9ngUHOQeC7OobdA',
              }}
              className="h-full w-full"
              contentFit="cover"
            />
          </Pressable>
        </Link>
      }
    >
      <View className="gap-1">
        <Text className="text-[24px] font-semibold leading-8 tracking-tight text-[#0F172A] md:text-[28px]">
          Good afternoon, Alex
        </Text>
        <Text className="text-[14px] leading-5 text-[#64748B]">
          {bp.isMobile
            ? 'Sofia, Mladost 4 · Account #849201'
            : 'Your fiber service is online and performing within plan.'}
        </Text>
      </View>

      <View className={`${bp.isDesktop ? 'flex-row items-start' : ''}`} style={{ gap: bp.sectionGap }}>
        <View className={bp.isDesktop ? 'flex-1' : 'w-full'} style={{ gap: bp.sectionGap }}>
          <View className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <View className="mb-4 flex-row items-center justify-between gap-2">
              <View className="flex-row flex-wrap items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1">
                <View className="h-2 w-2 rounded-full bg-[#10B981]" />
                <Text className="text-[13px] font-semibold leading-4 text-[#059669]">
                  Ultra Fiber 1Gbps · Online
                </Text>
              </View>
              <Icon name="wifi" size={20} color={portalColors.muted} />
            </View>

            <View className="flex-row rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] p-3">
              <MetricCell label="Download" value="942" unit="Mbps" icon="arrow-down" iconColor="#059669" />
              <MetricCell
                label="Upload"
                value="890"
                unit="Mbps"
                icon="arrow-up"
                iconColor={portalColors.accent}
                border
              />
              <MetricCell label="Latency" value="4" unit="ms" icon="clock" iconColor="#EAB308" />
            </View>
          </View>

          <View className="gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 gap-1 pr-2">
                <View className="flex-row items-center gap-1.5 self-start rounded-lg bg-[#F1F5F9] px-2 py-1">
                  <Icon name="calendar" size={14} color={portalColors.accent} />
                  <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#0F172A]">
                    Due in 6 days · 18 Nov
                  </Text>
                </View>
                <Text className="pt-1 text-[16px] font-semibold leading-6 text-[#0F172A]">
                  GigaHome + 180 TV Channels
                </Text>
                <Text className="text-[12px] leading-4 text-[#64748B]">
                  34.90 BGN/mo · Optical FTTH Terminal Active
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-[20px] font-bold leading-7 text-[#0F172A]">34.90</Text>
                <Text className="text-[12px] leading-4 text-[#64748B]">BGN</Text>
              </View>
            </View>

            <View className="gap-1.5">
              <View className="flex-row justify-between">
                <Text className="text-[12px] leading-4 text-[#64748B]">Data Usage</Text>
                <Text className="text-[14px] font-semibold leading-5 text-[#0F172A]">420 GB / Unlimited</Text>
              </View>
              <View className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <View className="h-2 w-[42%] rounded-full bg-[#0EA5E9]" />
              </View>
            </View>

            <Link href="/app/billing" asChild>
              <Pressable className="h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:opacity-90">
                <Icon name="credit-card" size={18} color="#FFFFFF" />
                <Text className="text-[14px] font-semibold text-white">Pay Bill (34.90 BGN)</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View className={bp.isDesktop ? 'w-[340px]' : 'w-full'} style={{ gap: bp.sectionGap }}>
          <View className="gap-3">
            <Text className="px-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Quick Actions
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 12 }}>
              <QuickAction
                href="/app/speed"
                icon="activity"
                title="Test Wi-Fi Speed"
                subtitle="Run speed test"
                highlighted
                wide={bp.isDesktop}
              />
              <QuickAction
                icon="refresh-cw"
                title="Reboot Optical ONT"
                subtitle="Restart terminal"
                wide={bp.isDesktop}
              />
              <QuickAction
                icon="monitor"
                title="TV Channels Guide"
                subtitle="180 interactive"
                wide={bp.isDesktop}
              />
              <QuickAction
                href="/app/support"
                icon="message-circle"
                title="Support Chat"
                subtitle="24/7 Sofia NOC"
                wide={bp.isDesktop}
              />
            </View>
          </View>

          <Link href="/app/speed" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm active:opacity-90">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC]">
                  <Icon name="smartphone" size={20} color={portalColors.accent} />
                </View>
                <View>
                  <Text className="text-[14px] font-semibold leading-5 text-[#0F172A]">8 Devices Connected</Text>
                  <Text className="text-[12px] leading-4 text-[#64748B]">Wi-Fi 6 Mesh Network active</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color={portalColors.muted} />
            </Pressable>
          </Link>
        </View>
      </View>
    </PortalFrame>
  );
}

function MetricCell({
  label,
  value,
  unit,
  icon,
  iconColor,
  border,
}: {
  label: string;
  value: string;
  unit: string;
  icon: 'arrow-down' | 'arrow-up' | 'clock';
  iconColor: string;
  border?: boolean;
}) {
  return (
    <View className={`flex-1 items-center ${border ? 'border-x border-[#E2E8F0]' : ''}`}>
      <View className="mb-0.5 flex-row items-center gap-1">
        <Icon name={icon} size={12} color={iconColor} />
        <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">{label}</Text>
      </View>
      <View className="flex-row items-baseline gap-0.5">
        <Text className="text-[20px] font-bold leading-7 text-[#0F172A]">{value}</Text>
        <Text className="text-[12px] leading-4 text-[#64748B]">{unit}</Text>
      </View>
    </View>
  );
}

function QuickAction({
  href,
  icon,
  title,
  subtitle,
  highlighted,
  wide,
}: {
  href?: '/app/speed' | '/app/support';
  icon: 'activity' | 'refresh-cw' | 'monitor' | 'message-circle';
  title: string;
  subtitle: string;
  highlighted?: boolean;
  wide?: boolean;
}) {
  const content = (
    <Pressable
      className={`gap-2 rounded-2xl border bg-white p-3.5 active:scale-[0.98] ${
        highlighted ? 'border-[#0EA5E9]/40' : 'border-[#E2E8F0]'
      }`}
      style={{ width: wide ? '100%' : '48%' }}
    >
      <View
        className={`h-9 w-9 items-center justify-center rounded-xl ${
          highlighted ? 'bg-[#0EA5E9]/10' : 'border border-[#E2E8F0] bg-[#F8FAFC]'
        }`}
      >
        <Icon name={icon} size={20} color={highlighted ? portalColors.accent : portalColors.muted} />
      </View>
      <View>
        <Text className="text-[14px] font-semibold leading-5 text-[#0F172A]">{title}</Text>
        <Text className="text-[12px] leading-4 text-[#64748B]">{subtitle}</Text>
      </View>
    </Pressable>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }

  return content;
}
