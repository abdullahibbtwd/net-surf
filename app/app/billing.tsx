import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLanguage } from '@/components/Language';
import { Icon, PortalFrame, portalColors } from '@/components/portal';

export default function BillingScreen() {
  const { t } = useLanguage();
  const [autoPay, setAutoPay] = useState(true);

  const paymentHistory = [
    { date: 'Oct 24, 2024', method: t.paidAutoPay },
    { date: 'Sep 24, 2024', method: t.paidApplePay },
    { date: 'Aug 24, 2024', method: t.paidCard },
  ];

  return (
    <PortalFrame title={t.billingTitle} pageTitle="NetSurf" subtitle={t.billingSubtitle}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-[20px] font-semibold tracking-tight text-[#0F172A]">{t.billingHeading}</Text>
          <Text className="text-[12px] text-[#475569]">{t.billingAccount}</Text>
        </View>
        <View className="flex-row items-center gap-1.5 rounded-full border border-[#006C49] bg-[#6CF8BB]/20 px-2.5 py-1">
          <View className="h-1.5 w-1.5 rounded-full bg-[#006C49]" />
          <Text className="text-[11px] font-semibold uppercase text-[#006C49]">{t.activeService}</Text>
        </View>
      </View>

      {/* Balance hero */}
      <View className="rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[13px] font-semibold text-[#475569]">{t.currentBalance}</Text>
          <View className="rounded-full border border-[#BEC8D2] bg-[#FFDCBD] px-2 py-0.5">
            <Text className="text-[11px] font-semibold uppercase text-[#693C00]">{t.upcomingCycle}</Text>
          </View>
        </View>
        <View className="mb-1 flex-row items-baseline gap-1.5">
          <Text className="text-[32px] font-bold tracking-tight text-[#0F172A]">34.90</Text>
          <Text className="text-[18px] font-bold text-[#475569]">лв.</Text>
          <Text className="ml-1 text-[12px] text-[#6E7881]">{t.inclVat}</Text>
        </View>
        <View className="mb-4 flex-row items-center gap-1.5">
          <Icon name="calendar" size={16} color="#6E7881" />
          <Text className="text-[12px] text-[#475569]">{t.dueOn}</Text>
        </View>
        <Pressable className="h-12 flex-row items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] active:opacity-90">
          <Icon name="lock" size={18} color="#FFFFFF" />
          <Text className="text-[16px] font-semibold text-white">{t.payNowAmount}</Text>
        </Pressable>
        <View className="mt-2.5 flex-row items-center justify-center gap-1">
          <Icon name="shield" size={14} color="#006C49" />
          <Text className="text-[12px] text-[#6E7881]">{t.securePay}</Text>
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
                {autoPay ? t.autoPayEnabled : t.autoPayDisabled}
              </Text>
              <Text className="text-[12px] text-[#475569]">{t.autoPayHint}</Text>
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
              <Text className="text-[12px] text-[#6E7881]">{t.expires}</Text>
            </View>
          </View>
          <Pressable>
            <Text className="text-[13px] font-semibold text-[#0EA5E9]">{t.changeCard}</Text>
          </Pressable>
        </View>
      </View>

      {/* Plan breakdown */}
      <View className="overflow-hidden rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
            {t.planAddons}
          </Text>
          <Text className="text-[12px] text-[#6E7881]">{t.planPeriod}</Text>
        </View>
        <View className="gap-3">
          <PlanRow
            icon="globe"
            title={t.fiberPlan}
            subtitle={t.fiberPlanSub}
            price="24.90 лв."
          />
          <View className="ml-7 border-t border-[#BEC8D2]" />
          <PlanRow
            icon="monitor"
            title={t.tvPlan}
            subtitle={t.tvPlanSub}
            price="10.00 лв."
          />
        </View>
        <View className="-mx-4 -mb-4 mt-4 flex-row items-center justify-between rounded-b-[15px] border-t border-[#BEC8D2] bg-[#F2F3FF] px-4 py-2.5">
          <Text className="text-[13px] font-semibold text-[#0F172A]">{t.monthlyTotal}</Text>
          <Text className="text-[16px] font-semibold text-[#0F172A]">34.90 лв.</Text>
        </View>
      </View>

      {/* Payment history */}
      <View className="rounded-2xl border border-[#BEC8D2] bg-white p-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
            {t.paymentHistory}
          </Text>
          <View className="flex-row items-center gap-0.5">
            <Icon name="download" size={14} color={portalColors.accent} />
            <Text className="text-[12px] font-medium text-[#0EA5E9]">{t.pdfInvoices}</Text>
          </View>
        </View>
        {paymentHistory.map((row, i) => (
          <View
            key={row.date}
            className={`flex-row items-center justify-between py-3 ${i < paymentHistory.length - 1 ? 'border-b border-[#BEC8D2]' : ''}`}
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
              <Text className="text-[11px] font-semibold uppercase text-[#006C49]">{t.settled}</Text>
            </View>
          </View>
        ))}
      </View>

      <View className="mb-1 flex-row gap-2">
        <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#BEC8D2] bg-white">
          <Icon name="file-text" size={18} color="#6E7881" />
          <Text className="text-[13px] font-semibold text-[#0F172A]">{t.taxDetails}</Text>
        </Pressable>
        <Pressable className="h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#BEC8D2] bg-white">
          <Icon name="clock" size={18} color="#6E7881" />
          <Text className="text-[13px] font-semibold text-[#0F172A]">{t.usageArchive}</Text>
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
