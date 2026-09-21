import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getTestimonials, loc, stats, townLabels, towns, type Town } from '@/services';
import { brand } from '@/theme';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Container } from './Container';
import { useLanguage } from './Language';
import { useOverlays } from './Overlays';
import { SplitHeading } from './SplitHeading';

export function SocialProof() {
  const { lang, t } = useLanguage();
  const { openCoverage } = useOverlays();
  const [town, setTown] = useState<Town | null>(null);
  const quotes = getTestimonials(town ?? undefined);

  return (
    <View nativeID="proof" className="bg-white py-14 sm:py-20 border-b border-[#E2E8F0]">
      <Container>
        {/* Testimonials Section Heading */}
        <View className="items-center text-center">
          <SplitHeading
            eyebrow={lang === 'bg' ? 'Отзиви' : 'Reviews'}
            lead={t.proofTitleLead}
            accent={t.proofTitleAccent}
          />
          <Text className="mt-3 max-w-lg text-center text-sm sm:text-base leading-relaxed text-[#475569] font-normal">
            {lang === 'bg'
              ? 'Реални мнения от клиенти в нашата оптична мрежа.'
              : 'Authentic reviews from customers across our fiber network.'}
          </Text>
        </View>

        {/* Town Filter Pills */}
        <View className="mb-8 mt-7 flex-row flex-wrap justify-center gap-2">
          <Pressable
            accessibilityRole="button"
            onPress={() => setTown(null)}
            className={`rounded-full px-4 py-1.5 transition-all ${
              town === null
                ? 'bg-[#0EA5E9] shadow-xs'
                : 'border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100'
            }`}
          >
            <Text
              className={`text-xs sm:text-sm font-medium ${
                town === null ? 'text-white' : 'text-[#475569]'
              }`}
            >
              {t.allTowns}
            </Text>
          </Pressable>

          {towns.map((item) => {
            const active = item === town;
            return (
              <Pressable
                key={item}
                accessibilityRole="button"
                onPress={() => setTown(item)}
                className={`rounded-full px-4 py-1.5 transition-all ${
                  active
                    ? 'bg-[#0EA5E9] shadow-xs'
                    : 'border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100'
                }`}
              >
                <Text
                  className={`text-xs sm:text-sm font-medium ${
                    active ? 'text-white' : 'text-[#475569]'
                  }`}
                >
                  {loc(townLabels[item], lang)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Testimonials Cards: Mobile Touch Carousel / Desktop Grid */}
        <View className="flex-row overflow-x-auto carousel-track no-scrollbar pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {quotes.slice(0, 6).map((item) => (
            <View
              key={item.id}
              className="w-[280px] sm:w-[320px] md:w-auto shrink-0 md:shrink carousel-slide"
            >
              <Card
                className="h-full flex-col justify-between bg-white p-5 border border-[#E2E8F0] shadow-xs hover:border-[#0EA5E9] transition-all rounded-2xl"
              >
                <View>
                  {/* Header with avatar & name */}
                  <View className="flex-row items-center justify-between gap-2 mb-3">
                    <View className="flex-row items-center gap-2.5">
                      <View className="h-9 w-9 items-center justify-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0]">
                        <Text className="text-xs font-bold text-[#0EA5E9]">
                          {item.name.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-sm font-bold text-[#0F172A]">{item.name}</Text>
                        <Text className="text-[11px] text-[#475569] font-normal">
                          {loc(townLabels[item.town], lang)}
                        </Text>
                      </View>
                    </View>

                    <Badge
                      label={lang === 'bg' ? 'Потвърден' : 'Verified'}
                      tone="green"
                      size="sm"
                    />
                  </View>

                  {/* Stars in subtle accent */}
                  <View className="mb-2.5 flex-row gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Ionicons
                        key={`${item.id}-star-${index}`}
                        name={index < item.stars ? 'star' : 'star-outline'}
                        size={13}
                        color={index < item.stars ? '#0EA5E9' : '#E2E8F0'}
                      />
                    ))}
                  </View>

                  {/* Quote body */}
                  <Text className="text-xs sm:text-sm leading-relaxed text-[#475569] font-normal">
                    "{loc(item.quote, lang)}"
                  </Text>
                </View>

                <View className="mt-4 pt-3 border-t border-[#E2E8F0] flex-row justify-between items-center text-[11px] text-[#475569]">
                  <Text className="text-[11px] text-[#475569]">{item.date}</Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="shield-checkmark" size={12} color="#0EA5E9" />
                    <Text className="text-[10px] text-[#475569] font-medium">
                      GPON Оптика
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          ))}
        </View>

        {/* Stats Counter Row */}
        <View className="mt-16 sm:mt-20">
          <View className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
            {stats.map((item) => (
              <View
                key={item.value}
                className="items-center rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 shadow-xs text-center"
              >
                <Text className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0EA5E9]">
                  {item.value}
                </Text>
                <Text className="mt-1 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {loc(item.label, lang)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Final Conversion Banner (Alternate Neutral Container) */}
        <View className="mt-14 sm:mt-16 overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 sm:p-12 shadow-xs">
          <View className="items-center text-center max-w-xl mx-auto">
            <Badge
              label={lang === 'bg' ? 'Оптично покритие' : 'Fiber Coverage'}
              tone="accent"
              size="md"
            />
            <Text className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
              {lang === 'bg'
                ? 'Готови ли сте за истинска оптична свобода?'
                : 'Ready for true fiber freedom?'}
            </Text>
            <Text className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed font-normal">
              {lang === 'bg'
                ? 'Провери покритие за своя адрес или заяви включване до 48 часа.'
                : 'Check coverage for your address or get connected within 48 hours.'}
            </Text>

            <View className="mt-7 flex-col sm:flex-row w-full sm:w-auto justify-center gap-3">
              <Button
                label={t.checkAddress}
                variant="primary"
                size="lg"
                icon={<Ionicons name="location-outline" size={16} color="#FFFFFF" />}
                onPress={openCoverage}
              />
              <Button
                label={brand.phoneNewDisplay}
                variant="outline"
                size="lg"
                icon={<Ionicons name="call-outline" size={16} color="#0F172A" />}
                onPress={() => Linking.openURL(`tel:${brand.phoneNew}`)}
              />
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}
