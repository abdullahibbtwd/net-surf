import { useEffect, useState } from 'react';
import { Linking, Platform, Pressable, Text, View } from 'react-native';
import { Link, usePathname, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { brand } from '@/theme';
import { Button } from './Button';
import { Container } from './Container';
import { useLanguage } from './Language';
import { LanguageSwitcher } from './LanguageSwitcher';

function scrollToId(id: string) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function goSection(id: string) {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => scrollToId(id), 80);
      return;
    }
    scrollToId(id);
  }

  const links = [
    { key: 'home', label: t.home, href: '/' as const, active: pathname === '/' },
    { key: 'packages', label: t.packages, onPress: () => goSection('packages'), active: false },
    { key: 'business', label: t.forBusiness, href: '/packages' as const, active: pathname === '/packages' },
    { key: 'aurora', label: t.aurora, onPress: () => goSection('aurora'), active: false },
    { key: 'guardian', label: t.guardian, onPress: () => goSection('backup'), active: false },
    { key: 'contact', label: t.contact, href: '/contact' as const, active: pathname === '/contact' },
  ];

  return (
    <View className="sticky top-0 z-50" style={{ zIndex: 50 }}>
      <View
        className={`border-b border-[#E2E8F0] ${
          scrolled || mobileMenuOpen ? 'bg-white/95 shadow-xs backdrop-blur-xl' : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <Container className="py-3">
          <View className="flex-row items-center justify-between gap-4">
            <Link href="/" asChild>
              <Pressable
                onPress={() => setMobileMenuOpen(false)}
                className="flex-row items-center gap-2.5"
              >
                <View className="h-9 w-9 items-center justify-center rounded-2xl bg-[#0F172A]">
                  <Ionicons name="pulse" size={18} color="#0EA5E9" />
                </View>
                <Text className="text-[22px] font-black tracking-tight text-[#0F172A]">
                  net<Text className="text-[#0EA5E9]">surf</Text>
                </Text>
              </Pressable>
            </Link>

            <View className="hidden flex-1 flex-row items-center justify-center gap-0.5 md:flex">
              {links.map((link) => {
                const content = (
                  <Text
                    className={`text-sm ${
                      link.active ? 'font-bold text-[#0EA5E9]' : 'font-medium text-[#475569]'
                    }`}
                  >
                    {link.label}
                  </Text>
                );

                if (link.href) {
                  return (
                    <Link key={link.key} href={link.href} asChild>
                      <Pressable className={`rounded-full px-3.5 py-2 ${link.active ? 'bg-[#F0F9FF]' : ''}`}>
                        {content}
                      </Pressable>
                    </Link>
                  );
                }

                return (
                  <Pressable
                    key={link.key}
                    onPress={link.onPress}
                    className="rounded-full px-3.5 py-2"
                  >
                    {content}
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-row items-center gap-2">
              <LanguageSwitcher />
              <View className="hidden sm:flex">
                <Button
                  label={t.portal}
                  size="sm"
                  icon={<Ionicons name="log-in-outline" size={14} color="#FFFFFF" />}
                  iconPosition="left"
                  onPress={() => Linking.openURL(brand.portal)}
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Menu"
                onPress={() => setMobileMenuOpen((value) => !value)}
                className="h-10 w-10 items-center justify-center rounded-full border border-[#E2E8F0] bg-white md:hidden"
              >
                <Ionicons name={mobileMenuOpen ? 'close' : 'menu'} size={18} color="#0F172A" />
              </Pressable>
            </View>
          </View>
        </Container>

        {mobileMenuOpen ? (
          <View className="border-t border-[#E2E8F0] bg-white px-4 py-3 md:hidden">
            <View className="gap-1 pb-2">
              {links.map((link) => (
                <Pressable
                  key={link.key}
                  accessibilityRole="button"
                  onPress={() => {
                    if (link.href) {
                      setMobileMenuOpen(false);
                      router.push(link.href);
                      return;
                    }
                    link.onPress?.();
                  }}
                  className={`flex-row items-center justify-between rounded-2xl px-3 py-3 ${
                    link.active ? 'bg-[#F0F9FF]' : ''
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      link.active ? 'font-bold text-[#0EA5E9]' : 'font-semibold text-[#0F172A]'
                    }`}
                  >
                    {link.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                </Pressable>
              ))}
              <View className="pt-2 sm:hidden">
                <Button
                  label={t.portal}
                  size="card"
                  icon={<Ionicons name="log-in-outline" size={15} color="#FFFFFF" />}
                  iconPosition="left"
                  onPress={() => {
                    setMobileMenuOpen(false);
                    Linking.openURL(brand.portal);
                  }}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
