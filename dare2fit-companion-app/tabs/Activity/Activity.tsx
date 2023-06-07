import { VStack, useColorModeValue } from "native-base";

import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <VStack w="100%" h="100%" p={2} bg={background}>
      <ActivityLogger />
    </VStack>
  );
};

export default Activity;
