import { Tabs } from 'expo-router';
import { CustomTabBar } from '@/components/portal';

export default function PortalLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="speed" options={{ title: 'Speed' }} />
      <Tabs.Screen name="billing" options={{ title: 'Billing' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="support" options={{ title: 'Support' }} />
      <Tabs.Screen name="status" options={{ href: null, title: 'Service Status' }} />
      <Tabs.Screen name="account" options={{ href: null, title: 'Account' }} />
      <Tabs.Screen name="wifi-config" options={{ href: null, title: 'Wi-Fi Configuration' }} />
    </Tabs>
  );
}
