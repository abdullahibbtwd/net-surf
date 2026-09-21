import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from './Button';
import { Container } from './Container';
import { useLanguage } from './Language';
import { useOverlays } from './Overlays';
import { SplitHeading } from './SplitHeading';

export function FeatureShowcase() {
  const { lang, t } = useLanguage();
  const { openAurora } = useOverlays();
  const [blackoutSim, setBlackoutSim] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('bTV Action HD');

  return (
    <View>
      {/* 1. Aurora TV Showcase Section (Alternate bg #F8FAFC) */}
      <View nativeID="aurora" className="bg-[#F8FAFC] py-14 sm:py-20 border-b border-[#E2E8F0]">
        <Container>
          <View className="flex-col gap-10 lg:flex-row items-center">
            {/* Left: TV Interface Mockup (Clean Light Frame) */}
            <View className="w-full flex-1">
              <View className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-xs">
                {/* Top Player Header */}
                <View className="mb-3.5 flex-row items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <View className="flex-row items-center gap-2">
                    <View className="h-2 w-2 rounded-full bg-[#0EA5E9]" />
                    <Text className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                      Aurora TV · Live
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5">
                    <View className="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5">
                      <Text className="text-[10px] font-semibold text-[#475569]">4K HDR</Text>
                    </View>
                    <View className="rounded border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5">
                      <Text className="text-[10px] font-semibold text-[#0EA5E9]">DOLBY</Text>
                    </View>
                  </View>
                </View>

                {/* TV Screen Preview Container */}
                <View className="relative h-44 sm:h-52 w-full rounded-xl bg-[#F8FAFC] p-4 justify-between border border-[#E2E8F0] overflow-hidden">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-sm sm:text-base font-bold text-[#0F172A]">
                        {currentChannel}
                      </Text>
                      <Text className="text-xs text-[#475569]">
                        {lang === 'bg' ? 'Шампионска лига · На живо' : 'Champions League · Live'}
                      </Text>
                    </View>
                    <View className="rounded-full border border-[#E2E8F0] bg-white px-2.5 py-0.5 flex-row items-center gap-1">
                      <View className="h-1.5 w-1.5 rounded-full bg-[#0EA5E9]" />
                      <Text className="text-[10px] font-bold text-[#0EA5E9] uppercase">
                        {lang === 'bg' ? 'На живо' : 'Live'}
                      </Text>
                    </View>
                  </View>

                  {/* Channel quick pills */}
                  <View className="flex-row flex-wrap gap-1.5 my-auto">
                    {['bTV Action HD', 'Diema Sport 4K', 'National Geographic', 'Eurosport'].map((ch) => (
                      <Pressable
                        key={ch}
                        accessibilityRole="button"
                        onPress={() => setCurrentChannel(ch)}
                        className={`rounded-md px-2.5 py-1 border text-xs transition-all ${
                          currentChannel === ch
                            ? 'border-[#0EA5E9] bg-white'
                            : 'border-[#E2E8F0] bg-white'
                        }`}
                      >
                        <Text
                          className={`text-[11px] font-medium ${
                            currentChannel === ch ? 'text-[#0EA5E9] font-bold' : 'text-[#475569]'
                          }`}
                        >
                          {ch}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  {/* Playback Scrubber & Controls */}
                  <View className="w-full gap-2">
                    <View className="flex-row items-center justify-between text-[10px] text-[#475569]">
                      <Text className="text-[11px] text-[#475569] font-mono">21:45:10</Text>
                      <Text className="text-[11px] font-medium text-[#0EA5E9]">
                        {lang === 'bg' ? '7 дни архив' : '7-day catchup'}
                      </Text>
                    </View>
                    <View className="h-1.5 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                      <View className="h-full rounded-full bg-[#0EA5E9]" style={{ width: '70%' }} />
                    </View>
                    <View className="flex-row justify-between pt-1">
                      <View className="flex-row items-center gap-3">
                        <Ionicons name="play-back" size={14} color="#0EA5E9" />
                        <Ionicons name="pause" size={14} color="#0F172A" />
                        <Ionicons name="play-forward" size={14} color="#0EA5E9" />
                      </View>
                      <Text className="text-[11px] text-[#475569]">
                        {lang === 'bg' ? 'Пауза и превъртане' : 'Pause & rewind'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Quick feature pills */}
                <View className="mt-3.5 flex-row flex-wrap gap-1.5">
                  {[
                    lang === 'bg' ? 'Безжичен приемник' : 'Wireless box',
                    lang === 'bg' ? 'Запис в облак' : 'Cloud record',
                    lang === 'bg' ? 'Смарт приложение' : 'Smart app',
                    lang === 'bg' ? '7 дни архив' : '7-day replay',
                  ].map((item) => (
                    <View
                      key={item}
                      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1"
                    >
                      <Text className="text-xs font-normal text-[#475569]">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Right: Explanation & Demo Trigger */}
            <View className="w-full flex-1">
              <SplitHeading
                eyebrow="Aurora TV"
                lead={t.auroraTitleLead}
                accent={t.auroraTitleAccent}
                align="left"
              />
              <Text className="mt-3 text-base leading-relaxed text-[#475569] font-normal">
                {t.auroraBody}
              </Text>

              {/* 3 Crisp Highlights (Icon + Short Label) */}
              <View className="mt-6 gap-3">
                <View className="flex-row items-center gap-2.5">
                  <Ionicons name="checkmark-circle" size={18} color="#0EA5E9" />
                  <Text className="text-sm font-medium text-[#0F172A]">
                    {lang === 'bg' ? '7 дни пълен ТВ архив и пауза на живо' : '7-day catchup and live pause'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2.5">
                  <Ionicons name="checkmark-circle" size={18} color="#0EA5E9" />
                  <Text className="text-sm font-medium text-[#0F172A]">
                    {lang === 'bg' ? 'Безжично свързване без излишни кабели' : 'Clean wireless connection with zero messy cables'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2.5">
                  <Ionicons name="checkmark-circle" size={18} color="#0EA5E9" />
                  <Text className="text-sm font-medium text-[#0F172A]">
                    {lang === 'bg' ? 'Кристална 4K HDR картина с Dolby звук' : 'Crystal 4K HDR visual clarity with Dolby sound'}
                  </Text>
                </View>
              </View>

              <Button
                className="mt-6 self-start"
                label={t.tryDemo}
                variant="primary"
                icon={<Ionicons name="play" size={13} color="#FFFFFF" />}
                onPress={openAurora}
              />
            </View>
          </View>
        </Container>
      </View>

      {/* 2. Zakrilnikat (UPS Continuity) Showcase Section (Alternate bg #FFFFFF) */}
      <View nativeID="backup" className="bg-white py-14 sm:py-20 border-b border-[#E2E8F0]">
        <Container>
          <View className="flex-col-reverse gap-10 lg:flex-row items-center">
            {/* Left: Info */}
            <View className="w-full flex-1">
              <SplitHeading
                eyebrow={lang === 'bg' ? 'Закрилникът' : 'Zakrilnikat'}
                lead={t.backupTitleLead}
                accent={t.backupTitleAccent}
                align="left"
              />
              <Text className="mt-3 text-base leading-relaxed text-[#475569] font-normal">
                {t.backupBody}
              </Text>

              {/* 3 Crisp Highlights (Icon + Short Label) */}
              <View className="mt-6 gap-3">
                <View className="flex-row items-center gap-2.5">
                  <View className="h-7 w-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <Ionicons name="shield-checkmark" size={16} color="#0EA5E9" />
                  </View>
                  <Text className="text-sm font-medium text-[#0F172A] flex-1">
                    {lang === 'bg'
                      ? 'Рутерът излъчва Wi-Fi с часове при спиране на тока'
                      : 'Router transmits Wi-Fi for hours without grid electricity'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2.5">
                  <View className="h-7 w-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <Ionicons name="videocam" size={16} color="#0EA5E9" />
                  </View>
                  <Text className="text-sm font-medium text-[#0F172A] flex-1">
                    {lang === 'bg'
                      ? 'Охранителните камери и смарт устройства остават активни'
                      : 'Security cameras and smart devices stay fully active'}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2.5">
                  <View className="h-7 w-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                    <Ionicons name="card" size={16} color="#0EA5E9" />
                  </View>
                  <Text className="text-sm font-medium text-[#0F172A] flex-1">
                    {lang === 'bg'
                      ? 'Касовите апарати и POS терминали не спират работа'
                      : 'Tills, cash registers and POS card terminals keep operating'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Right: Interactive Power Cut Simulation Widget */}
            <View className="w-full flex-1">
              <View className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 shadow-xs">
                <View className="flex-row items-center justify-between border-b border-[#E2E8F0] pb-3.5 mb-4">
                  <View>
                    <Text className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                      {lang === 'bg' ? 'Симулатор на спиране' : 'Power Cut Simulator'}
                    </Text>
                    <Text className="text-sm sm:text-base font-bold text-[#0F172A] mt-0.5">
                      {blackoutSim
                        ? lang === 'bg'
                          ? 'Токът е спрял в района'
                          : 'Grid power is OFF'
                        : lang === 'bg'
                          ? 'Нормално ел. захранване'
                          : 'Grid power ON'}
                    </Text>
                  </View>

                  {/* Interactive Toggle Button */}
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => setBlackoutSim((v) => !v)}
                    className="rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 transition-all hover:bg-slate-50"
                  >
                    <Text className="text-xs font-semibold text-[#0EA5E9]">
                      {blackoutSim
                        ? lang === 'bg'
                          ? 'Възстанови тока'
                          : 'Restore power'
                        : lang === 'bg'
                          ? 'Спри тока (Тест)'
                          : 'Simulate cut'}
                    </Text>
                  </Pressable>
                </View>

                {/* Comparison Pods */}
                <View className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Other ISP */}
                  <View className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                    <Text className="text-xs font-semibold text-[#475569] uppercase tracking-wide">
                      {lang === 'bg' ? 'Обикновен доставчик' : 'Other Providers'}
                    </Text>
                    <View className="mt-2.5 flex-row items-center gap-1.5">
                      <Ionicons
                        name={blackoutSim ? 'close-circle' : 'checkmark-circle-outline'}
                        size={17}
                        color={blackoutSim ? '#475569' : '#0EA5E9'}
                      />
                      <Text className="text-sm font-semibold text-[#475569]">
                        {blackoutSim
                          ? lang === 'bg'
                            ? 'Офлайн (Спрял)'
                            : 'Offline (Down)'
                          : lang === 'bg'
                            ? 'Работи'
                            : 'Operating'}
                      </Text>
                    </View>
                    <Text className="mt-1.5 text-xs text-[#475569] leading-relaxed font-normal">
                      {blackoutSim
                        ? lang === 'bg'
                          ? 'Рутерът изгасва веднага.'
                          : 'Router dies immediately.'
                        : lang === 'bg'
                          ? 'Работи само от контакта.'
                          : 'Relies on wall socket.'}
                    </Text>
                  </View>

                  {/* NetSurf with Zakrilnikat */}
                  <View className="rounded-xl border border-[#0EA5E9] bg-white p-4 shadow-xs">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                        NetSurf + Закрилникът
                      </Text>
                      <View className="h-2 w-2 rounded-full bg-emerald-500" />
                    </View>
                    <View className="mt-2.5 flex-row items-center gap-1.5">
                      <Ionicons name="shield-checkmark" size={17} color="#0EA5E9" />
                      <Text className="text-sm font-bold text-[#0F172A]">
                        {lang === 'bg' ? '100% Онлайн и активен' : '100% Online and active'}
                      </Text>
                    </View>
                    <Text className="mt-1.5 text-xs text-[#475569] leading-relaxed font-normal">
                      {blackoutSim
                        ? lang === 'bg'
                          ? 'Батерията поема захранването мигновено.'
                          : 'Battery backup triggers instantly.'
                        : lang === 'bg'
                          ? 'Постоянна защита от аварии.'
                          : 'Constant outage protection.'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Container>
      </View>
    </View>
  );
}
