import { Text, TextInput, View, type TextInputProps } from 'react-native';

type FieldProps = TextInputProps & {
  label: string;
};

export function Field({ label, className, ...props }: FieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-muted">{label}</Text>
      <TextInput
        placeholderTextColor="#94A3B8"
        accessibilityLabel={label}
        className={`rounded-xl border border-line bg-surface px-4 py-3.5 text-base text-ink ${className ?? ''}`}
        {...props}
      />
    </View>
  );
}
