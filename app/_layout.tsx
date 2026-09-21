import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LanguageProvider, OverlayProvider, SiteFooter, SiteHeader } from '@/components';

import '@/global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <OverlayProvider>
          <StatusBar style="dark" />
          <SafeAreaView className="min-h-screen bg-canvas" edges={['top']}>
            <View className="min-h-screen bg-canvas">
              <SiteHeader />
              <Slot />
              <SiteFooter />
            </View>
          </SafeAreaView>
        </OverlayProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
