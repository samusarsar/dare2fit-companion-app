import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon, useColorModeValue } from "native-base";

import Activity from "../../tabs/Activity/Activity";
import StackNavigation from "../StackNavigation/StackNavigation";

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

            if (route.name === "ProfileScreen") {
              iconName = focused ? "user-circle" : "user-circle-o";
            } else if (route.name === "Activity") {
              iconName = "heartbeat";
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
        <Tab.Screen
          name="ProfileScreen"
          component={StackNavigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Activity" component={Activity} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;