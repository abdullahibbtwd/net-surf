import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Icon, PortalFrame, portalColors, type PortalIcon } from '@/components/portal';

const PROFILE = {
  name: 'Alex Petrov',
  address: 'Sofia, Mladost 4, bl. 412',
  phone: '0882 991 611',
  clientNumber: '849201',
  email: 'alex.petrov@email.bg',
};

const ACTIONS: {
  icon: PortalIcon;
  label: string;
  href?: '/app/alerts';
  destructive?: boolean;
  onPress?: 'logout';
}[] = [
  { icon: 'mail', label: 'Change email' },
  { icon: 'lock', label: 'Change password' },
  { icon: 'bell', label: 'Notification preferences', href: '/app/alerts' },
  { icon: 'log-out', label: 'Log out', destructive: true, onPress: 'logout' },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <PortalFrame
      title="NetSurf - Account & Settings"
      pageTitle="Account"
      subtitle="Profile & preferences"
      headerLeft={
        <Pressable
          accessibilityLabel="Go back"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/app'))}
          className="h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] active:bg-[#F1F5F9]"
        >
          <Icon name="arrow-left" size={20} color={portalColors.ink} />
        </Pressable>
      }
    >
      {/* Profile card */}
      <View className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
        <View className="flex-row items-center gap-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
          <View className="h-14 w-14 overflow-hidden rounded-full border border-[#E2E8F0] bg-[#E0F2FE]">
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs_JXTF6MdkFopDWyZVfaT99Tb0p5AN1uwL8B6vhqMQpraACAHFx3xJzdprdMCvySomJfOXtwfFaEPhaearQkxRwTOKeVTBJolH2BQRuc-6p7IokiLm19mOsn45RiaKwm9sC5ZXbb55NyNMibUrvcfCfALygyPiqb_6bHV8phAs3OtETVQ7gEzIgYDBUMdVzR5be86IyRKlvlzQCLdHP4-oYXx-FZydhODAjTBIUk9ngUHOQeC7OobdA',
              }}
              className="h-full w-full"
              contentFit="cover"
            />
          </View>
          <View className="min-w-0 flex-1">
            <Text className="text-[17px] font-bold tracking-tight text-[#0F172A]">{PROFILE.name}</Text>
            <Text className="mt-0.5 text-[13px] text-[#64748B]">Client #{PROFILE.clientNumber}</Text>
          </View>
        </View>

        <ProfileRow icon="user" label="Full name" value={PROFILE.name} />
        <ProfileRow icon="map-pin" label="Service address" value={PROFILE.address} />
        <ProfileRow icon="phone" label="Phone" value={PROFILE.phone} />
        <ProfileRow icon="hash" label="Client number" value={PROFILE.clientNumber} />
        <ProfileRow icon="mail" label="Email" value={PROFILE.email} last />
      </View>

      {/* Settings actions */}
      <View>
        <Text className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          Settings
        </Text>
        <View className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          {ACTIONS.map((action, index) => {
            const rowClass = `flex-row items-center gap-3 px-4 py-3.5 active:bg-[#F8FAFC] ${
              index < ACTIONS.length - 1 ? 'border-b border-[#E2E8F0]' : ''
            }`;
            const content = (
              <>
                <View
                  className={`h-9 w-9 items-center justify-center rounded-xl ${
                    action.destructive ? 'bg-red-50' : 'bg-[#F1F5F9]'
                  }`}
                >
                  <Icon
                    name={action.icon}
                    size={18}
                    color={action.destructive ? '#DC2626' : portalColors.accent}
                  />
                </View>
                <Text
                  className={`flex-1 text-[15px] font-semibold ${
                    action.destructive ? 'text-red-600' : 'text-[#0F172A]'
                  }`}
                >
                  {action.label}
                </Text>
                <Icon
                  name="chevron-right"
                  size={18}
                  color={action.destructive ? '#F87171' : '#94A3B8'}
                />
              </>
            );

            if (action.href) {
              return (
                <Link key={action.label} href={action.href} asChild>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={action.label}
                    className={rowClass}
                  >
                    {content}
                  </Pressable>
                </Link>
              );
            }

            return (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={() => {
                  if (action.onPress === 'logout') {
                    router.replace('/');
                  }
                }}
                className={rowClass}
              >
                {content}
              </Pressable>
            );
          })}
        </View>
      </View>
    </PortalFrame>
  );
}

function ProfileRow({
  icon,
  label,
  value,
  last,
}: {
  icon: PortalIcon;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-start gap-3 px-4 py-3.5 ${last ? '' : 'border-b border-[#E2E8F0]'}`}
    >
      <View className="mt-0.5 h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC]">
        <Icon name={icon} size={16} color="#64748B" />
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[12px] font-medium text-[#64748B]">{label}</Text>
        <Text className="mt-0.5 text-[15px] font-semibold text-[#0F172A]">{value}</Text>
      </View>
    </View>
  );
}
