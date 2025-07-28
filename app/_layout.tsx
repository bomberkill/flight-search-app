import { auth } from '@/firebaseConfig';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import "../i18n/index";

// Empêche le splash screen de se masquer automatiquement avant que le chargement des ressources ne soit terminé.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded && user !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [loaded, user]);

  if (!loaded || user === undefined) {
    // Pendant que les polices et l'authentification se chargent, le splash screen reste visible.
    return null;
  }

  return (
    <AutocompleteDropdownContextProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {user ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </AutocompleteDropdownContextProvider>
  );
}
