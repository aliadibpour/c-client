import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View, Platform } from "react-native";
import HomeScreen from ".";
import LiveMatch from "./live-match";
import Profile from "./profile";
import Telegram from "./telegram";
import Comments from "./comments";
import { HouseIcon, TelegramIcon, ProfileIcon, FootballPitchIcon, CommentsIcon } from "@/shared/icons";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const iconSize = Platform.select({
    web: 19,
    default: 19,
  });

  const textSize = Platform.select({
    web: "text-[11px]",
    default: "text-[11px]",
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#141414",
          paddingTop: Platform.select({
            web: 4,
            default: 8,
          }),
          paddingBottom: Platform.select({
            web: 4,
            default: 8,
          }),
          height: Platform.select({
            web: 60,
            default: 60,
          }),
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-16">
              <HouseIcon size={iconSize} outline={!focused} />
              <Text className={`${textSize} mt-1.5 font-vazir ${focused ? 'text-white' : 'text-white/40'}`}>خانه</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="comments" 
        component={Comments} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-16">
              <CommentsIcon size={iconSize} outline={!focused} />
              <Text className={`${textSize} mt-1.5 font-vazir ${focused ? 'text-white' : 'text-white/40'}`}>نظرات</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="telegram" 
        component={Telegram} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-16">
              <TelegramIcon size={iconSize} outline={!focused} />
              <Text className={`${textSize} mt-1.5 font-vazir ${focused ? 'text-white' : 'text-white/40'}`}>تلگرام</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="live-match" 
        component={LiveMatch} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center w-16">
              <FootballPitchIcon size={iconSize} outline={focused} />
              <Text className={`${textSize} mt-1.5 font-vazir ${focused ? 'text-white' : 'text-white/40'}`}>زنده</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center  w-16">
              <ProfileIcon size={iconSize} outline={!focused} />
              <Text className={`${textSize} mt-1.5 font-vazir ${focused ? 'text-white' : 'text-white/40'}`}>پروفایل</Text>
            </View>
          )
        }} 
      />
    </Tab.Navigator>
  );
}