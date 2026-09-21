import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  formatPrice,
  formatSpeed,
  getPackages,
  loc,
  recommendPackage,
  type InternetPackage,
  type Track,
} from '@/services';
import { Badge } from './Badge';
import { Container } from './Container';
import { useLanguage } from './Language';
import { useOverlays } from './Overlays';
import { PackageCard } from './PackageCard';
import { PackageCarousel } from './PackageCarousel';
import { SpeedSlider } from './SpeedSlider';
import { SplitHeading } from './SplitHeading';

export function PackageShowcase() {
  const { lang, t } = useLanguage();
  const { openChannels, openOrder } = useOverlays();
  const [track, setTrack] = useState<Track>('home');
  const [speed, setSpeed] = useState(300);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const plans = getPackages(track);
  const recommended = useMemo(
    () => (track === 'home' ? recommendPackage(speed, 'home') : null),
    [speed, track],
  );

  return (
    <View nativeID="packages" className="bg-[#FFFFFF] py-14 sm:py-20 border-b border-[#E2E8F0]">
      <Container>
        {/* Section Heading */}
        <View className="mb-10 items-center">
          <SplitHeading
            eyebrow={lang === 'bg' ? 'Оптични планове' : 'Fiber Plans'}
            lead={lang === 'bg' ? 'Избери скорост и' : 'Choose speed &'}
            accent={lang === 'bg' ? 'перфектния пакет' : 'the perfect plan'}
          />
          <Text className="mt-3 max-w-lg text-center text-sm sm:text-base leading-relaxed text-[#475569] font-normal">
            {lang === 'bg'
              ? 'Гарантирана GPON скорост с включен Wi-Fi 6 рутер и интерактивна телевизия.'
              : 'Guaranteed GPON speed including a Wi-Fi 6 router and interactive TV.'}
          </Text>

          {/* Segmented Track Switcher */}
          <View className="mt-7 flex-row items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1 shadow-xs">
            {(['home', 'business'] as Track[]).map((item) => {
              const active = item === track;
              return (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  onPress={() => setTrack(item)}
                  className={`rounded-full px-5 py-1.5 transition-all ${
                    active ? 'bg-[#0EA5E9] shadow-xs' : 'hover:bg-white'
                  }`}
                >
                  <Text
                    className={`text-xs sm:text-sm font-medium ${
                      active ? 'text-white' : 'text-[#475569]'
                    }`}
                  >
                    {item === 'home' ? t.forHome : t.forBusiness}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Interactive Speed Customizer (For Home) */}
        {track === 'home' ? (
          <View className="mx-auto mb-10 w-full max-w-3xl rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 shadow-xs">
            <View className="flex-row flex-wrap items-center justify-between gap-3 mb-2">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                  {t.dragSpeed}
                </Text>
                <View className="flex-row items-baseline gap-2">
                  <Text className="mt-0.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#0EA5E9]">
                    {formatSpeed(speed)}
                  </Text>
                  <Text className="text-xs font-medium text-[#475569]">
                    {lang === 'bg' ? 'Симметрична оптика' : 'Symmetrical fiber'}
                  </Text>
                </View>
              </View>

              {recommended ? (
                <View className="flex-row items-center gap-2.5 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2">
                  <Badge label={t.recommended} tone="accent" size="sm" />
                  <View>
                    <Text className="text-xs font-bold text-[#0F172A]">
                      {loc(recommended.name, lang)}
                    </Text>
                    <Text className="text-[11px] font-medium text-[#0EA5E9]">
                      {formatPrice(recommended.priceMonthly, lang)}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            <View className="mt-3">
              <SpeedSlider
                value={speed}
                onChange={setSpeed}
                min={300}
                max={500}
                step={50}
              />
            </View>
          </View>
        ) : null}

        {/* Presentation Mode Selector (Carousel vs Grid) */}
        <View className="mb-6 flex-row items-center justify-between px-1">
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
            <Text className="text-xs sm:text-sm font-semibold tracking-tight text-[#0F172A]">
              {lang === 'bg'
                ? track === 'home'
                  ? 'Избери план за дома'
                  : 'Бизнес оптични решения'
                : track === 'home'
                ? 'Select a home plan'
                : 'Business fiber solutions'}
            </Text>
          </View>

          {/* Switcher */}
          <View className="flex-row items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Carousel view"
              onPress={() => setViewMode('carousel')}
              className={`flex-row items-center gap-1 rounded-md px-2.5 py-1 ${
                viewMode === 'carousel' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Ionicons
                name="swap-horizontal"
                size={14}
                color={viewMode === 'carousel' ? '#0EA5E9' : '#64748B'}
              />
              <Text
                className={`text-xs font-medium ${
                  viewMode === 'carousel' ? 'text-[#0F172A]' : 'text-[#475569]'
                }`}
              >
                {lang === 'bg' ? 'Карусел' : 'Carousel'}
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Grid view"
              onPress={() => setViewMode('grid')}
              className={`flex-row items-center gap-1 rounded-md px-2.5 py-1 ${
                viewMode === 'grid' ? 'bg-white shadow-xs' : ''
              }`}
            >
              <Ionicons
                name="grid-outline"
                size={14}
                color={viewMode === 'grid' ? '#0EA5E9' : '#64748B'}
              />
              <Text
                className={`text-xs font-medium ${
                  viewMode === 'grid' ? 'text-[#0F172A]' : 'text-[#475569]'
                }`}
              >
                {lang === 'bg' ? 'Списък' : 'Grid'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Display: Carousel Mode */}
        {viewMode === 'carousel' ? (
          <PackageCarousel
            plans={plans}
            activeId={recommended?.id}
            onChannels={openChannels}
            onOrder={openOrder}
          />
        ) : (
          /* Display: Grid Mode */
          <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {plans.map((plan) => (
              <PackageCard
                key={plan.id}
                plan={plan}
                isActive={plan.id === recommended?.id}
                onChannels={openChannels}
                onOrder={openOrder}
              />
            ))}
          </View>
        )}
      </Container>
    </View>
  );
}


