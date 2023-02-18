import { extendTheme, ThemeConfig, useColorModeValue } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const DarkMode = {
  primary: {
    500: '#161B25',
    400: '#3A3C4E',
    300: "#57596C"
  }
}

const LightMode = {
  primary: {
    500: '#DAE0E6',
    400: '#EEEEEE',
    300: "#F5F5F5"
  }
}

const theme = extendTheme({
  config,
  colors: {
    white: "#DAE0E6",
    LightMode,
    DarkMode
  },
  fonts,
  breakpoints
});

export default theme;