import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import Profile from "./Profile";
import Products from "../../content/screens/Products"

const Tab = createBottomTabNavigator();
const HomeProfile = () => {
  return (
 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { iconName, iconType } = getIconName(route.name, focused);
          return (
            <Icon name={iconName} type={iconType} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "green",
        headerShown: false,
      })}
    >
      
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />
       <Tab.Screen
        name="Products"
        component={Products}
        options={{ title: "Productos" }}
      />
    </Tab.Navigator>
  )
}
const getIconName = (routeName, focused) => {
    let iconName = "";
    let iconType = "material-community";
  
    switch (routeName) {
      case "Products":
        iconName = focused ? "shopping" : "shopping-outline";
        break;
      case "Profile":
        iconName = focused ? "account" : "account-outline";
        break;
    }
    return { iconName, iconType };
  };
export default HomeProfile
