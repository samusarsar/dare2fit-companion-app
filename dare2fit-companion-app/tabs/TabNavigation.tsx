import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, useColorModeValue } from "native-base";

import Activity from "./Activity/Activity";
import Calories from "./Calories/Calories";
import Profile from "./Profile/Profile";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const backgroundColor = useColorModeValue("white", "black");
  const contrastColor = useColorModeValue("black", "white");
  const activeColor = useColorModeValue("purple", "plum");

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Activity"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            const currColor = focused ? "brand.purple" : contrastColor;
            let iconName;

            if (route.name === "Profile") {
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
          tabBarStyle: { backgroundColor },
          headerStyle: { backgroundColor },
          headerTintColor: contrastColor,
        })}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Calories" component={Calories} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
