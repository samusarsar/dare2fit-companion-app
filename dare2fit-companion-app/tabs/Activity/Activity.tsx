import { FlatList, ScrollView, VStack, useColorModeValue } from "native-base";

import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <FlatList
      w="100%"
      bg={background}
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
