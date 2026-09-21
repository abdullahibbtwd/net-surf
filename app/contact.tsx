import { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Button, Container, Field, Page } from '@/components';
import { useLanguage } from '@/components/Language';
import { coverageNotes, loc, submitContact, townLabels, towns, type Town } from '@/services';
import { brand } from '@/theme';

export default function ContactScreen() {
  const { lang, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState<Town>(towns[0]);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
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
        message,
      });
      setStatus(`${t.requestIn} ${result.id}`);
      setName('');
      setEmail('');
      setAddress('');
      setMessage('');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t.requestIn);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Page title="Контакти — NetSurf">
      <Container className="py-16 pb-20">
        <Text className="mb-3 text-sm font-bold uppercase tracking-[2px] text-purple">{t.contact}</Text>
        <Text className="max-w-2xl text-4xl font-bold leading-tight text-ink">{t.checkAddress}</Text>
        <Text className="mt-4 max-w-xl text-base text-muted">{loc(coverageNotes[town], lang)}</Text>
        <Pressable className="mt-4" onPress={() => Linking.openURL(`tel:${brand.phoneNew}`)}>
          <Text className="text-lg font-bold text-navy">{brand.phoneNewDisplay}</Text>
          <Text className="text-xs uppercase tracking-wide text-muted">{t.phoneNew}</Text>
        </Pressable>

        <View className="mt-8 flex-row flex-wrap gap-2">
          {towns.map((item) => {
            const active = item === town;
            return (
              <Pressable
                key={item}
                onPress={() => setTown(item)}
                className={`rounded-full border px-4 py-2 ${active ? 'border-purple bg-accent-soft' : 'border-line bg-surface'}`}
              >
                <Text className={`text-sm font-medium ${active ? 'text-purple' : 'text-ink'}`}>
                  {loc(townLabels[item], lang)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-10 max-w-xl gap-4">
          <Field label={t.name} value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label={t.email} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Field label={t.stepAddress} value={address} onChangeText={setAddress} />
          <Field
            label={t.message}
            value={message}
            onChangeText={setMessage}
            multiline
            className="min-h-[120px]"
          />
          <Button label={busy ? '…' : t.send} onPress={onSubmit} disabled={busy} />
          {status ? <Text className="text-sm text-purple">{status}</Text> : null}
        </View>
      </Container>
    </Page>
  );
}
