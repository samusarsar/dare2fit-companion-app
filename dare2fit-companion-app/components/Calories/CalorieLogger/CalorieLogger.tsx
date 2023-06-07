import moment from "moment";
import { Box, ScrollView, Text, VStack, useColorModeValue } from "native-base";
import { FC, useContext } from "react";

import { AppContext } from "../../../context/AppContext/AppContext";
import CalorieLogButton from "../CalorieLogButton/CalorieLogButton";

const CalorieLogger: FC = () => {
  const { userData } = useContext(AppContext);

  const background = useColorModeValue("brand.light", "brand.dark");

  const today = moment().format("dddd, MMM Do");

  return (
    <ScrollView w="100%" bg={background}>
      <VStack w="100%" bg="brand.blue" p={6} alignContent="start" rounded="lg">
        <Box bg="brand.red" p={3} rounded="full" mb={4}>
          <Text fontWeight="bold">{today}</Text>
        </Box>
        <VStack w="100%">
          <VStack w="100%" bg={background} rounded="lg" shadow="lg" p={4}>
            <CalorieLogButton />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CalorieLogger;
