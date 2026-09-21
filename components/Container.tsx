import { View, type ViewProps } from 'react-native';

export function Container({ className, children, ...props }: ViewProps) {
  return (
    <View className={`mx-auto w-full max-w-7xl px-5 ${className ?? ''}`} {...props}>
      {children}
    </View>
  );
}
