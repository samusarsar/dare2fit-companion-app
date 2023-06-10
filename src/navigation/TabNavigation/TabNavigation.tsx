import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, StatusBar, useColorModeValue } from "native-base";
import { FC, ReactElement, useContext } from "react";

import { AppContext } from "../../context/AppContext/AppContext";
import Activity from "../../tabs/Activity/Activity";
import Calories from "../../tabs/Calories/Calories";
import LogIn from "../../tabs/LogIn/LogIn";
import SignUp from "../../tabs/SignUp/SignUp";
import StackNavigation from "../StackNavigation/StackNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);

  const notifications =
    userData && userData!.notifications
      ? Object.entries(userData!.notifications)
      : null;

  const tabsDisplay = userData ? undefined : "none";

  const backgroundColor = useColorModeValue("white", "black");
  const statusTextColor = useColorModeValue("dark-content", "light-content");
  const contrastColor = useColorModeValue("black", "white");
  const activeColor = useColorModeValue("purple", "plum");

  return (
    <>
      <StatusBar barStyle={statusTextColor} />
      <Tab.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            const currColor = focused ? "brand.purple" : contrastColor;
            let iconName;

            if (route.name === "ProfileScreen") {
              iconName = focused ? "user-circle" : "user-circle-o";
            } else if (route.name === "Activity") {
              iconName = "heartbeat";
            } else if (route.name === "Calories") {
              iconName = "cutlery";
            }

            return (
              <Icon
                as={FontAwesome}
                name={iconName}
                size={size}
                color={currColor}
              />
            );
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: contrastColor,
          tabBarStyle: { backgroundColor, display: tabsDisplay },
          headerStyle: { backgroundColor },
          headerTintColor: contrastColor,
        })}
      >
        {userData ? (
          <>
            <Tab.Screen
              name="ProfileScreen"
              component={StackNavigation}
              options={{
                headerShown: false,
                tabBarBadge: notifications ? notifications.length : undefined,
                tabBarLabel: "Profile",
              }}
            />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="Calories" component={Calories} />
          </>
        ) : (
          <>
            <Tab.Screen
              name="LogIn"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
