import { Box, Button, Divider, IconButton, Input, ScrollView, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";

import { IFood } from "../../../common/types";
import { findFood } from "../../../services/food.services";
import SingleFood from "../SingleFood/SingleFood";

const CalorieLogButton: FC = () => {
  const [foodName, setFoodName] = useState("");
  const [showLogger, setShowLogger] = useState(false);
  const [suggestedFoods, setSuggestedFoods] = useState<IFood[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const handleSearch = () => {
    setIsLoading(true);
    findFood(foodName)
      .then(setSuggestedFoods)
      .finally(() => setIsLoading(false));
  };

  const handleHide = () => {
    setShowLogger(false);
    setFoodName("");
    setSuggestedFoods([]);
  };

  return (
    <Box>
      {showLogger ? (
        <VStack py={3} w="100%" space={2}>
          <Input
            onChangeText={setFoodName}
            placeholder="search for food by name"
          />
          <Button
            w="100%"
            colorScheme="yellow"
            onPress={handleSearch}
            isDisabled={!foodName}
            isLoading={isLoading}
          >
            Search Food
          </Button>
          <Divider />
          {suggestedFoods.map((f) => (
            <SingleFood key={f.name} food={f} />
          ))}
          <Button.Group isAttached>
            <Button colorScheme="yellow" w="80%" onPress={handleHide}>
              Hide
            </Button>
            <IconButton
              variant="solid"
              size="sm"
              w="20%"
              _icon={{ as: Ionicons, name: "caret-up-outline" }}
              colorScheme="gray"
              aria-label="remove activity"
              onPress={handleHide}
            />
          </Button.Group>
        </VStack>
      ) : (
        <Button
          w="100%"
          colorScheme="yellow"
          onPress={() => setShowLogger(true)}
        >
          Log Food
        </Button>
      )}
    </Box>
  );
};

export default CalorieLogButton;
