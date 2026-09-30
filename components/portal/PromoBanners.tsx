import { Link, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLanguage } from '@/components/Language';
import { Icon } from './icons';
import type { PortalIcon } from './nav';

const AUTOPLAY_MS = 5000;

type Slide = {
  key: string;
  icon: PortalIcon;
  title: string;
  body: string;
  cta: string;
  href: Href;
  bg: string;
  accent: string;
};

export function PromoCarousel() {
  const { t } = useLanguage();
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  const slides: Slide[] = [
    {
      key: 'upgrade',
      icon: 'zap',
      title: t.promoUpgradeTitle,
      body: t.promoUpgradeBody,
      cta: t.promoUpgradeCta,
      href: '/packages',
      bg: '#0F172A',
      accent: '#0EA5E9',
    },
    {
      key: 'tv',
      icon: 'film',
      title: t.promoTvTitle,
      body: t.promoTvBody,
      cta: t.promoTvCta,
      href: '/packages',
      bg: '#4C1D95',
      accent: '#A78BFA',
    },
    {
      key: 'mesh',
      icon: 'wifi',
      title: t.promoMeshTitle,
      body: t.promoMeshBody,
      cta: t.promoMeshCta,
      href: '/app/support',
      bg: '#064E3B',
      accent: '#34D399',
    },
  ];

  const goTo = (next: number) => {
    indexRef.current = next;
    setIndex(next);
    scrollRef.current?.scrollTo({ x: next * width, animated: true });
  };

  useEffect(() => {
    if (!width || hidden) return;
    const id = setInterval(() => {
      goTo((indexRef.current + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [width, hidden, slides.length]);

  if (hidden) return null;

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between px-0.5">
        <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
          {t.promoLabel}
        </Text>
        <Pressable
          accessibilityLabel={t.hideOffers}
          onPress={() => setHidden(true)}
          hitSlop={8}
          className="flex-row items-center gap-1 active:opacity-70"
        >
          <Text className="text-[12px] text-[#64748B]">{t.hideOffers}</Text>
          <Icon name="x" size={14} color="#64748B" />
        </Pressable>
      </View>

      <View
        className="overflow-hidden rounded-2xl"
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            if (!width) return;
            const next = Math.round(e.nativeEvent.contentOffset.x / width);
            if (next !== indexRef.current) {
              indexRef.current = next;
              setIndex(next);
            }
          }}
        >
          {slides.map((slide) => (
            <PromoSlide key={slide.key} slide={slide} width={width} />
          ))}
        </ScrollView>
      </View>

      <View className="flex-row justify-center gap-1.5 pt-1">
        {slides.map((slide, i) => (
          <Pressable
            key={slide.key}
            accessibilityLabel={slide.title}
            onPress={() => goTo(i)}
            hitSlop={6}
            className={`h-1.5 rounded-full ${i === index ? 'w-5 bg-[#0EA5E9]' : 'w-1.5 bg-[#CBD5E1]'}`}
          />
        ))}
      </View>
    </View>
  );
}

function PromoSlide({ slide, width }: { slide: Slide; width: number }) {
  return (
    <View
      className="relative h-[164px] justify-between overflow-hidden p-5"
      style={{ width: width || '100%', backgroundColor: slide.bg }}
    >
      <View
        className="absolute -right-10 -top-12 h-40 w-40 rounded-full"
        style={{ backgroundColor: slide.accent, opacity: 0.18 }}
      />
      <View
        className="absolute -bottom-16 right-16 h-32 w-32 rounded-full"
        style={{ backgroundColor: slide.accent, opacity: 0.12 }}
      />

      <View className="flex-row items-start gap-3 pr-10">
        <View
          className="h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${slide.accent}33` }}
        >
          <Icon name={slide.icon} size={20} color={slide.accent} />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-[16px] font-bold leading-6 text-white" numberOfLines={1}>
            {slide.title}
          </Text>
          <Text className="text-[13px] leading-5 text-white/75" numberOfLines={2}>
            {slide.body}
          </Text>
        </View>
      </View>

      <Link href={slide.href} asChild>
        <Pressable
          className="flex-row items-center gap-1.5 self-start rounded-full px-4 py-2 active:opacity-80"
          style={{ backgroundColor: slide.accent }}
        >
          <Text className="text-[13px] font-semibold text-[#0F172A]">{slide.cta}</Text>
          <Icon name="arrow-right" size={14} color="#0F172A" />
        </Pressable>
      </Link>
    </View>
  );
}

export function PartnerBanner() {
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState(false);

  return (
    <View className="relative overflow-hidden rounded-2xl border border-[#FED7AA] bg-[#FFF7ED] p-4">
      <View className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FDBA74]/30" />

      <View className="mb-2 flex-row items-center justify-between">
        <View className="rounded-md bg-[#FFEDD5] px-1.5 py-0.5">
          <Text className="text-[10px] font-semibold uppercase tracking-wider text-[#C2410C]">
            {t.adLabel}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]">
          <Icon name="tv" size={22} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold leading-5 text-[#7C2D12]">{t.partnerTitle}</Text>
          <Text className="text-[12px] leading-4 text-[#9A3412]">{t.partnerBody}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => setRevealed(true)}
        className={`mt-3 h-10 flex-row items-center justify-center gap-2 rounded-xl active:opacity-90 ${
          revealed ? 'border border-dashed border-[#F97316] bg-white' : 'bg-[#F97316]'
        }`}
      >
        <Icon name={revealed ? 'check' : 'gift'} size={16} color={revealed ? '#EA580C' : '#FFFFFF'} />
        <Text
          className={`text-[14px] font-semibold ${revealed ? 'tracking-widest text-[#EA580C]' : 'text-white'}`}
        >
          {revealed ? 'NETSURF15' : t.partnerCta}
        </Text>
      </Pressable>
    </View>
  );
}
