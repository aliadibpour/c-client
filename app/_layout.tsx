import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'vazir': require('./../assets/fonts/vazir-font-v16.1.0/Vazir.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  const MyDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#0d0d0d",
      text: "#eef0ed",
      color: "white"
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={MyDarkTheme}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.contentWrapper}>
              <Slot />
            </View>
            <StatusBar />
          </View>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    maxWidth: 1000,
  },
});
