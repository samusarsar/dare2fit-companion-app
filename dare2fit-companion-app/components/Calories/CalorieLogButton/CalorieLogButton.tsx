import { Button, Divider, Input, ScrollView, VStack } from "native-base";
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
    <ScrollView>
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
          <Button w="100%" colorScheme="yellow" onPress={handleHide}>
            Hide
          </Button>
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
    </ScrollView>
  );
};

export default CalorieLogButton;
