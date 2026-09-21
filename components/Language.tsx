import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type Lang = 'en' | 'bg';

const copy = {
  en: {
    phoneNew: 'New customers',
    phoneCurrent: 'Current customers',
    portal: 'Sign in',
    coverage: 'Coverage',
    shops: 'Shops',
    home: 'For home',
    freedom: 'Freedom',
    packages: 'Packages',
    promotions: 'Promotions',
    aurora: 'Aurora TV',
    guardian: 'Zakrilnikat',
    forYou: 'For you',
    contact: 'Contact',
    seePackages: 'See packages',
    heroTitleLead: 'Fiber internet and',
    heroTitleAccent: 'interactive TV for everyone',
    heroBody:
      'Dedicated GPON fiber to your home with interactive TV and 7-day replay.',
    telemetryBadge: '26 years continuous fiber network · 99.9% Uptime',
    telemetryHub: 'NetSurf GPON Hub · Live Diagnostics',
    telemetryPing: 'Ultra-low Ping',
    telemetryStatus: 'Fiber link: 100% Active',
    telemetryUps: 'Zakrilnikat: UPS Backup Active',
    telemetryLoss: '0% Packet loss',
    speedDownloadBenchmark: '4K Movie in ~14 sec',
    speedGamingBenchmark: 'Competitive gaming ping',
    testLine: 'Run diagnostic test',
    testLineSuccess: 'Diagnostics passed: Pure optical link',
    explore: 'See packages',
    checkAddress: 'Check coverage',
    dragSpeed: 'Pick a speed',
    recommended: 'Recommended',
    forHome: 'For home',
    forBusiness: 'For business',
    mostPopular: 'Most popular',
    channels: 'channels',
    hdChannels: 'HD',
    orderPlan: 'Order by phone',
    viewDetails: 'See all details',
    viewChannels: 'Channel list',
    included: 'What’s included',
    gift: 'Gift',
    auroraTitleLead: 'Become master of time',
    auroraTitleAccent: '(and the airwaves)',
    auroraBody:
      'Pause live TV and watch 7-day replays with the wireless Aurora TV box.',
    tryDemo: 'Try Aurora TV',
    backupTitleLead: 'No power?',
    backupTitleAccent: 'You still have net',
    backupBody:
      'Your router, cameras, and POS terminals stay online for hours during power cuts.',
    proofTitleLead: 'What others think',
    proofTitleAccent: 'about us',
    statsTitleLead: 'More than numbers,',
    statsTitleAccent: 'our customers speak for us',
    statsBody:
      '26 years of continuous fiber network growth delivering reliable internet and interactive TV.',
    whyTitleLead: 'Why people stay',
    whyTitleAccent: 'with NetSurf',
    euro: 'Euro adoption',
    noPower: 'No power, still net',
    wirelessTv: 'Wireless interactive TV',
    support247: 'Support 24/7',
    users: 'Friends (customers)',
    years: 'Years in the trade',
    towns: 'Towns',
    fiberKm: 'Fiber network',
    coverageTitle: 'Coverage notes',
    checkoutTitle: 'Order in three steps',
    stepAddress: 'Address',
    stepContact: 'Contact',
    stepConfirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    placeOrder: 'Place order',
    close: 'Close',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Anything we should know',
    send: 'Send',
    requestIn: 'Request is in. We will reply within one business day.',
    allTowns: 'All',
  },
  bg: {
    phoneNew: 'нови клиенти',
    phoneCurrent: 'текущи клиенти',
    portal: 'Вход',
    coverage: 'Покритие',
    shops: 'Магазини',
    home: 'За дома',
    freedom: 'Свобода',
    packages: 'Пакети',
    promotions: 'Промоции',
    aurora: 'Aurora TV',
    guardian: 'Закрилникът',
    forYou: 'За Теб',
    contact: 'Контакти',
    seePackages: 'Виж пакетите',
    heroTitleLead: 'Оптичен интернет и',
    heroTitleAccent: 'интерактивна телевизия за всеки',
    heroBody:
      'Чиста GPON оптика до дома и интерактивна телевизия с пълен 7-дневен архив.',
    telemetryBadge: '26 години непрекъсната оптична мрежа · 99.9% Uptime',
    telemetryHub: 'NetSurf GPON Хъб · Жива телеметрия',
    telemetryPing: 'Ултра-нисък пинг',
    telemetryStatus: 'Оптична линия: 100% Активна',
    telemetryUps: 'Закрилникът: UPS Резерв Активен',
    telemetryLoss: '0% Загуба на пакети',
    speedDownloadBenchmark: '4K Филм за ~14 сек',
    speedGamingBenchmark: 'Без лаг за състезателен гейминг',
    testLine: 'Стартирай тест на линията',
    testLineSuccess: 'Тестът премина успешно: Чиста оптична линия',
    explore: 'Виж пакетите',
    checkAddress: 'Провери покритие',
    dragSpeed: 'Избери скорост',
    recommended: 'Препоръчан',
    forHome: 'За дома',
    forBusiness: 'За бизнеса',
    mostPopular: 'Най-популярен',
    channels: 'канали',
    hdChannels: 'HD',
    orderPlan: 'Заяви по телефон',
    viewDetails: 'Виж всички детайли',
    viewChannels: 'Списък с канали',
    included: 'Какво включва',
    gift: 'Подарък',
    auroraTitleLead: 'Стани властелин на времето',
    auroraTitleAccent: '(и ефира)',
    auroraBody:
      'Паузирай предавания и гледай 7 дни назад с безжичния приемник Aurora TV.',
    tryDemo: 'Демо на Aurora TV',
    backupTitleLead: 'Нямаш ток,',
    backupTitleAccent: 'имаш нет',
    backupBody:
      'Рутерът, камерите и касовите апарати остават онлайн с часове при спиране на тока.',
    proofTitleLead: 'Какво мислят',
    proofTitleAccent: 'другите за нас',
    statsTitleLead: 'Повече от статистика,',
    statsTitleAccent: 'за нас говорят клиентите',
    statsBody:
      'Над 25 години непрекъснато развитие на оптичната мрежа и хиляди доволни домакинства.',
    whyTitleLead: 'Защо хората остават',
    whyTitleAccent: 'на NetSurf-а',
    euro: 'Въвеждане на еврото',
    noPower: 'Нямаш ток, имаш нет',
    wirelessTv: 'Безкабелна интерактивна ТВ',
    support247: 'Обслужване 24/7',
    users: 'Приятели (клиенти)',
    years: 'Години в бранша',
    towns: 'Населени места',
    fiberKm: 'Оптична мрежа',
    coverageTitle: 'Бележки за покритие',
    checkoutTitle: 'Поръчка в три стъпки',
    stepAddress: 'Адрес',
    stepContact: 'Контакт',
    stepConfirm: 'Потвърждение',
    continue: 'Напред',
    back: 'Назад',
    placeOrder: 'Поръчай',
    close: 'Затвори',
    name: 'Име',
    email: 'Имейл',
    phone: 'Телефон',
    message: 'Нещо, което трябва да знаем',
    send: 'Изпрати',
    requestIn: 'Заявката е приета. Отговаряме до един работен ден.',
    allTowns: 'Всички',
  },
} as const;

type Copy = (typeof copy)[Lang];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLang] = useState<Lang>('bg');
  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
