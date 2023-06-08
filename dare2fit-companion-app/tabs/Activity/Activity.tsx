import { VStack, useColorModeValue } from "native-base";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

import { COLOR_BRAND_DARK, COLOR_BRAND_LIGHT } from "../../common/constants";
import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  const background = useColorModeValue(COLOR_BRAND_LIGHT, COLOR_BRAND_DARK);

  return (
    <KeyboardAwareFlatList
      style={{ backgroundColor: background }}
      data={[0]}
      renderItem={() => (
        <VStack w="100%" h="100%" p={2}>
          <ActivityLogger />
        </VStack>
      )}
    />
  );
};

export default Activity;
