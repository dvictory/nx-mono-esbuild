import { theme as proTheme } from '@chakra-ui/pro-theme';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import '@fontsource/inter/variable.css';
export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);
