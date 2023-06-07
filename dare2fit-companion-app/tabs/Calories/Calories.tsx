import { FlatList, VStack, useColorModeValue } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CalorieLogger from "../../components/Calories/CalorieLogger/CalorieLogger";

const Calories = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      style={{ backgroundColor: background }}
    >
      <FlatList
        w="100%"
        data={[0]}
        renderItem={() => (
          <VStack w="100%" h="100%" p={2}>
            <CalorieLogger />
          </VStack>
        )}
      />
    </KeyboardAwareScrollView>
  );
};

export default Calories;
