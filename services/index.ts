export {
  formatPrice,
  formatSpeed,
  getFeaturedPackage,
  getPackageById,
  getPackages,
  loc,
  recommendPackage,
} from './packages';
export type { InternetPackage, Lang, Localized, Track } from './packages';
export { submitContact } from './contact';
export type { ContactRequest, ContactResponse } from './contact';
export { submitOrder } from './order';
export type { OrderRequest, OrderResponse } from './order';
export { auroraChannels, auroraFeatures } from './channels';
export { coverageNotes, getTestimonials, stats, townLabels, towns } from './coverage';
export type { Testimonial, Town } from './coverage';
