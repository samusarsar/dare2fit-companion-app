import { onValue, ref } from "firebase/database";
import moment from "moment";
import { Box, ScrollView, Text, VStack, useColorModeValue } from "native-base";
import { FC, useContext, useEffect, useState } from "react";

import { db } from "../../../config/firebase-config";
import { AppContext } from "../../../context/AppContext/AppContext";
import CalorieLogButton from "../CalorieLogButton/CalorieLogButton";
import CalorieLogDisplay from "../CalorieLogDisplay/CalorieLogDisplay";

const CalorieLogger: FC = () => {
  const { userData } = useContext(AppContext);

  const [calorieLog, setCalorieLog] = useState({});

  const background = useColorModeValue("brand.light", "brand.dark");
  const innerBoxBackground = useColorModeValue("brand.white", "brand.grey");

  useEffect(() => {
    const todayDate = moment().format("YYYY-MM-DD");

    return onValue(
      ref(db, `logs/${userData!.handle}/${todayDate}/calories`),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCalorieLog(data);
        } else {
          setCalorieLog({});
        }
      }
    );
  }, []);

  const today = moment().format("dddd, MMM Do");

  return (
    <ScrollView w="100%" bg={background}>
      <VStack w="100%" bg="brand.blue" p={6} alignContent="start" rounded="lg">
        <Box bg="brand.red" p={3} rounded="full" mb={4}>
          <Text fontWeight="bold">{today}</Text>
        </Box>
        <VStack w="100%">
          <VStack
            w="100%"
            bg={innerBoxBackground}
            rounded="lg"
            shadow="lg"
            p={4}
          >
            <CalorieLogDisplay calorieLog={calorieLog} />
            <CalorieLogButton />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CalorieLogger;
