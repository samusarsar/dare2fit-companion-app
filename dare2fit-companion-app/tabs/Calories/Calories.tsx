import { VStack, useColorModeValue } from "native-base";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import CalorieLogger from "../../components/Calories/CalorieLogger/CalorieLogger";

const Calories = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <KeyboardAwareFlatList
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: background }}
      data={[0]}
      renderItem={() => (
        <VStack w="100%" h="100%" p={2}>
          <CalorieLogger />
        </VStack>
      )}
    />
  );
};

export default Calories;
