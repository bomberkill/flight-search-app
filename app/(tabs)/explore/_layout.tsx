import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';


export default function ExploreLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen
          name="search"
          options={{
              title: t('explore.screens.search.title'),
              // headerTitleAlign: 'center',
          }} 
      />
      <Stack.Screen
          name="result"
          options={{
              title: t('explore.screens.result.title'),
              // headerTitleAlign: 'center',
              headerBackVisible: true,
          }} 
      />
    </Stack>
  );
}
