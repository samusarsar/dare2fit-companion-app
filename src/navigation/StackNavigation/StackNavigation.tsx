import { createStackNavigator } from "@react-navigation/stack";
import { useColorModeValue } from "native-base";
import { FC, ReactElement } from "react";

import Notifications from "../../stack/Notifications/Notifications";
import Profile from "../../tabs/Profile/Profile";

const Stack = createStackNavigator();

const StackNavigation: FC = (): ReactElement => {
  const backgroundColor = useColorModeValue("white", "black");
  const contrastColor = useColorModeValue("black", "white");

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor },
        headerTintColor: contrastColor,
      })}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
