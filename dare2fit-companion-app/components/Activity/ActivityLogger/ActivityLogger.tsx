import { onValue, ref } from "firebase/database";
import moment from "moment";
import { Box, HStack, Text, VStack, useColorModeValue } from "native-base";
import { FC, ReactElement, useContext, useEffect, useState } from "react";

import { ITodayLog } from "../../../common/types";
import { db } from "../../../config/firebase-config";
import { AppContext } from "../../../context/AppContext/AppContext";
import ActivityLogButton from "../ActivityLogButton/ActivityLogButton";
import ActivityLogDisplay from "../ActivityLogDisplay/ActivityLogDisplay";

const ActivityLogger: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);

  const [todayLog, setTodayLog] = useState<ITodayLog | null>(null);

  const background = useColorModeValue("brand.white", "brand.grey");

  const today = moment().format("dddd, MMM Do");

  useEffect(() => {
    const todayDate = moment().format("YYYY-MM-DD");

    return onValue(
      ref(db, `logs/${userData!.handle}/${todayDate}`),
      (snapshot) => {
        const data = snapshot.val();
        setTodayLog(data);
      }
    );
  }, []);

  return (
    <VStack w="100%" bg="brand.blue" p={6} alignContent="start" rounded="lg">
      <Box bg="brand.red" p={3} rounded="full" mb={4}>
        <Text fontWeight="bold">{today}</Text>
      </Box>
      <VStack w="100%">
        <VStack w="100%" bg={background} rounded="lg" shadow="lg" p={4}>
          <ActivityLogDisplay todayLog={todayLog} />
          <ActivityLogButton todayLog={todayLog} />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ActivityLogger;
