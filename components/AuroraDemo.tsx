import { Text, View } from 'react-native';
import { auroraFeatures, loc } from '@/services';
import { Button } from './Button';
import { useLanguage } from './Language';
import { Sheet } from './Sheet';

type AuroraDemoProps = {
  visible: boolean;
  onClose: () => void;
};

export function AuroraDemo({ visible, onClose }: AuroraDemoProps) {
  const { lang, t } = useLanguage();

  return (
    <Sheet visible={visible} title="Aurora TV" onClose={onClose}>
      <View className="overflow-hidden rounded-2xl border border-line bg-navy p-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-sm font-bold text-white">Aurora</Text>
          <View className="rounded-full bg-accent px-2 py-0.5">
            <Text className="text-[10px] font-bold text-navy">LIVE</Text>
          </View>
        </View>
        <View className="mb-4 h-36 items-center justify-center rounded-xl bg-white/10">
          <Text className="text-lg font-bold text-white">bTV · 00:12:04</Text>
          <Text className="mt-1 text-xs text-white/70">7-day catchup · Search · Live pause</Text>
        </View>
        <View className="flex-row gap-2">
          {['Pause', 'Catchup', 'Search'].map((item) => (
            <View key={item} className="flex-1 rounded-lg bg-white/10 py-2">
              <Text className="text-center text-xs text-white">{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="mt-4 gap-3">
        {auroraFeatures.map((feature) => (
          <View key={feature.title.en}>
            <Text className="font-medium text-ink">{loc(feature.title, lang)}</Text>
            <Text className="text-sm text-muted">{loc(feature.copy, lang)}</Text>
          </View>
        ))}
      </View>
      <Button className="mt-5" label={t.close} variant="outline" onPress={onClose} />
    </Sheet>
  );
}
