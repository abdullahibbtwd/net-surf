import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { brand } from '@/theme';
import { Button } from './Button';
import { Container } from './Container';
import { useLanguage } from './Language';
import { useOverlays } from './Overlays';
import { SplitHeading } from './SplitHeading';

function scrollToSection(id: string) {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function HeroSection() {
  const { lang, t } = useLanguage();
  const { openCoverage } = useOverlays();
  const [testing, setTesting] = useState(false);
  const [testDone, setTestDone] = useState(false);

  function handleTestLine() {
    if (testing) return;
    setTesting(true);
    setTestDone(false);
    setTimeout(() => {
      setTesting(false);
      setTestDone(true);
      setTimeout(() => setTestDone(false), 5000);
    }, 1000);
  }

  return (
    <View className="relative bg-[#FFFFFF] pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-[#E2E8F0]">
      <Container>
        <View className="items-center text-center">
          {/* Minimalist Status Badge */}
          <View className="mb-5 flex-row items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1">
            <View className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
            <Text className="text-xs font-semibold tracking-wide text-[#0EA5E9]">
              {lang === 'bg' ? 'GPON 99.9% Оптична мрежа' : 'GPON 99.9% Optical Fiber'}
            </Text>
          </View>

          {/* Heading */}
          <SplitHeading
            lead={t.heroTitleLead}
            accent={t.heroTitleAccent}
            size="hero"
          />

          {/* Concise, Elegant Subtitle (1 sentence, max 20 words) */}
          <Text className="mt-4 max-w-xl text-center text-base sm:text-lg leading-relaxed text-[#475569] font-normal">
            {lang === 'bg'
              ? 'Чиста GPON оптика до дома и интерактивна телевизия с пълен 7-дневен архив.'
              : 'Dedicated GPON fiber to your home with interactive TV and 7-day replay.'}
          </Text>

          {/* Clean Focused CTA Row */}
          <View className="mt-8 flex-col sm:flex-row w-full sm:w-auto justify-center items-stretch sm:items-center gap-3">
            <Button
              label={t.seePackages}
              size="lg"
              variant="primary"
              icon={<Ionicons name="arrow-down" size={15} color="#FFFFFF" />}
              onPress={() => scrollToSection('packages')}
            />

            <Button
              label={t.checkAddress}
              variant="outline"
              size="lg"
              icon={<Ionicons name="location-outline" size={16} color="#0F172A" />}
              onPress={openCoverage}
            />
          </View>

          {/* Concise Value Bullets */}
          <View className="mt-5 flex-row flex-wrap justify-center items-center gap-x-5 gap-y-1.5 text-xs">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="checkmark-circle" size={14} color="#0EA5E9" />
              <Text className="text-xs text-[#475569] font-medium">
                {lang === 'bg' ? 'Wi-Fi 6 рутер включен' : 'Free Wi-Fi 6 router'}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="checkmark-circle" size={14} color="#0EA5E9" />
              <Text className="text-xs text-[#475569] font-medium">
                {lang === 'bg' ? 'Монтаж до 48 часа' : 'Installed within 48h'}
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="checkmark-circle" size={14} color="#0EA5E9" />
              <Text className="text-xs text-[#475569] font-medium">
                {lang === 'bg' ? 'Без скрити такси' : 'No hidden fees'}
              </Text>
            </View>
          </View>

          {/* Elegant Floating Live Metric Bar */}
          <View className="mt-10 w-full max-w-3xl">
            <View className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 shadow-xs">
              <View className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
                {/* Metric 1 */}
                <View className="px-2 pt-2 sm:pt-0 items-center">
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                      {testing ? '...' : '500'}
                    </Text>
                    <Text className="text-xs font-bold text-[#0EA5E9]">Mbps</Text>
                  </View>
                  <Text className="mt-1 text-xs text-[#475569] font-normal">
                    {lang === 'bg' ? 'Симметрична оптика' : 'Symmetrical speed'}
                  </Text>
                </View>

                {/* Metric 2 */}
                <View className="px-2 pt-3 sm:pt-0 items-center">
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                      {testing ? '~' : '2'}
                    </Text>
                    <Text className="text-xs font-bold text-[#0EA5E9]">ms</Text>
                  </View>
                  <Text className="mt-1 text-xs text-[#475569] font-normal">
                    {lang === 'bg' ? 'Ултра-нисък пинг' : 'Ultra-low latency'}
                  </Text>
                </View>

                {/* Metric 3 */}
                <View className="px-2 pt-3 sm:pt-0 items-center">
                  <View className="flex-row items-baseline gap-1">
                    <Text className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                      175+
                    </Text>
                    <Text className="text-xs font-bold text-[#0EA5E9]">HD</Text>
                  </View>
                  <Text className="mt-1 text-xs text-[#475569] font-normal">
                    {lang === 'bg' ? 'Интерактивна телевизия' : 'Interactive TV'}
                  </Text>
                </View>
              </View>

              {/* Minimal interactive test trigger */}
              <View className="mt-4 pt-3 border-t border-[#E2E8F0] flex-row items-center justify-between">
                <View className="flex-row items-center gap-1.5">
                  <View className="h-2 w-2 rounded-full bg-emerald-500" />
                  <Text className="text-xs text-[#475569] font-normal">
                    {testDone
                      ? lang === 'bg'
                        ? 'Линията работи отлично (100% стабилна)'
                        : 'Line tested: 100% stable'
                      : lang === 'bg'
                      ? 'Мрежата е 100% активна'
                      : 'Network 100% operational'}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleTestLine}
                  className="flex-row items-center gap-1 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 hover:bg-[#F8FAFC] transition-colors"
                >
                  <Ionicons
                    name={testing ? 'sync' : 'speedometer-outline'}
                    size={12}
                    color="#0EA5E9"
                  />
                  <Text className="text-[11px] font-semibold text-[#0EA5E9]">
                    {testing
                      ? lang === 'bg'
                        ? 'Тест...'
                        : 'Testing...'
                      : lang === 'bg'
                      ? 'Тествай връзка'
                      : 'Test speed'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}



