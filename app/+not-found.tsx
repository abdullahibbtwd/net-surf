import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Page } from '@/components';
import { useLanguage } from '@/components/Language';

export default function NotFoundScreen() {
  const { lang } = useLanguage();
  const title = lang === 'bg' ? 'Страницата я няма.' : 'That page drifted.';
  const body = lang === 'bg' ? 'Този адрес не е част от сайта на NetSurf.' : 'The URL is not one of the NetSurf routes.';
  const back = lang === 'bg' ? 'Към началото' : 'Back to home';

  return (
    <Page title="NetSurf">
      <View className="items-start px-5 py-24">
        <Text className="mb-3 text-4xl font-bold text-ink">{title}</Text>
        <Text className="mb-6 text-muted">{body}</Text>
        <Link href="/" className="text-purple">
          {back}
        </Link>
      </View>
    </Page>
  );
}
