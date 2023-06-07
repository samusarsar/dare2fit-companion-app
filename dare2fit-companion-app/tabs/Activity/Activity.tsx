import { Center, useColorModeValue } from "native-base";

import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <Center w="100%" h="100%" p={2} bg={background}>
      <ActivityLogger />
    </Center>
  );
};

export default Activity;
