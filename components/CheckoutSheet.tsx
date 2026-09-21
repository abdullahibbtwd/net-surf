import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { formatPrice, loc, submitOrder, townLabels, towns, type InternetPackage, type Town } from '@/services';
import { Button } from './Button';
import { Field } from './Field';
import { useLanguage } from './Language';
import { Sheet } from './Sheet';

type CheckoutSheetProps = {
  plan: InternetPackage | null;
  onClose: () => void;
};

export function CheckoutSheet({ plan, onClose }: CheckoutSheetProps) {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState('');
  const [town, setTown] = useState<Town>(towns[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const labels = useMemo(() => [t.stepAddress, t.stepContact, t.stepConfirm], [t]);

  async function placeOrder() {
    if (!plan) return;
    setBusy(true);
    setStatus(null);
    try {
      const result = await submitOrder({ planId: plan.id, address, town, name, email, phone });
      setStatus(`${t.requestIn} ${result.id}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : t.requestIn);
    } finally {
      setBusy(false);
    }
  }

  function close() {
    setStep(0);
    setStatus(null);
    onClose();
  }

  return (
    <Sheet visible={Boolean(plan)} title={t.checkoutTitle} onClose={close}>
      <View className="mb-5 flex-row gap-2">
        {labels.map((label, index) => (
          <View key={label} className={`flex-1 rounded-full px-2 py-1 ${index === step ? 'bg-accent-soft' : 'bg-canvas'}`}>
            <Text className={`text-center text-xs font-medium ${index === step ? 'text-navy' : 'text-muted'}`}>
              {index + 1}. {label}
            </Text>
          </View>
        ))}
      </View>

      {plan ? (
        <Text className="mb-4 text-sm text-muted">
          {loc(plan.name, lang)} · {plan.speedMbps} Mbps · {formatPrice(plan.priceMonthly, lang)}
        </Text>
      ) : null}

      {step === 0 ? (
        <View className="gap-4">
          <Field label={t.stepAddress} value={address} onChangeText={setAddress} />
          <View className="flex-row flex-wrap gap-2">
            {towns.map((item) => (
              <Button
                key={item}
                label={loc(townLabels[item], lang)}
                size="md"
                variant={item === town ? 'primary' : 'outline'}
                onPress={() => setTown(item)}
              />
            ))}
          </View>
          <Button label={t.continue} onPress={() => setStep(1)} />
        </View>
      ) : null}

      {step === 1 ? (
        <View className="gap-4">
          <Field label={t.name} value={name} onChangeText={setName} autoCapitalize="words" />
          <Field label={t.email} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Field label={t.phone} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <View className="flex-row gap-3">
            <Button className="flex-1" label={t.back} variant="outline" onPress={() => setStep(0)} />
            <Button className="flex-1" label={t.continue} onPress={() => setStep(2)} />
          </View>
        </View>
      ) : null}

      {step === 2 ? (
        <View className="gap-4">
          <Text className="text-sm leading-6 text-ink">
            {name || '—'} · {email || '—'} · {phone || '—'}
            {'\n'}
            {address || '—'}, {loc(townLabels[town], lang)}
          </Text>
          <View className="flex-row gap-3">
            <Button className="flex-1" label={t.back} variant="outline" onPress={() => setStep(1)} />
            <Button className="flex-1" label={busy ? '…' : t.placeOrder} onPress={placeOrder} disabled={busy} />
          </View>
          {status ? <Text className="text-sm text-purple">{status}</Text> : null}
        </View>
      ) : null}
    </Sheet>
  );
}
