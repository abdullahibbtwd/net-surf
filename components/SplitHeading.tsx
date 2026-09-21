import { Text, View } from 'react-native';

type SplitHeadingProps = {
  eyebrow?: string;
  lead: string;
  accent: string;
  align?: 'center' | 'left';
  size?: 'hero' | 'section';
};

export function SplitHeading({
  eyebrow,
  lead,
  accent,
  align = 'center',
  size = 'section',
}: SplitHeadingProps) {
  const centered = align === 'center';
  const titleClass =
    size === 'hero'
      ? 'text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.15] text-[#0F172A]'
      : 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug text-[#0F172A]';

  return (
    <View className={centered ? 'items-center text-center' : 'items-start'}>
      {eyebrow ? (
        <View className="mb-3.5 flex-row items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1">
          <View className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
          <Text className="text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
            {eyebrow}
          </Text>
        </View>
      ) : null}
      <Text className={`${titleClass} ${centered ? 'text-center' : ''}`}>
        {lead} <Text className="text-[#0EA5E9]">{accent}</Text>
      </Text>
    </View>
  );
}

