export type Track = 'home' | 'business';
export type Lang = 'bg' | 'en';

export type Localized = { bg: string; en: string };

export type InternetPackage = {
  id: string;
  track: Track;
  name: Localized;
  speedMbps: number;
  channels: number;
  hdChannels: number;
  priceMonthly: number;
  description: Localized;
  highlights: Localized[];
  featured?: boolean;
  gift?: Localized;
  extraBrand?: string;
  quoteOnly?: boolean;
};

export const packages: InternetPackage[] = [
  {
    id: 'sporten-maks',
    track: 'home',
    name: { bg: 'Спортен Макс', en: 'Sport Max' },
    speedMbps: 300,
    channels: 170,
    hdChannels: 90,
    priceMonthly: 22,
    extraBrand: 'MAXSPORT MIX',
    gift: { bg: '+ Подарък Типток', en: '+ Tiptok gift' },
    description: {
      bg: 'Оптичен интернет и интерактивна телевизия със спортен пакет Maxsport MIX.',
      en: 'Fiber internet and interactive TV with the Maxsport MIX pack.',
    },
    highlights: [
      { bg: 'ТВ канали', en: 'TV channels' },
      { bg: 'Aurora приемник', en: 'Aurora set-top box' },
      { bg: 'Aurora приложение', en: 'Aurora app' },
      { bg: '5 паузи по договор', en: '5 contract pauses' },
      { bg: 'Екстри: връщане назад (7 дни), видео архив, търсачка и запис', en: 'Extras: 7-day catchup, archive, search and recording' },
      { bg: 'Сигурност с Закрилникът', en: 'Zakrilnikat security' },
      { bg: 'Wi-Fi 6 рутер', en: 'Wi-Fi 6 router' },
    ],
  },
  {
    id: 'sporten-ekstra',
    track: 'home',
    name: { bg: 'Спортен Екстра', en: 'Sport Extra' },
    speedMbps: 300,
    channels: 170,
    hdChannels: 90,
    priceMonthly: 23.5,
    extraBrand: 'DIEMA EXTRA',
    gift: { bg: '+ Подарък Типток', en: '+ Tiptok gift' },
    description: {
      bg: 'Оптичен интернет и интерактивна телевизия с DIEMA EXTRA.',
      en: 'Fiber internet and interactive TV with DIEMA EXTRA.',
    },
    highlights: [
      { bg: 'ТВ канали', en: 'TV channels' },
      { bg: 'Aurora приемник', en: 'Aurora set-top box' },
      { bg: 'Aurora приложение', en: 'Aurora app' },
      { bg: '5 паузи по договор', en: '5 contract pauses' },
      { bg: 'Екстри: връщане назад (7 дни), видео архив, търсачка и запис', en: 'Extras: 7-day catchup, archive, search and recording' },
      { bg: 'Сигурност с Закрилникът', en: 'Zakrilnikat security' },
      { bg: 'Wi-Fi 6 рутер', en: 'Wi-Fi 6 router' },
    ],
    featured: true,
  },
  {
    id: 'sporten-premium',
    track: 'home',
    name: { bg: 'Спортен Премиум', en: 'Sport Premium' },
    speedMbps: 500,
    channels: 175,
    hdChannels: 95,
    priceMonthly: 27,
    extraBrand: 'MAXSPORT MIX + DIEMA EXTRA',
    gift: { bg: '+ Подарък Типток', en: '+ Tiptok gift' },
    description: {
      bg: 'Най-пълният домашен пакет: 500 Mbps, повече канали и пълен спорт.',
      en: 'The fullest home pack: 500 Mbps, more channels, and the complete sports bundle.',
    },
    highlights: [
      { bg: 'ТВ канали', en: 'TV channels' },
      { bg: 'Aurora приемник', en: 'Aurora set-top box' },
      { bg: 'Aurora приложение', en: 'Aurora app' },
      { bg: '5 паузи по договор', en: '5 contract pauses' },
      { bg: 'Екстри: връщане назад (7 дни), видео архив, търсачка и запис', en: 'Extras: 7-day catchup, archive, search and recording' },
      { bg: 'Сигурност с Закрилникът', en: 'Zakrilnikat security' },
      { bg: 'Wi-Fi 6 рутер', en: 'Wi-Fi 6 router' },
    ],
  },
  {
    id: 'business-fiber',
    track: 'business',
    name: { bg: 'Бизнес оптика', en: 'Business fiber' },
    speedMbps: 500,
    channels: 0,
    hdChannels: 0,
    priceMonthly: 0,
    quoteOnly: true,
    description: {
      bg: 'Оптична линия за магазини и офиси. Оферта след проверка на адреса.',
      en: 'Fiber for shops and offices. Quote after we check the address.',
    },
    highlights: [
      { bg: 'Статичен IP по заявка', en: 'Static IP on request' },
      { bg: 'Фактуриране за фирма', en: 'Company invoicing' },
      { bg: 'Приоритетен монтаж', en: 'Priority install' },
      { bg: 'Обслужване 24/7', en: '24/7 support' },
    ],
  },
  {
    id: 'business-fiber-pro',
    track: 'business',
    name: { bg: 'Бизнес оптика Про', en: 'Business fiber Pro' },
    speedMbps: 1000,
    channels: 0,
    hdChannels: 0,
    priceMonthly: 0,
    quoteOnly: true,
    featured: true,
    description: {
      bg: 'Гигабит за екипи, камери и каси на една чиста линия.',
      en: 'Gigabit for teams, cameras, and tills on one clean line.',
    },
    highlights: [
      { bg: 'Гигабитна оптика', en: 'Gigabit fiber' },
      { bg: 'SLA по договаряне', en: 'SLA on request' },
      { bg: 'Резервен канал където има покритие', en: 'Backup path where coverage allows' },
      { bg: 'Обслужване 24/7', en: '24/7 support' },
    ],
  },
];

export function getPackages(track?: Track) {
  return track ? packages.filter((item) => item.track === track) : packages;
}

export function getFeaturedPackage(track: Track = 'home') {
  return getPackages(track).find((item) => item.featured) ?? getPackages(track)[0];
}

export function getPackageById(id: string) {
  return packages.find((item) => item.id === id) ?? null;
}

export function recommendPackage(speedMbps: number, track: Track = 'home') {
  const list = getPackages(track).filter((item) => !item.quoteOnly);
  const pool = list.length ? list : getPackages(track);
  return pool.reduce((best, item) => {
    const bestDelta = Math.abs(best.speedMbps - speedMbps);
    const nextDelta = Math.abs(item.speedMbps - speedMbps);
    return nextDelta < bestDelta ? item : best;
  });
}

export function formatPrice(amount: number, lang: Lang = 'bg') {
  if (!amount) return lang === 'bg' ? 'по запитване' : 'on request';
  if (lang === 'bg') return `${amount.toFixed(2).replace('.', ',')} €/мес`;
  return `€${amount.toFixed(2)}/mo`;
}

export function formatSpeed(mbps: number) {
  return mbps >= 1000 ? `${mbps / 1000} Gbps` : `${mbps} Mbps`;
}

export function loc(value: Localized, lang: 'bg' | 'en' | string) {
  return lang === 'en' ? value.en : value.bg;
}
