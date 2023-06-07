import { Center, useColorModeValue } from "native-base";

import CalorieLogger from "../../components/Calories/CalorieLogger/CalorieLogger";

const Calories = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <Center w="100%" h="100%" p={2} bg={background}>
      <CalorieLogger />
    </Center>
  );
};

export default Calories;
