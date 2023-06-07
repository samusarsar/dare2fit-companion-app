import { Center, VStack } from "native-base";

import ActivityLogger from "../../components/Activity/ActivityLogger/ActivityLogger";

const Activity = () => {
  return (
    <Center w="100%" h="100%" p={2}>
      <ActivityLogger />
    </Center>
  );
};

export default Activity;
