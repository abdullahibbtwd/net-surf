import { FeatureShowcase, HeroSection, PackageShowcase, Page, SocialProof, TrustPills, WhyNetsurf } from '@/components';

export default function HomeScreen() {
  return (
    <Page title="NetSurf — Оптичен интернет и интерактивна телевизия">
      <HeroSection />
      <TrustPills />
      <PackageShowcase />
      <FeatureShowcase />
      <WhyNetsurf />
      <SocialProof />
    </Page>
  );
}
