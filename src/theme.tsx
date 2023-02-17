import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  colors: {
    darkDark: "#232328",
    darkReg: "#2F313A",
    darkLight: "#333642",
    lightReg: "#e2e2e2",
    lightLight: "#f1f1f1",
  },
  fonts,
  breakpoints,
  styles: {
    global: {
      body: {
        bg: "darkLight",
        color: 'lightReg'
      },
    },
  },
});

export default theme;
