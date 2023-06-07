import { ScrollView, VStack, useColorModeValue } from "native-base";

import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (

    <ScrollView w="100%" bg={background}>
      <VStack w="100%" h="100%" p={2}>
        <ActivityLogger />
      </VStack>
    </ScrollView>
  );
};

export default Activity;
