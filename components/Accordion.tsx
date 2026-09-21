import { useState, type PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type AccordionProps = PropsWithChildren<{
  title: string;
}>;

export function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="border-t border-line pt-3">
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen((value) => !value)}
        className="flex-row items-center justify-between py-1"
      >
        <Text className="text-sm font-medium text-ink">{title}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#64748B" />
      </Pressable>
      {open ? <View className="mt-2 gap-1">{children}</View> : null}
    </View>
  );
}
