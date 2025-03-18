import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from ".";
import LiveMatch from "./live-match";
import Profile from "./profile";
import Telegram from "./telegram";
import Comments from "./comments";
import { HouseIcon, TelegramIcon, ProfileIcon, FootballPitchIcon, CommentsIcon } from "@/shared/icons";

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
            <HouseIcon size={21} outline={!focused} />
          )
        }} 
      />
      <Tab.Screen 
        name="telegram" 
        component={Telegram} 
        options={{
          tabBarIcon: ({ focused }) => (
            <TelegramIcon size={21} outline={!focused} />
          )
        }} 
      />
      <Tab.Screen 
        name="live-match" 
        component={LiveMatch} 
        options={{
          tabBarIcon: ({ focused }) => (
            <FootballPitchIcon size={21} />
          )
        }} 
      />
      <Tab.Screen 
        name="comments" 
        component={Comments} 
        options={{
          tabBarIcon: ({ focused }) => (
            <CommentsIcon size={21} outline={!focused} />
          )
        }} 
      />
      <Tab.Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon size={21} outline={!focused} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}
