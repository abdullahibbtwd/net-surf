import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider, OverlayProvider } from '@/components';

import '@/global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <OverlayProvider>
          <StatusBar style="dark" />
          <Slot />
        </OverlayProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
