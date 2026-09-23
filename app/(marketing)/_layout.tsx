import { Slot } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SiteFooter, SiteHeader } from '@/components';

export default function MarketingLayout() {
  return (
    <SafeAreaView className="min-h-screen bg-canvas" edges={['top']}>
      <View className="min-h-screen bg-canvas">
        <SiteHeader />
        <Slot />
        <SiteFooter />
      </View>
    </SafeAreaView>
  );
}
