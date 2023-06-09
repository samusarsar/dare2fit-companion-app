// eslint-disable-next-line max-len
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { FC, ReactElement, useContext, useEffect, useState } from "react";

import { Units, UserRoles } from "../../../common/enums";
import { getEnumValue } from "../../../common/helper";
import { ITodayLog, IWorkout } from "../../../common/types";
import { AppContext } from "../../../context/AppContext/AppContext";
import { logActivity } from "../../../services/activity.services";
import { getWorkoutsByHandle } from "../../../services/workout.services";

const ActivityLogButton: FC<{ todayLog: ITodayLog | null }> = ({
  todayLog,
}): ReactElement => {
  const { userData } = useContext(AppContext);

  const [activityType, setActivityType] = useState<string>("");
  const [loggedValue, setLoggedValue] = useState<string | number | null>(null);
  const [userWorkouts, setUserWorkouts] = useState<IWorkout[] | []>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);
  const [trainingWith, setTrainingWith] = useState<string>("");

  const [showLogger, setShowLogger] = useState(false);

  const unitBackgroundColor = useColorModeValue("gray.300", "gray.500");

  const units = activityType ? getEnumValue(Units, activityType) : null;

  const userWorkoutOptions =
    activityType === "workout"
      ? userWorkouts
      : userWorkouts.filter((workout) => workout.category === activityType);

  const savedWorkoutOptions =
    activityType === "workout"
      ? savedWorkouts
      : savedWorkouts.filter((workout) => workout.category === activityType);

  const userFriends = userData!.friends ? Object.keys(userData!.friends) : null;

  const workoutIsLogged = todayLog
    ? Object.keys(todayLog).includes("workout")
    : false;

  const amBlocked = userData!.role === UserRoles.Blocked;

  const handleLog = () => {
    if (!!activityType && !!loggedValue) {
      logActivity({ handle: userData!.handle, activityType, loggedValue });

      if (trainingWith.length > 0) {
        logActivity({ handle: trainingWith, activityType, loggedValue });
      }

      setShowLogger(false);
      setActivityType("");
      setLoggedValue(null);
      setTrainingWith("");
    }
  };

  const handleHide = () => {
    setShowLogger(false);
    setActivityType("");
    setLoggedValue(null);
    setTrainingWith("");
  };

  useEffect(() => {
    getWorkoutsByHandle(userData!.handle)
      .then((resultArr) => {
        setUserWorkouts(
          resultArr.filter((workout) => workout.author === userData!.handle)
        );
        setSavedWorkouts(
          resultArr.filter((workout) => workout.author !== userData!.handle)
        );
      })
      .catch(() => {
        setUserWorkouts([]);
        setSavedWorkouts([]);
      });
  }, []);

  return (
    <Box>
      {console.log(savedWorkoutOptions)}
      {showLogger && (
        <VStack py={3} w="100%" space={2}>
          <Select
            minW="100%"
            placeholder="Select activity"
            selectedValue={activityType}
            onValueChange={(e) => setActivityType(e)}
          >
            <Select.Item value="lifestyle" label="Lifestyle Sports" disabled />
            <Select.Item value="walking" label="Walking" />
            <Select.Item value="running" label="Running" />
            <Select.Item value="cycling" label="Cycling" />
            <Select.Item value="swimming" label="Swimming" />
            {!workoutIsLogged && (
              <Select.Item value="fitness" label="Workouts" disabled />
            )}
            {!workoutIsLogged && (
              <Select.Item value="workout" label="Any Workout" />
            )}
            {!workoutIsLogged && (
              <Select.Item value="strength" label="Strength" />
            )}
            {!workoutIsLogged && (
              <Select.Item value="stamina" label="Stamina" />
            )}
            {!workoutIsLogged && (
              <Select.Item value="stretching" label="Stretching" />
            )}
          </Select>
          {activityType && units === "workouts" ? (
            <Select
              placeholder="Select workout"
              selectedValue={(loggedValue as string | null) || ""}
              onValueChange={(e) => setLoggedValue(e)}
            >
              <Select.Item value="my" label="My Workouts" disabled />
              {userWorkoutOptions.map((workout) => (
                <Select.Item
                  key={workout.workoutId}
                  value={`${workout.workoutName}_${workout.category}_${workout.workoutId}`}
                  label={workout.workoutName}
                />
              ))}
              <Select.Item value="saved" label="Saved Workouts" disabled />
                {savedWorkoutOptions.map((workout) => (
                  <Select.Item
                    key={workout.workoutId}
                    value={`${workout.workoutName}_${workout.category}_${workout.workoutId}`}
                    label={workout.workoutName}
                  />
                ))}
            </Select>
          ) : (
            <>
              {units && (
                <Input
                  h="32px"
                  keyboardType="numeric"
                  InputRightElement={
                    <VStack
                      h="100%"
                      px={2}
                      backgroundColor={unitBackgroundColor}
                      justifyContent="center"
                    >
                      <Text>{units}</Text>
                    </VStack>
                  }
                  onChangeText={(e) => setLoggedValue(+e)}
                />
              )}
            </>
          )}
          {userFriends && activityType && (
            <Select
              placeholder="Add friend to activity"
              selectedValue={trainingWith}
              onValueChange={(e) => setTrainingWith(e)}
            >
              <Select.Item value="friends" label="Friends" disabled />
              {userFriends.map((friend) => (
                <Select.Item key={friend} value={friend} label={friend} />
              ))}
            </Select>
          )}
        </VStack>
      )}
      {amBlocked && (
        <Text textAlign="center" color="brand.red">
          You are blocked and can&apos;t log activities.
        </Text>
      )}
      {!showLogger ? (
        <Button
          w="100%"
          isDisabled={amBlocked}
          colorScheme="yellow"
          onPress={() => setShowLogger(true)}
        >
          Log Activity
        </Button>
      ) : (
        <Button.Group isAttached>
          <Button
            isDisabled={
              amBlocked ||
              !(
                activityType &&
                loggedValue &&
                (typeof loggedValue === "number" ? loggedValue > 0 : true)
              )
            }
            colorScheme="yellow"
            w="80%"
            onPress={handleLog}
          >
            Log Activity
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
      )}
    </Box>
  );
};

export default ActivityLogButton;
