import type { PropsWithChildren } from 'react';
import Head from 'expo-router/head';
import { View } from 'react-native';

type PageProps = PropsWithChildren<{
  title: string;
}>;

export function Page({ title, children }: PageProps) {
  return (
    <View className="bg-canvas">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </View>
  );
}
