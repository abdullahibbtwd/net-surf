import { Linking, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { brand, colors } from '@/theme';
import { Container } from './Container';
import { useLanguage } from './Language';

export function SiteFooter() {
  const { t, lang } = useLanguage();

  return (
    <View className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-12 md:py-16">
      <Container>
        <View className="flex-row flex-wrap justify-between gap-8 pb-10 border-b border-[#E2E8F0]">
          {/* Brand Info */}
          <View className="max-w-sm">
            <View className="flex-row items-center gap-2">
              <View className="h-7 w-7 items-center justify-center rounded-lg bg-[#0F172A]">
                <Ionicons name="pulse" size={16} color="#0EA5E9" />
              </View>
              <Text className="text-xl font-black tracking-tight text-[#0F172A]">
                net<Text className="text-[#0EA5E9]">surf</Text>
              </Text>
            </View>

            <Text className="mt-3 text-xs sm:text-sm leading-relaxed text-[#475569] font-normal">
              {lang === 'bg'
                ? 'Надежден доставчик на оптичен интернет и интерактивна телевизия над 25 години.'
                : 'Trusted fiber internet and interactive TV provider for over 25 years.'}
            </Text>

            <View className="mt-4 flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full bg-emerald-500" />
              <Text className="text-xs font-medium text-[#475569]">
                GPON мрежа: 100% оперативна
              </Text>
            </View>
          </View>

          {/* Contact Direct */}
          <View className="gap-2">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              {lang === 'bg' ? 'Контакти' : 'Contacts'}
            </Text>
            <Pressable
              onPress={() => Linking.openURL(`tel:${brand.phoneNew}`)}
              className="flex-row items-center gap-2"
            >
              <Ionicons name="call-outline" size={14} color="#0EA5E9" />
              <Text className="text-sm font-semibold text-[#0F172A]">
                {brand.phoneNewDisplay}{' '}
                <Text className="text-xs text-[#475569]">({t.phoneNew})</Text>
              </Text>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(`tel:${brand.phoneCurrent}`)}
              className="flex-row items-center gap-2"
            >
              <Ionicons name="headset-outline" size={14} color="#0EA5E9" />
              <Text className="text-sm font-semibold text-[#0F172A]">
                {brand.phoneCurrentDisplay}{' '}
                <Text className="text-xs text-[#475569]">({t.phoneCurrent})</Text>
              </Text>
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(`mailto:${brand.email}`)}
              className="flex-row items-center gap-2"
            >
              <Ionicons name="mail-outline" size={14} color="#0EA5E9" />
              <Text className="text-sm text-[#475569] hover:text-[#0EA5E9]">{brand.email}</Text>
            </Pressable>
          </View>

          {/* Quick Nav Links */}
          <View className="gap-2">
            <Text className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              {lang === 'bg' ? 'Навигация' : 'Navigation'}
            </Text>
            <Link href="/packages" asChild>
              <Pressable>
                <Text className="text-sm text-[#475569] hover:text-[#0EA5E9] transition-colors">
                  {t.packages}
                </Text>
              </Pressable>
            </Link>
            <Link href="/contact" asChild>
              <Pressable>
                <Text className="text-sm text-[#475569] hover:text-[#0EA5E9] transition-colors">
                  {t.contact}
                </Text>
              </Pressable>
            </Link>
            <Link href="/app" asChild>
              <Pressable>
                <Text className="text-sm text-[#475569] hover:text-[#0EA5E9] transition-colors">
                  {t.portal}
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Bottom copyright */}
        <View className="mt-8 flex-row flex-wrap items-center justify-between gap-4 text-xs text-[#475569]">
          <Text className="text-xs text-[#475569]">
            © {new Date().getFullYear()} NetSurf Ltd. Всички права запазени.
          </Text>
          <Text className="text-xs text-[#475569]">
            Оптичен интернет · Aurora TV · Закрилникът UPS
          </Text>
        </View>
      </Container>
    </View>
  );
}

