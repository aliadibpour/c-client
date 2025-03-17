import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from ".";
import LiveMatch from "./live-match";
import Profile from "./profile";
import Telegram from "./telegram";
import { HouseIcon, TelegramIcon, ProfileIcon, LiveScoreIcon } from "@/shared/icons";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#141414",
          paddingTop: 5,
          height: 60,
          borderTopWidth:0,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <HouseIcon color={focused ? "white" : "gray"} size={29} />
          )
        }} 
      />
      <Tab.Screen 
        name="telegram" 
        component={Telegram} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TelegramIcon color={focused ? "white" : "gray"} size={29} />
          )
        }} 
      />
      <Tab.Screen 
        name="live-match" 
        component={LiveMatch} 
        options={{
          tabBarIcon: ({ focused }) => (
            <LiveScoreIcon color={focused ? "white" : "gray"} size={29} />
          )
        }} 
      />
      <Tab.Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon color={focused ? "white" : "gray"} size={29} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}
