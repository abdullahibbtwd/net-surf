import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type InternetPackage } from '@/services';
import { useLanguage } from './Language';
import { PackageCard } from './PackageCard';

type PackageCarouselProps = {
  plans: InternetPackage[];
  activeId?: string | null;
  onChannels: (plan: InternetPackage) => void;
  onOrder: (plan: InternetPackage) => void;
  onSelectPlan?: (plan: InternetPackage) => void;
};

export function PackageCarousel({
  plans,
  activeId,
  onChannels,
  onOrder,
  onSelectPlan,
}: PackageCarouselProps) {
  const { lang } = useLanguage();
  const scrollViewRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(() => {
    return Platform.OS === 'web' && typeof window !== 'undefined'
      ? window.innerWidth
      : Dimensions.get('window').width;
  });

  // Calculate default active index
  const initialIndex = plans.findIndex((p) => (activeId ? p.id === activeId : p.featured));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  // Responsive card metrics
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const cardWidth = isMobile
    ? Math.min(340, containerWidth - 56)
    : isTablet
    ? (containerWidth - 64) / 2
    : Math.min(380, (containerWidth - 64) / 3);

  const cardGap = isMobile ? 16 : 20;
  const snapInterval = cardWidth + cardGap;

  // Sync scroll position when activeId changes externally (e.g. from speed slider)
  useEffect(() => {
    if (!activeId) return;
    const targetIdx = plans.findIndex((p) => p.id === activeId);
    if (targetIdx >= 0 && targetIdx !== currentIndex) {
      goToIndex(targetIdx);
    }
  }, [activeId]);

  function handleLayout(e: LayoutChangeEvent) {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - containerWidth) > 5) {
      setContainerWidth(width);
    }
  }

  function goToIndex(index: number) {
    const safeIndex = Math.max(0, Math.min(plans.length - 1, index));
    setCurrentIndex(safeIndex);
    scrollViewRef.current?.scrollTo({
      x: safeIndex * snapInterval,
      animated: true,
    });
    if (onSelectPlan && plans[safeIndex]) {
      onSelectPlan(plans[safeIndex]);
    }
  }

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const scrollX = e.nativeEvent.contentOffset.x;
    const calculatedIndex = Math.round(scrollX / snapInterval);
    if (
      calculatedIndex >= 0 &&
      calculatedIndex < plans.length &&
      calculatedIndex !== currentIndex
    ) {
      setCurrentIndex(calculatedIndex);
      if (onSelectPlan && plans[calculatedIndex]) {
        onSelectPlan(plans[calculatedIndex]);
      }
    }
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < plans.length - 1;

  return (
    <View onLayout={handleLayout} className="w-full relative">
      {/* Top Carousel Controls & Progress Pill */}
      <View className="mb-4 flex-row items-center justify-between px-1">
        {/* Slide Counter */}
        <View className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1">
          <Text className="text-xs font-semibold text-[#0EA5E9]">
            0{currentIndex + 1} / 0{plans.length}{' '}
            <Text className="font-normal text-[#475569]">
              {lang === 'bg' ? 'пакет' : 'plan'}
            </Text>
          </Text>
        </View>

        {/* Navigation Arrows */}
        <View className="flex-row items-center gap-2">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Previous package"
            onPress={() => goToIndex(currentIndex - 1)}
            disabled={!canGoPrev}
            className={`h-9 w-9 items-center justify-center rounded-full border transition-all ${
              canGoPrev
                ? 'border-[#E2E8F0] bg-white hover:border-[#0EA5E9] hover:bg-[#F8FAFC] active:scale-95 text-[#0F172A] shadow-xs'
                : 'border-[#E2E8F0] bg-[#F8FAFC] opacity-40'
            }`}
          >
            <Ionicons
              name="chevron-back"
              size={16}
              color={canGoPrev ? '#0F172A' : '#94A3B8'}
            />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Next package"
            onPress={() => goToIndex(currentIndex + 1)}
            disabled={!canGoNext}
            className={`h-9 w-9 items-center justify-center rounded-full border transition-all ${
              canGoNext
                ? 'border-[#E2E8F0] bg-white hover:border-[#0EA5E9] hover:bg-[#F8FAFC] active:scale-95 text-[#0F172A] shadow-xs'
                : 'border-[#E2E8F0] bg-[#F8FAFC] opacity-40'
            }`}
          >
            <Ionicons
              name="chevron-forward"
              size={16}
              color={canGoNext ? '#0F172A' : '#94A3B8'}
            />
          </Pressable>
        </View>
      </View>

      {/* Animated Scroll Track */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={snapInterval}
        snapToAlignment="start"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={{
          paddingVertical: 12,
          paddingHorizontal: 2,
        }}
        className="carousel-track no-scrollbar"
      >
        {plans.map((plan, index) => {
          const isActive = index === currentIndex;
          return (
            <View
              key={plan.id}
              style={{
                width: cardWidth,
                marginRight: index === plans.length - 1 ? 0 : cardGap,
              }}
              className="carousel-slide transition-all duration-300"
            >
              <PackageCard
                plan={plan}
                isActive={isActive}
                isCarousel={true}
                onChannels={onChannels}
                onOrder={onOrder}
                onSelect={() => goToIndex(index)}
              />
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Morphing Pagination Pills */}
      <View className="mt-6 flex-row items-center justify-center gap-2">
        {plans.map((plan, index) => {
          const isActive = index === currentIndex;
          return (
            <Pressable
              key={`dot-${plan.id}`}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${index + 1}`}
              onPress={() => goToIndex(index)}
              className="py-2 px-1 items-center justify-center"
            >
              <View
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-8 bg-[#0EA5E9]'
                    : 'w-2.5 bg-[#E2E8F0] hover:bg-slate-300'
                }`}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
