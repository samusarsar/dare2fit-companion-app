import { Ionicons } from "@expo/vector-icons";
import { Badge, Box, HStack, IconButton, Text, VStack } from "native-base";
import { FC, useContext } from "react";

import { ITodayLog } from "../../../common/types";
import { AppContext } from "../../../context/AppContext/AppContext";
import { unlogActivity } from "../../../services/activity.services";

const ActivityLogDisplay: FC<{ todayLog: ITodayLog | null }> = ({
  todayLog,
}) => {
  const { userData } = useContext(AppContext);

  const workoutIsLogged = todayLog
    ? Object.keys(todayLog).includes("workout")
    : false;

  const walkingIsLogged = todayLog
    ? Object.keys(todayLog).includes("walking")
    : false;

  const runningIsLogged = todayLog
    ? Object.keys(todayLog).includes("running")
    : false;

  const cyclingIsLogged = todayLog
    ? Object.keys(todayLog).includes("cycling")
    : false;

  const swimmingIsLogged = todayLog
    ? Object.keys(todayLog).includes("swimming")
    : false;

  const handleUnlog = (activityType: string) => {
    unlogActivity({ handle: userData!.handle, activityType });
  };

  if (todayLog) {
    return (
      <VStack alignItems="flex-start" pb={2} px={8}>
        {!!workoutIsLogged && (
          <Box w="100%" px={{ base: 0, md: 4 }} py={2}>
            <Badge colorScheme="pink" p={2} rounded="full">
              Workout:
            </Badge>
            <HStack w="100%" justifyContent="center" pt={2}>
              <Text fontSize="md">{todayLog.workout?.name}</Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog("workout")}
              />
            </HStack>
          </Box>
        )}
        {!!walkingIsLogged && (
          <Box w="100%" px={{ base: 0, md: 4 }} py={4}>
            <Badge colorScheme="teal" p={2} rounded="full">
              Walking:
            </Badge>
            <HStack
              w="100%"
              alignItems="center"
              justifyContent="space-evenly"
              pt={2}
            >
              <Text fontSize="md">{todayLog.walking} steps</Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog("walking")}
              />
            </HStack>
          </Box>
        )}
        {!!runningIsLogged && (
          <Box w="100%" px={{ base: 0, md: 4 }} py={4}>
            <Badge colorScheme="purple" p={2} rounded="full">
              Running:
            </Badge>
            <HStack
              w="100%"
              alignItems="center"
              justifyContent="space-evenly"
              pt={2}
            >
              <Text fontSize="md">{todayLog.running} km</Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog("running")}
              />
            </HStack>
          </Box>
        )}
        {!!cyclingIsLogged && (
          <Box w="100%" px={{ base: 0, md: 4 }} py={4}>
            <Badge colorScheme="orange" p={2} rounded="full">
              Cycling:
            </Badge>
            <HStack
              w="100%"
              alignItems="center"
              justifyContent="space-evenly"
              pt={2}
            >
              <Text fontSize="md">{todayLog.cycling} km</Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog("cycling")}
              />
            </HStack>
          </Box>
        )}
        {!!swimmingIsLogged && (
          <Box w="100%" px={{ base: 0, md: 4 }} py={4}>
            <Badge colorScheme="blue" p={2} rounded="full">
              Swimming:
            </Badge>
            <HStack
              w="100%"
              alignItems="center"
              justifyContent="space-evenly"
              pt={2}
            >
              <Text fontSize="md">{todayLog.swimming} m</Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog("swimming")}
              />
            </HStack>
          </Box>
        )}
      </VStack>
    );
  }

  return null;
};

export default ActivityLogDisplay;
