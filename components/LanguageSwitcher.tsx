import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLanguage, type Lang } from './Language';

const options: { code: Lang; native: string; short: string }[] = [
  { code: 'bg', native: 'Български', short: 'BG' },
  { code: 'en', native: 'English', short: 'EN' },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = options.find((item) => item.code === lang) ?? options[0];

  useEffect(() => {
    if (!open || Platform.OS !== 'web' || typeof document === 'undefined') return undefined;
    const onPointer = () => setOpen(false);
    const timer = setTimeout(() => document.addEventListener('click', onPointer), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', onPointer);
    };
  }, [open]);

  return (
    <View style={{ position: 'relative', zIndex: 80 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Language"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        className={`h-10 flex-row items-center gap-2 rounded-full border px-2 pr-3 ${
          open ? 'border-[#0EA5E9] bg-[#F0F9FF]' : 'border-[#E2E8F0] bg-white'
        }`}
      >
        <View className="h-6 min-w-[28px] items-center justify-center rounded-full bg-[#0F172A] px-1.5">
          <Text className="text-[10px] font-black tracking-wide text-white">{current.short}</Text>
        </View>
        <Text className="hidden text-sm font-semibold text-[#0F172A] sm:flex">{current.native}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={14} color="#0EA5E9" />
      </Pressable>

      {open ? (
        <View
          className="absolute right-0 top-[46px] w-48 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white py-1.5"
          style={{
            zIndex: 90,
            shadowColor: '#0F172A',
            shadowOpacity: 0.12,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 12 },
          }}
        >
          {options.map((item) => {
            const active = item.code === lang;
            return (
              <Pressable
                key={item.code}
                accessibilityRole="button"
                onPress={() => {
                  setLang(item.code);
                  setOpen(false);
                }}
                className={`mx-1.5 flex-row items-center justify-between rounded-xl px-2.5 py-2.5 ${
                  active ? 'bg-[#F0F9FF]' : ''
                }`}
              >
                <View className="flex-row items-center gap-2.5">
                  <View
                    className={`h-7 min-w-[32px] items-center justify-center rounded-full px-2 ${
                      active ? 'bg-[#0EA5E9]' : 'bg-[#F1F5F9]'
                    }`}
                  >
                    <Text className={`text-[10px] font-black ${active ? 'text-white' : 'text-[#475569]'}`}>
                      {item.short}
                    </Text>
                  </View>
                  <Text className={`text-sm ${active ? 'font-semibold text-[#0F172A]' : 'font-medium text-[#475569]'}`}>
                    {item.native}
                  </Text>
                </View>
                {active ? <Ionicons name="checkmark" size={16} color="#0EA5E9" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
