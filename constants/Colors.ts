/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const primaryBlue = '#2563eb';
const darkBlue = '#1e3a8a';
const lightGray = '#f3f4f6';
const darkGray = '#1f2937'; 
const white = '#ffffff';
const black = '#000000';

export const Colors = {
  light: {
    text: '#111827',
    background: white,
    tint: primaryBlue, 
    icon: '#6b7280',
    card: lightGray,
    inputBorder: '#d1d5db',
    tabIconDefault: '#9ca3af',
    tabIconSelected: primaryBlue,
    error: '#dc2626',
    success: '#16a34a',
  },
  dark: {
    text: '#F9FAFB',
    background: '#0f172a', 
    tint: tintColorDark,
    icon: '#9ca3af',
    card: darkGray,
    inputBorder: '#374151',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorDark,
    error: '#f87171',
    success: '#4ade80',
  },
};

