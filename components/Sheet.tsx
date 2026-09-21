import { type PropsWithChildren } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { useLanguage } from './Language';

type SheetProps = PropsWithChildren<{
  visible: boolean;
  title: string;
  onClose: () => void;
}>;

const overlayStyle = {
  flex: 1,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  backgroundColor: 'rgba(15, 23, 42, 0.55)',
  ...(Platform.OS === 'web'
    ? {
        position: 'fixed' as const,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100000,
        width: '100%' as const,
        height: '100%' as const,
      }
    : {}),
};

export function Sheet({ visible, title, onClose, children }: SheetProps) {
  const { t } = useLanguage();

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={overlayStyle}>
        <Pressable
          accessibilityLabel={t.close}
          onPress={onClose}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
        <View
          style={{
            width: '92%',
            maxWidth: 520,
            maxHeight: '85%',
            minHeight: 280,
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            borderColor: '#E2E8F0',
            borderWidth: 1,
            padding: 24,
            overflow: 'hidden',
          }}
        >
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-ink">{title}</Text>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={t.close}>
              <Text className="text-sm text-muted">{t.close}</Text>
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}
