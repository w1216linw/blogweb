import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      colorScheme={"gray"}
      icon={colorMode === "light" ? <SunIcon color="orange.400" /> : <MoonIcon color="blue.200"/>}
      aria-label="color mode switcher"
      ms='2rem'
    />
  );
};

export default ColorModeSwitcher;
