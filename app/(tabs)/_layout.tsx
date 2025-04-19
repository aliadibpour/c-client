import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Platform, StyleSheet } from "react-native";
import HomeScreen from ".";
import LiveMatch from "./live-match";
import Profile from "./profile";
import Telegram from "./telegram";
import Comments from "./comments";
import { HouseIcon, TelegramIcon, ProfileIcon, FootballPitchIcon, CommentsIcon } from "@/shared/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const iconSize = Platform.select({
    web: 22,
    default: 22,
  });
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      setIsAuth(!!jwt);
    };

    checkAuth();
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) {
    return (
      Platform.OS == "web" ? <Redirect href="/(auth)/login" /> : 
      <Redirect href="/(auth)/intro" />
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <HouseIcon size={iconSize} outline={!focused} />
              <Text style={[styles.iconText, focused && styles.activeText]}>خانه</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="comments" 
        component={Comments} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <CommentsIcon size={iconSize} outline={!focused} />
              <Text style={[styles.iconText, focused && styles.activeText]}>نظرات</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="telegram" 
        component={Telegram} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <TelegramIcon size={iconSize} outline={!focused} />
              <Text style={[styles.iconText, focused && styles.activeText]}>تلگرام</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="live-match" 
        component={LiveMatch} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FootballPitchIcon size={iconSize} outline={focused} />
              <Text style={[styles.iconText, focused && styles.activeText]}>بازی ها</Text>
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <ProfileIcon size={iconSize} outline={!focused} />
              <Text style={[styles.iconText, focused && styles.activeText]}>پروفایل</Text>
            </View>
          )
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#101010",
    paddingTop: Platform.select({ web: 4, default: 12 }),
    paddingBottom: Platform.select({ web: 4, default: 8 }),
    height: Platform.select({ web: 60, default: 60 }),
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 64,
  },
  iconText: {
    fontSize: 10,
    marginTop: 6,
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "vazir",
  },
  activeText: {
    color: "#ffffff",
  },
});