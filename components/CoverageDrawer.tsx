import { useState } from 'react';
import { Text, View } from 'react-native';
import { loc, submitContact, townLabels, towns, type Town } from '@/services';
import { Button } from './Button';
import { Field } from './Field';
import { useLanguage } from './Language';
import { Sheet } from './Sheet';

type CoverageDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export function CoverageDrawer({ visible, onClose }: CoverageDrawerProps) {
  const { lang, t } = useLanguage();
  const [address, setAddress] = useState('');
  const [town, setTown] = useState<Town>(towns[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setBusy(true);
    setStatus(null);
    try {
      const result = await submitContact({
        name,
        email,
        neighborhood: `${address}, ${town}`,
        message: 'Coverage check',
      });
      setStatus(`${t.requestIn} ${result.id}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t.requestIn);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Sheet visible={visible} title={t.coverage} onClose={onClose}>
      <View className="gap-4">
        <View className="flex-row flex-wrap gap-2">
          {towns.map((item) => (
            <Button
              key={item}
              label={loc(townLabels[item], lang)}
              variant={item === town ? 'primary' : 'outline'}
              onPress={() => setTown(item)}
            />
          ))}
        </View>
        <Field label={t.stepAddress} value={address} onChangeText={setAddress} />
        <Field label={t.name} value={name} onChangeText={setName} />
        <Field label={t.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Button label={busy ? '…' : t.coverage} onPress={onSubmit} disabled={busy} />
        {status ? <Text className="text-sm text-purple">{status}</Text> : null}
      </View>
    </Sheet>
  );
}
