import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  tone?: 'green' | 'navy' | 'gold' | 'purple' | 'cyan' | 'slate' | 'mint' | 'teal' | 'accent';
  size?: 'sm' | 'md';
};

const tones: Record<NonNullable<BadgeProps['tone']>, { wrap: string; text: string; dot?: string }> = {
  green: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#475569]', dot: 'bg-emerald-500' },
  navy: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#0F172A]' },
  gold: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#475569]' },
  purple: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#475569]' },
  cyan: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#0EA5E9]', dot: 'bg-[#0EA5E9]' },
  slate: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#475569]' },
  mint: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#475569]', dot: 'bg-emerald-500' },
  teal: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#0EA5E9]', dot: 'bg-[#0EA5E9]' },
  accent: { wrap: 'bg-[#F8FAFC] border border-[#E2E8F0]', text: 'text-[#0EA5E9]', dot: 'bg-[#0EA5E9]' },
};

export function Badge({ label, tone = 'slate', size = 'sm' }: BadgeProps) {
  const styles = tones[tone] ?? tones.slate;
  const pad = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  return (
    <View className={`self-start flex-row items-center gap-1.5 rounded-full ${styles.wrap} ${pad}`}>
      {styles.dot ? <View className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} /> : null}
      <Text className={`font-medium tracking-normal ${styles.text}`}>{label}</Text>
    </View>
  );
}
