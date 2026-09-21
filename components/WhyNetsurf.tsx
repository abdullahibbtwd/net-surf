import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { loc, type Localized } from '@/services';
import { colors } from '@/theme';
import { Badge } from './Badge';
import { Container } from './Container';
import { useLanguage } from './Language';
import { SplitHeading } from './SplitHeading';

type AdvantageCard = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  tag: Localized;
  title: Localized;
  body: Localized;
};

const cards: AdvantageCard[] = [
  {
    id: 'gpon',
    icon: 'flash-outline',
    tag: { bg: 'GPON Оптика', en: 'GPON Fiber' },
    title: {
      bg: 'Бърз оптичен интернет без споделяне',
      en: 'Dedicated fiber internet without sharing',
    },
    body: {
      bg: 'Индивидуално оптично влакно до дома без спад в пикови часове.',
      en: 'Direct home fiber line with zero peak-hour drops.',
    },
  },
  {
    id: 'tv',
    icon: 'tv-outline',
    tag: { bg: 'Aurora TV', en: 'Aurora TV' },
    title: {
      bg: 'Безжична интерактивна телевизия Aurora',
      en: 'Wireless interactive Aurora TV',
    },
    body: {
      bg: '7 дни архив, запис и пауза на живо без висящи кабели.',
      en: '7-day catchup, recording, and live pause with no messy cables.',
    },
  },
  {
    id: 'loyalty',
    icon: 'shield-checkmark-outline',
    tag: { bg: '26 Години Доверие', en: '26 Years Trust' },
    title: {
      bg: '26 години доказано доверие',
      en: '26 years of proven trust',
    },
    body: {
      bg: '5 дни гратисен период и безплатно замразяване при почивка.',
      en: '5-day grace period and free vacation pause whenever you travel.',
    },
  },
  {
    id: 'two',
    icon: 'people-outline',
    tag: { bg: 'Лоялност', en: 'Loyalty' },
    title: {
      bg: 'Лоялността е награда за двама',
      en: 'Loyalty rewards you and a friend',
    },
    body: {
      bg: 'Бонус за теб и твоя съсед при препоръка на NetSurf.',
      en: 'Exclusive reward for you and a neighbor upon referral.',
    },
  },
];

export function WhyNetsurf() {
  const { lang, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('loyalty');

  return (
    <View nativeID="for-you" className="bg-[#F8FAFC] py-14 sm:py-20 border-b border-[#E2E8F0]">
      <Container>
        <View className="mb-10 items-center">
          <SplitHeading
            eyebrow={lang === 'bg' ? 'Предимства' : 'Advantages'}
            lead={t.whyTitleLead}
            accent={t.whyTitleAccent}
          />
          <Text className="mt-3 max-w-lg text-center text-sm sm:text-base leading-relaxed text-[#475569] font-normal">
            {lang === 'bg'
              ? 'Технологично превъзходство и лоялно отношение към всеки клиент.'
              : 'Technological reliability with human-first customer care.'}
          </Text>
        </View>

        <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => {
            const open = card.id === openId;
            return (
              <Pressable
                key={card.id}
                accessibilityRole="button"
                onPress={() => setOpenId(open ? null : card.id)}
                className="transition-transform active:scale-[0.99]"
              >
                <View
                  className={`rounded-2xl border bg-white p-5 sm:p-6 shadow-xs transition-all ${
                    open
                      ? 'border-[#0EA5E9] ring-1 ring-[#0EA5E9]/15'
                      : 'border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <View className="flex-row items-center justify-between gap-2 mb-3">
                    <View className="flex-row items-center gap-2">
                      <View className="h-9 w-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                        <Ionicons name={card.icon} size={18} color="#0EA5E9" />
                      </View>
                      <Badge label={loc(card.tag, lang)} tone="accent" size="sm" />
                    </View>

                    <Ionicons
                      name={open ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={open ? '#0EA5E9' : '#475569'}
                    />
                  </View>

                  <Text className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A]">
                    {loc(card.title, lang)}
                  </Text>

                  <Text className="mt-2 text-xs sm:text-sm leading-relaxed font-normal text-[#475569]">
                    {loc(card.body, lang)}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Container>
    </View>
  );
}

