import type { Localized } from './packages';

export const towns = ['Montana', 'Vratsa', 'Blagoevgrad', 'Lom'] as const;

export type Town = (typeof towns)[number];

export const townLabels: Record<Town, Localized> = {
  Montana: { bg: 'Монтана', en: 'Montana' },
  Vratsa: { bg: 'Враца', en: 'Vratsa' },
  Blagoevgrad: { bg: 'Благоевград', en: 'Blagoevgrad' },
  Lom: { bg: 'Лом', en: 'Lom' },
};

export type Testimonial = {
  id: string;
  town: Town;
  name: string;
  quote: Localized;
  date: string;
  stars: number;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    town: 'Montana',
    name: 'Елизабет Кръстева',
    date: '22-01-2022',
    stars: 5,
    quote: {
      bg: 'Търсачката в новата визия на телевизията е страхотна. Откривам без проблем всеки филм и предаване.',
      en: 'The search in the new TV interface is excellent. I find every film and show without trouble.',
    },
  },
  {
    id: 't2',
    town: 'Montana',
    name: 'Аспарух Илиев',
    date: '08-11-2021',
    stars: 4,
    quote: {
      bg: 'Една от единиците останали компании в България, класа и много добро качество на продукта и обслужването. Ползвам техните услуги вече над 20г. с малки прекъсвания поради отсъствия от страната.',
      en: 'One of the few remaining companies in Bulgaria with class and very good product and service. I have used them for over 20 years, with short pauses only when I was abroad.',
    },
  },
  {
    id: 't3',
    town: 'Blagoevgrad',
    name: 'Боряна Влахова',
    date: '27-02-2021',
    stars: 5,
    quote: {
      bg: 'Те са най-коректните! Ползвала съм услуги на други оператори, но откакто се появи NetSurf сме техни клиенти и сме супер доволни. Не бихме ги сменили!',
      en: 'They are the most fair! I have used other operators, but since NetSurf arrived we have been their customers and we are very happy. We would not switch!',
    },
  },
  {
    id: 't4',
    town: 'Montana',
    name: 'Кристина Людмилова',
    date: '14-03-2022',
    stars: 5,
    quote: {
      bg: 'Бърз интернет, коректно обслужване и телевизия, която наистина се търси и паузира.',
      en: 'Fast internet, fair support, and TV you can actually search and pause.',
    },
  },
  {
    id: 't5',
    town: 'Blagoevgrad',
    name: 'Илия Божански',
    date: '03-06-2022',
    stars: 5,
    quote: {
      bg: 'Оптиката държи, дори когато съседите остават без сигнал. Препоръчвам ги без колебание.',
      en: 'The fiber holds even when the neighbours drop off. I recommend them without hesitation.',
    },
  },
  {
    id: 't6',
    town: 'Vratsa',
    name: 'Десислава К.',
    date: '19-09-2022',
    stars: 5,
    quote: {
      bg: 'Магазинът и камерите са на една линия. Когато токът мигна, рутерът остана горе.',
      en: 'The shop and cameras share one line. When the lights blinked, the router stayed up.',
    },
  },
  {
    id: 't7',
    town: 'Lom',
    name: 'Елена Маринова',
    date: '11-12-2022',
    stars: 5,
    quote: {
      bg: 'Спиране на тока в четвъртък. На комшиите падна нетът. При нас си остана.',
      en: 'Power cut on Thursday. The neighbours dropped off. We stayed on.',
    },
  },
];

export const coverageNotes: Record<Town, Localized> = {
  Montana: {
    bg: 'Оптика в центъра, Огоста и Младост. За нови сгради правим проверка на улицата.',
    en: 'Fiber live across the centre, Ogosta, and Mladost. Street-level check for new builds.',
  },
  Vratsa: {
    bg: 'Покритие в центъра, Куклите и индустриалната зона. Бизнес линии по главните улици.',
    en: 'Coverage in the centre, Kuklite, and the industrial park. Business lines on most main streets.',
  },
  Blagoevgrad: {
    bg: 'Гъсто покритие в центъра и към кампуса. Бачиново и Струмско след проверка.',
    en: 'Dense coverage in the centre and campus. Bachinovo and Strumsko on request.',
  },
  Lom: {
    bg: 'Жив Дунавски квартал и център. Крайните улици с обход в същата седмица.',
    en: 'Danube quarter and centre are live. Outlying streets get a same-week survey.',
  },
};

export const stats = [
  { value: '25663+', label: { bg: 'Приятели (клиенти)', en: 'Friends (customers)' } },
  { value: '39+', label: { bg: 'Населени места', en: 'Towns covered' } },
  { value: '494+ км', label: { bg: 'Оптична мрежа', en: 'Fiber network' } },
  { value: '26+', label: { bg: 'Години в бранша', en: 'Years in the trade' } },
] as const;

export function getTestimonials(town?: Town) {
  return town ? testimonials.filter((item) => item.town === town) : testimonials;
}
