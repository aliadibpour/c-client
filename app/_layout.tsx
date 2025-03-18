import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
SplashScreen.preventAutoHideAsync();//load font before mount component

export default function RootLayout() {
  const MyDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#141414",
      text: "#eef0ed"
    },
  };

  const [loaded, error] = useFonts({
    'vazir': require('./../assests/fonts/vazir-font-v16.1.0/Vazir.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={MyDarkTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentWrapper} className=" max-w-screen-lg text-white font-vazir">
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: MyDarkTheme.colors.background },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </View>
          <StatusBar />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#141414",
    direction: "rtl"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    direction: "rtl"
  },
  contentWrapper: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    direction: "rtl"
  },
});
