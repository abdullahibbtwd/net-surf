import { Linking, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatPrice, formatSpeed, loc, type InternetPackage } from '@/services';
import { brand } from '@/theme';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { useLanguage } from './Language';

type PackageCardProps = {
  plan: InternetPackage;
  onChannels: (plan: InternetPackage) => void;
  onOrder?: (plan: InternetPackage) => void;
  isActive?: boolean;
  isCarousel?: boolean;
  onSelect?: () => void;
};

export function PackageCard({
  plan,
  onChannels,
  onOrder,
  isActive = false,
  isCarousel = false,
  onSelect,
}: PackageCardProps) {
  const { lang, t } = useLanguage();

  // Clean hairline styling with subtle state indicator
  const containerStyle = isCarousel
    ? isActive
      ? 'scale-100 border-[#0EA5E9] ring-1 ring-[#0EA5E9]/20 shadow-xs z-10'
      : 'scale-[0.98] opacity-85 hover:opacity-100 border-[#E2E8F0]'
    : plan.featured
      ? 'border-[#0EA5E9] ring-1 ring-[#0EA5E9]/15 shadow-xs'
      : 'border-[#E2E8F0] hover:border-slate-300';

  return (
    <Pressable
      onPress={onSelect}
      disabled={!isCarousel || isActive}
      className="flex-1 w-full transition-all duration-300"
    >
      <Card
        className={`relative flex-1 rounded-2xl bg-white p-5 sm:p-6 transition-all duration-300 border ${containerStyle}`}
      >
        {/* Top Featured Ribbon Accent */}
        {plan.featured ? (
          <View className="absolute top-0 left-0 right-0 h-0.5 bg-[#0EA5E9]" />
        ) : null}

        {/* Card Header: Plan Name & Badges */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-lg font-bold tracking-tight text-[#0F172A]">
              {loc(plan.name, lang)}
            </Text>
            {plan.featured ? (
              <Badge label={t.mostPopular} tone="accent" size="sm" />
            ) : null}
          </View>

          {/* Simple Gift / Brand indicator */}
          {plan.gift || plan.extraBrand ? (
            <View className="mt-2 flex-row flex-wrap items-center gap-1.5">
              {plan.gift ? (
                <View className="rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-0.5">
                  <Text className="text-[11px] font-semibold text-[#0EA5E9]">
                    {loc(plan.gift, lang)}
                  </Text>
                </View>
              ) : null}
              {plan.extraBrand ? (
                <Text className="text-[11px] font-medium text-[#475569]">
                  {plan.extraBrand}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Price Display */}
        <View className="mb-5 pb-4 border-b border-[#E2E8F0]">
          <View className="flex-row items-baseline gap-1">
            <Text className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              {formatPrice(plan.priceMonthly, lang)}
            </Text>
          </View>
          <Text className="mt-1 text-xs text-[#475569] font-normal">
            {plan.quoteOnly
              ? lang === 'bg' ? 'Оферта след проверка' : 'Quote after review'
              : lang === 'bg' ? 'с ДДС · включен Wi-Fi 6 рутер' : 'incl. VAT · Wi-Fi 6 router included'}
          </Text>
        </View>

        {/* Key Metrics Pod */}
        <View className="mb-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                GPON Оптика
              </Text>
              <Text className="text-xl font-bold text-[#0F172A]">
                {formatSpeed(plan.speedMbps)}
              </Text>
            </View>

            {plan.channels ? (
              <View className="flex-1 border-l border-[#E2E8F0] pl-3">
                <Text className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                  Aurora TV
                </Text>
                <Text className="text-xl font-bold text-[#0F172A]">
                  {plan.channels}+{' '}
                  <Text className="text-xs font-normal text-[#475569]">
                    ({plan.hdChannels} HD)
                  </Text>
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* 3 Crisp Highlights */}
        <View className="mb-6 gap-2.5">
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={15} color="#0EA5E9" />
            <Text className="text-xs text-[#475569] font-medium">
              {lang === 'bg' ? 'Wi-Fi 6 рутер включен' : 'Free Wi-Fi 6 router included'}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={15} color="#0EA5E9" />
            <Text className="text-xs text-[#475569] font-medium">
              {lang === 'bg' ? '7 дни ТВ архив и пауза' : '7-day TV replay & pause'}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={15} color="#0EA5E9" />
            <Text className="text-xs text-[#475569] font-medium">
              {lang === 'bg' ? 'Защита със Закрилникът' : 'Protected by Zakrilnikat UPS'}
            </Text>
          </View>
        </View>

        {/* Primary CTA & Secondary Link */}
        <View className="mt-auto gap-2.5">
          <Button
            label={t.orderPlan}
            size="card"
            variant="primary"
            icon={<Ionicons name="flash" size={14} color="#FFFFFF" />}
            iconPosition="left"
            onPress={() => {
              if (onOrder) {
                onOrder(plan);
              } else {
                Linking.openURL(`tel:${brand.phoneNew}`);
              }
            }}
          />

          {plan.channels ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => onChannels(plan)}
              className="py-1 items-center justify-center"
            >
              <Text className="text-xs font-semibold text-[#0EA5E9] hover:underline">
                {t.viewChannels} ({plan.channels}+) →
              </Text>
            </Pressable>
          ) : (
            <Pressable
              accessibilityRole="button"
              onPress={() => Linking.openURL(`tel:${brand.phoneNew}`)}
              className="py-1 items-center justify-center"
            >
              <Text className="text-xs font-semibold text-[#475569] hover:text-[#0F172A]">
                {brand.phoneNewDisplay} · {t.phoneNew}
              </Text>
            </Pressable>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
