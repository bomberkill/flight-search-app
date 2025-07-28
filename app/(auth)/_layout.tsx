import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';


export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
          name="login"
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="register"
          options={{ headerShown: false }}
      />
    </Stack>
  );
}
