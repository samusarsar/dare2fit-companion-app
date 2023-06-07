import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Activity from "./Activity/Activity";
import Calories from "./Calories/Calories";
import Profile from "./Profile/Profile";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Calories" component={Calories} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
