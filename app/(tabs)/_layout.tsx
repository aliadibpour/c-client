import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./";
import LiveMatch from "./live-match";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "live-match") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={(iconName as any)} size={size} color="black" />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="live-match" component={LiveMatch} />
    </Tab.Navigator>
  );
}
