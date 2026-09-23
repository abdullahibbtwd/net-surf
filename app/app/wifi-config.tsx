import { useState, type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useLanguage } from '@/components/Language';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

type Band = '2.4' | '5';
type Security = 'WPA2' | 'WPA3';

export default function WifiConfigScreen() {
  const { t } = useLanguage();
  const router = useRouter();
  const [ssid, setSsid] = useState('NetSurf_5G_Home');
  const [password, setPassword] = useState('NetSurf-Home-2024');
  const [showPassword, setShowPassword] = useState(false);
  const [band, setBand] = useState<Band>('5');
  const [security, setSecurity] = useState<Security>('WPA3');
  const [securityOpen, setSecurityOpen] = useState(false);
  const [hiddenNetwork, setHiddenNetwork] = useState(false);
  const [wifiActive, setWifiActive] = useState(true);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PortalFrame
      title={t.wifiTitle}
      pageTitle={t.wifiPageTitle}
      subtitle={t.advancedSettings}
      headerLeft={
        <Pressable
          accessibilityLabel="Back to speed test"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/app/speed'))}
          className="h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] active:bg-[#F1F5F9]"
        >
          <Icon name="arrow-left" size={20} color={portalColors.ink} />
        </Pressable>
      }
    >
      <Text className="text-[14px] leading-5 text-[#64748B]">{t.wifiIntro}</Text>

      {/* Network identity */}
      <Section title={t.networkIdentity}>
        <FieldLabel label={t.networkName} />
        <TextInput
          value={ssid}
          onChangeText={setSsid}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={t.networkNamePlaceholder}
          placeholderTextColor="#94A3B8"
          className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-3 text-[15px] text-[#0F172A]"
        />

        <View className="mt-4">
          <FieldLabel label={t.password} />
          <View className="flex-row items-center rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pr-2">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder={t.wifiPasswordPlaceholder}
              placeholderTextColor="#94A3B8"
              className="min-w-0 flex-1 px-3.5 py-3 text-[15px] text-[#0F172A]"
            />
            <Pressable
              accessibilityLabel={showPassword ? t.hidePassword : t.showPassword}
              onPress={() => setShowPassword((v) => !v)}
              className="h-9 w-9 items-center justify-center rounded-lg active:bg-[#E2E8F0]"
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color="#64748B" />
            </Pressable>
          </View>
        </View>
      </Section>

      {/* Radio */}
      <Section title={t.radio}>
        <FieldLabel label={t.band} />
        <View className="flex-row rounded-xl bg-[#F1F5F9] p-1">
          {([
            { id: '2.4' as const, label: '2.4 GHz' },
            { id: '5' as const, label: '5 GHz' },
          ]).map((option) => {
            const active = band === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setBand(option.id)}
                className={`flex-1 rounded-lg py-2.5 ${active ? 'bg-white shadow-sm' : ''}`}
              >
                <Text
                  className={`text-center text-[13px] font-semibold ${
                    active ? 'text-[#0EA5E9]' : 'text-[#64748B]'
                  }`}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-4">
          <FieldLabel label={t.securityType} />
          <Pressable
            onPress={() => setSecurityOpen((v) => !v)}
            className="flex-row items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-3 active:bg-[#F1F5F9]"
          >
            <Text className="text-[15px] font-medium text-[#0F172A]">
              {security === 'WPA3' ? t.wpa3Recommended : 'WPA2'}
            </Text>
            <Icon name={securityOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#64748B" />
          </Pressable>
          {securityOpen ? (
            <View className="mt-2 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
              {([
                { id: 'WPA3' as const, label: t.wpa3Recommended },
                { id: 'WPA2' as const, label: 'WPA2' },
              ]).map((option, i) => (
                <Pressable
                  key={option.id}
                  onPress={() => {
                    setSecurity(option.id);
                    setSecurityOpen(false);
                  }}
                  className={`flex-row items-center justify-between px-3.5 py-3 active:bg-[#F8FAFC] ${
                    i === 0 ? 'border-b border-[#E2E8F0]' : ''
                  }`}
                >
                  <Text className="text-[14px] font-medium text-[#0F172A]">{option.label}</Text>
                  {security === option.id ? (
                    <Icon name="check" size={18} color={portalColors.accent} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </Section>

      {/* Visibility & power */}
      <Section title={t.visibilityPower}>
        <ToggleRow
          title={t.hiddenNetwork}
          subtitle={t.hiddenNetworkSub}
          value={hiddenNetwork}
          onToggle={() => setHiddenNetwork((v) => !v)}
        />
        <View className="my-1 h-px bg-[#E2E8F0]" />
        <ToggleRow
          title={t.wifiActive}
          subtitle={t.wifiActiveSub}
          value={wifiActive}
          onToggle={() => setWifiActive((v) => !v)}
          last
        />
      </Section>

      <Pressable
        onPress={save}
        className="h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:opacity-90"
      >
        <Icon name={saved ? 'check' : 'save'} size={18} color="#FFFFFF" />
        <Text className="text-[15px] font-semibold text-white">
          {saved ? t.changesSaved : t.saveChanges}
        </Text>
      </Pressable>
    </PortalFrame>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View>
      <Text className="mb-2 px-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
        {title}
      </Text>
      <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">{children}</View>
    </View>
  );
}

function FieldLabel({ label }: { label: string }) {
  return <Text className="mb-1.5 text-[13px] font-semibold text-[#334155]">{label}</Text>;
}

function ToggleRow({
  title,
  subtitle,
  value,
  onToggle,
  last,
}: {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  return (
    <View className={`flex-row items-center justify-between gap-3 ${last ? '' : 'pb-3'}`}>
      <View className="min-w-0 flex-1 pr-2">
        <Text className="text-[14px] font-semibold text-[#0F172A]">{title}</Text>
        <Text className="mt-0.5 text-[12px] leading-4 text-[#64748B]">{subtitle}</Text>
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        onPress={onToggle}
        className={`h-7 w-12 justify-center rounded-full p-0.5 ${
          value ? 'items-end bg-[#0EA5E9]' : 'items-start bg-[#CBD5E1]'
        }`}
      >
        <View className="h-6 w-6 rounded-full bg-white shadow-sm" />
      </Pressable>
    </View>
  );
}
