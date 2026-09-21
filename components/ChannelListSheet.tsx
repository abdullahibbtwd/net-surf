import { ScrollView, Text, View } from 'react-native';
import { auroraChannels, loc, type InternetPackage } from '@/services';
import { useLanguage } from './Language';
import { Sheet } from './Sheet';

type ChannelListSheetProps = {
  plan: InternetPackage | null;
  onClose: () => void;
};

export function ChannelListSheet({ plan, onClose }: ChannelListSheetProps) {
  const { lang, t } = useLanguage();
  const count = plan?.channels ? Math.min(plan.channels, auroraChannels.length) : auroraChannels.length;
  const visible = plan ? auroraChannels.slice(0, count) : [];

  return (
    <Sheet visible={Boolean(plan)} title={t.viewChannels} onClose={onClose}>
      <Text className="mb-4 text-sm text-muted">
        {plan ? loc(plan.name, lang) : ''} · {plan?.channels || auroraChannels.length}+ {t.channels}
      </Text>
      <ScrollView className="max-h-80">
        <View className="flex-row flex-wrap gap-2">
          {visible.map((channel) => (
            <View key={channel} className="rounded-full bg-accent-soft px-3 py-1.5">
              <Text className="text-sm text-navy">{channel}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Sheet>
  );
}
