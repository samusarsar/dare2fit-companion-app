import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import { FC, ReactElement, useContext, useState } from "react";

import { UserRoles } from "../../../common/enums";
import { IFood } from "../../../common/types";
import { AppContext } from "../../../context/AppContext/AppContext";
import { findFood } from "../../../services/food.services";
import SingleFood from "../SingleFood/SingleFood";

const CalorieLogButton: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);

  const [foodName, setFoodName] = useState("");
  const [showLogger, setShowLogger] = useState(false);
  const [suggestedFoods, setSuggestedFoods] = useState<IFood[] | [] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const amBlocked = userData!.role === UserRoles.Blocked;

  const handleSearch = () => {
    setIsLoading(true);
    findFood(foodName)
      .then(setSuggestedFoods)
      .finally(() => setIsLoading(false));
  };

  const handleHide = () => {
    setShowLogger(false);
    setFoodName("");
    setSuggestedFoods(null);
  };

  return (
    <Box>
      {showLogger ? (
        <VStack py={3} w="100%" space={2}>
          <Input
            onChangeText={setFoodName}
            placeholder="search for food by name or water"
          />
          <Button
            w="100%"
            colorScheme="yellow"
            onPress={handleSearch}
            isDisabled={!foodName}
            isLoading={isLoading}
          >
            Search
          </Button>
          <Divider />

          {suggestedFoods &&
            suggestedFoods.length > 0 &&
            suggestedFoods.map((f) => <SingleFood key={f.name} food={f} />)}

          {suggestedFoods && suggestedFoods.length === 0 && (
            <Text>No foods match the search criteria</Text>
          )}

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
        <>
          {amBlocked && (
            <Text textAlign="center" color="brand.red">
              You are blocked and can&apos;t log food and water.
            </Text>
          )}
          <Button
            w="100%"
            colorScheme="yellow"
            onPress={() => setShowLogger(true)}
            isDisabled={amBlocked}
          >
            Log Food & Water
          </Button>
        </>
      )}
    </Box>
  );
};

export default CalorieLogButton;
