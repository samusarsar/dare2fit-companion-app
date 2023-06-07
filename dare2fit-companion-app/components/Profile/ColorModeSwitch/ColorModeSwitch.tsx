import { FontAwesome } from "@expo/vector-icons";
import { Button, Icon, useColorMode } from "native-base";
import { FC } from "react";

const ColorModeSwitch: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      size="lg"
      aria-label="toggle theme"
      variant="solid"
      onPress={toggleColorMode}
      colorScheme="gray"
      leftIcon={
        colorMode === "light" ? (
          <Icon as={FontAwesome} name="moon-o" />
        ) : (
          <Icon as={FontAwesome} name="sun-o" />
        )
      }
    />
  );
};

export default ColorModeSwitch;
