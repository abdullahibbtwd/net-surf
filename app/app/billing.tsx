import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

export default function BillingScreen() {
  const [autoPay, setAutoPay] = useState(true);

  return (
    <PortalFrame
      title="NetSurf - Billing & Payments"
      pageTitle="NetSurf"
      subtitle="Sofia • High-Speed Fiber"
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[20px] font-semibold tracking-tight text-[#0F172A]">Billing & Payments</Text>
          <Text className="text-[12px] text-[#475569]">Account #BG-402981-SF</Text>
        </View>
        <View className="flex-row items-center gap-1.5 rounded-full border border-[#006C49] bg-[#6CF8BB]/20 px-2.5 py-1">
          <View className="h-1.5 w-1.5 rounded-full bg-[#006C49]" />
          <Text className="text-[11px] font-semibold uppercase text-[#006C49]">Active Service</Text>
        </View>
      </View>

      {/* Balance hero */}
      <View className="rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[13px] font-semibold text-[#475569]">Current Balance Due</Text>
          <View className="rounded-full border border-[#BEC8D2] bg-[#FFDCBD] px-2 py-0.5">
            <Text className="text-[11px] font-semibold uppercase text-[#693C00]">Upcoming Cycle</Text>
          </View>
        </View>
        <View className="mb-1 flex-row items-baseline gap-1.5">
          <Text className="text-[32px] font-bold tracking-tight text-[#0F172A]">34.90</Text>
          <Text className="text-[18px] font-bold text-[#475569]">лв.</Text>
          <Text className="ml-1 text-[12px] text-[#6E7881]">(incl. 20% VAT)</Text>
        </View>
        <View className="mb-4 flex-row items-center gap-1.5">
          <Icon name="calendar" size={16} color="#6E7881" />
          <Text className="text-[12px] text-[#475569]">Due on November 24, 2024</Text>
        </View>
        <Pressable className="h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:opacity-90">
          <Icon name="lock" size={18} color="#FFFFFF" />
          <Text className="text-[16px] font-semibold text-white">Pay 34.90 лв. Now</Text>
        </Pressable>
        <View className="mt-2.5 flex-row items-center justify-center gap-1">
          <Icon name="shield" size={14} color="#006C49" />
          <Text className="text-[12px] text-[#6E7881]">Instant card processing via Borica 3D Secure</Text>
        </View>
      </View>

      {/* Auto-pay */}
      <View className="rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="flex-row items-center justify-between border-b border-[#BEC8D2] pb-3">
          <View className="flex-row items-center gap-2.5">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#EAEDFF]">
              <Icon name="refresh-cw" size={18} color="#006591" />
            </View>
            <View>
              <Text className="text-[14px] font-semibold text-[#0F172A]">
                Auto-Pay: {autoPay ? 'Enabled' : 'Disabled'}
              </Text>
              <Text className="text-[12px] text-[#475569]">Debits automatically on the 24th</Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: autoPay }}
            onPress={() => setAutoPay((v) => !v)}
            className={`h-[31px] w-[51px] justify-center rounded-full p-0.5 ${
              autoPay ? 'items-end bg-[#0EA5E9]' : 'items-start bg-[#BEC8D2]'
            }`}
          >
            <View className="h-[27px] w-[27px] rounded-full bg-white shadow-sm" />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between pt-3">
          <View className="flex-row items-center gap-3">
            <View className="h-7 w-10 items-center justify-center rounded-md border border-[#BEC8D2] bg-[#EAEDFF]">
              <Icon name="credit-card" size={18} color="#8A5100" />
            </View>
            <View>
              <Text className="text-[14px] font-semibold leading-tight text-[#0F172A]">Mastercard •••• 4291</Text>
              <Text className="text-[12px] text-[#6E7881]">Expires 09/27</Text>
            </View>
          </View>
          <Pressable>
            <Text className="text-[13px] font-semibold text-[#0EA5E9]">Change card</Text>
          </Pressable>
        </View>
      </View>

      {/* Plan breakdown */}
      <View className="overflow-hidden rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
            Plan & Active Add-ons
          </Text>
          <Text className="text-[12px] text-[#6E7881]">Nov 1 – Nov 30</Text>
        </View>
        <View className="gap-3">
          <PlanRow
            icon="globe"
            title="Fiber 1000 Mbps Internet"
            subtitle="Symmetrical Gigabit Connection • Static IPv4"
            price="24.90 лв."
          />
          <View className="ml-7 border-t border-[#BEC8D2]" />
          <PlanRow
            icon="monitor"
            title="NetSurf Max TV"
            subtitle="180 channels + Diema Extra HD Package"
            price="10.00 лв."
          />
        </View>
        <View className="-mx-4 -mb-4 mt-4 flex-row items-center justify-between rounded-b-[15px] border-t border-[#BEC8D2] bg-[#F2F3FF] px-4 py-2.5">
          <Text className="text-[13px] font-semibold text-[#0F172A]">Monthly Recurring Total</Text>
          <Text className="text-[16px] font-semibold text-[#0F172A]">34.90 лв.</Text>
        </View>
      </View>

      {/* Payment history */}
      <View className="rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">Payment History</Text>
          <View className="flex-row items-center gap-0.5">
            <Icon name="download" size={14} color={portalColors.accent} />
            <Text className="text-[12px] font-medium text-[#0EA5E9]">PDF Invoices</Text>
          </View>
        </View>
        {[
          { date: 'Oct 24, 2024', method: 'Paid via Auto-Pay' },
          { date: 'Sep 24, 2024', method: 'Paid via Apple Pay' },
          { date: 'Aug 24, 2024', method: 'Paid via Card' },
        ].map((row, i) => (
          <View
            key={row.date}
            className={`flex-row items-center justify-between py-3 ${i < 2 ? 'border-b border-[#BEC8D2]' : ''}`}
          >
            <View className="flex-row items-center gap-3">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-[#6CF8BB]/20">
                <Icon name="check-circle" size={18} color="#006C49" />
              </View>
              <View>
                <Text className="text-[14px] font-semibold text-[#0F172A]">{row.date}</Text>
                <Text className="text-[12px] text-[#475569]">{row.method}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-[14px] font-semibold text-[#0F172A]">34.90 лв.</Text>
              <Text className="text-[11px] font-semibold uppercase text-[#006C49]">Settled</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mb-1 flex-row gap-2">
        <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#BEC8D2] bg-white">
          <Icon name="file-text" size={18} color="#6E7881" />
          <Text className="text-[13px] font-semibold text-[#0F172A]">Tax Details (ЕИК)</Text>
        </Pressable>
        <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#BEC8D2] bg-white">
          <Icon name="clock" size={18} color="#6E7881" />
          <Text className="text-[13px] font-semibold text-[#0F172A]">Usage Archive</Text>
        </Pressable>
      </View>
    </PortalFrame>
  );
}

function PlanRow({
  icon,
  title,
  subtitle,
  price,
}: {
  icon: 'globe' | 'monitor';
  title: string;
  subtitle: string;
  price: string;
}) {
  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1 flex-row items-start gap-2.5 pr-2">
        <View className="mt-0.5">
          <Icon name={icon} size={18} color={portalColors.accent} />
        </View>
        <View className="flex-1">
          <Text className="text-[14px] font-semibold text-[#0F172A]">{title}</Text>
          <Text className="text-[12px] text-[#475569]">{subtitle}</Text>
        </View>
      </View>
      <Text className="text-[14px] font-semibold text-[#0F172A]">{price}</Text>
    </View>
  );
}
