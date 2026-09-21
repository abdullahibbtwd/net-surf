import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Container } from './Container';
import { useLanguage } from './Language';

export function TrustPills() {
  const { t, lang } = useLanguage();

  const items = [
    {
      icon: 'cash-outline' as const,
      title: t.euro,
      desc:
        lang === 'bg'
          ? 'Прозрачни цени без скрити клаузи'
          : 'Transparent pricing, no hidden clauses',
    },
    {
      icon: 'wifi' as const,
      title: t.noPower,
      desc:
        lang === 'bg'
          ? 'Рутерът и камерите работят и без ток'
          : 'Router & cameras stay up during cuts',
    },
    {
      icon: 'tv-outline' as const,
      title: t.wirelessTv,
      desc:
        lang === 'bg'
          ? '7 дни архив, пауза & 4K стрийминг'
          : '7-day catchup, pause & 4K streaming',
    },
    {
      icon: 'shield-checkmark-outline' as const,
      title: t.support247,
      desc:
        lang === 'bg'
          ? 'Лични експерти, без ботове и чакане'
          : 'Real engineers 24/7, zero bots',
    },
  ];

  return (
    <View className="bg-[#F8FAFC] py-8 sm:py-12 border-b border-[#E2E8F0]">
      <Container>
        <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {items.map((item) => (
            <View
              key={item.title}
              className="flex-row items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs"
            >
              <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Ionicons name={item.icon} size={18} color="#0EA5E9" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-[#0F172A]">{item.title}</Text>
                <Text className="mt-0.5 text-xs leading-relaxed text-[#475569] font-normal">
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
}
