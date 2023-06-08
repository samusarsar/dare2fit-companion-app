import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Text,
  useColorModeValue,
} from "native-base";
import { FC, ReactElement, useContext, useState } from "react";

import { IFood } from "../../../common/types";
import { AppContext } from "../../../context/AppContext/AppContext";
import { logFood } from "../../../services/food.services";

const SingleFood: FC<{ food: IFood }> = ({ food }): ReactElement => {
  const { userData } = useContext(AppContext);
  const [grams, setGrams] = useState(0);

  const unitBackgroundColor = useColorModeValue("gray.300", "gray.500");

  const calories = Math.floor((food.calories / food.serving_size_g) * grams);

  const handleLogFood = () => {
    logFood(userData!.handle, food.name, calories).then(() => setGrams(0));
  };

  return (
    <Box my={1}>
      <HStack alignItems="center" mb={1}>
        <Heading size="xs">{food.name.toUpperCase()}</Heading>
        <Spacer />
        <Badge colorScheme="green" borderRadius="lg">
          <Text>{calories} kcal</Text>
        </Badge>
      </HStack>

      <InputGroup mb={1}>
        <Input
          keyboardType="numeric"
          w="90%"
          px={2}
          onChangeText={(value) => setGrams(+value || 0)}
          placeholder="gr"
        />
        <InputRightAddon
          backgroundColor={unitBackgroundColor}
          children={"gr"}
        />
      </InputGroup>

      <HStack>
        <Text>serving size:</Text>
        <Spacer />
        <Badge borderRadius="lg" bg={unitBackgroundColor}>
          <Text>{Math.floor(food.serving_size_g)} gr</Text>
        </Badge>
      </HStack>
      <HStack>
        <Text>calories per serving: </Text>
        <Spacer />
        <Badge borderRadius="lg" bg={unitBackgroundColor}>
          <Text>{Math.floor(food.calories)} kcal</Text>
        </Badge>
      </HStack>
      <HStack>
        <Text>carbohydrates: </Text>
        <Spacer />
        <Badge borderRadius="lg" bg={unitBackgroundColor}>
          <Text>{Math.floor(food.carbohydrates_total_g)} gr</Text>
        </Badge>
      </HStack>
      <HStack>
        <Text>protein: </Text>
        <Spacer />
        <Badge borderRadius="lg" bg={unitBackgroundColor}>
          <Text>{Math.floor(food.protein_g)} gr</Text>
        </Badge>
      </HStack>
      <HStack>
        <Text>fat: </Text>
        <Spacer />
        <Badge borderRadius="lg" bg={unitBackgroundColor}>
          <Text>{Math.floor(food.fat_total_g)} gr</Text>
        </Badge>
      </HStack>

      <Button
        mt={1}
        size="sm"
        colorScheme="yellow"
        isDisabled={!grams}
        onPress={handleLogFood}
      >
        Log food
      </Button>
      <Divider marginTop={1} />
    </Box>
  );
};

export default SingleFood;
