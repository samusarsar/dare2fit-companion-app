import { Ionicons } from "@expo/vector-icons";
import { Badge, Box, HStack, IconButton, Text, VStack } from "native-base";
import { FC, useContext } from "react";

import { badgeColorScheme } from "../../../common/constants";
import { AppContext } from "../../../context/AppContext/AppContext";
import { unlogFood } from "../../../services/food.services";

const CalorieLogDisplay: FC<{ calorieLog: { [key: string]: number } }> = ({
  calorieLog,
}) => {
  const { userData } = useContext(AppContext);

  const handleUnlog = (foodName: string) => {
    unlogFood(userData!.handle, foodName);
  };

  if (calorieLog) {
    return (
      <VStack alignItems="flex-start" px={8}>
        {Object.entries(calorieLog).map((foodEntry, index) => (
          <Box key={foodEntry[0]} w="100%" px={{ base: 0, md: 4 }} py={4}>
            <Badge
              colorScheme={badgeColorScheme[index % badgeColorScheme.length]}
              p={2}
              rounded="full"
            >
              {foodEntry[0] + ":"}
            </Badge>
            <HStack
              w="100%"
              alignItems="center"
              justifyContent="space-evenly"
              pt={2}
            >
              <Text fontSize="md" w="40%">
                {foodEntry[1]} kcal
              </Text>
              <IconButton
                size="xs"
                variant="solid"
                _icon={{ as: Ionicons, name: "remove-outline" }}
                colorScheme="red"
                aria-label="remove activity"
                onPress={() => handleUnlog(foodEntry[0])}
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    );
  }

  return null;
};

export default CalorieLogDisplay;
