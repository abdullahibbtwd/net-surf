import { Text } from 'react-native';
import { Container, Page, PackageShowcase } from '@/components';
import { useLanguage } from '@/components/Language';

export default function PackagesScreen() {
  const { t } = useLanguage();

  return (
    <Page title="Пакети — NetSurf">
      <Container className="pt-16">
        <Text className="mb-3 text-sm font-bold uppercase tracking-[2px] text-[#0EA5E9]">{t.packages}</Text>
        <Text className="max-w-2xl text-3xl sm:text-4xl font-bold leading-tight text-[#1E293B]">
          {t.heroTitleLead} <Text className="text-[#0EA5E9]">{t.heroTitleAccent}</Text>
        </Text>
      </Container>
      <PackageShowcase />
    </Page>
  );
}
