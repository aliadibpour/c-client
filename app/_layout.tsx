import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  const MyDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#171717",
      text: "#eef0ed",
    },
  };

  return (
    <ThemeProvider value={MyDarkTheme}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.contentWrapper} className=" max-w-screen-lg text-white">
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
  },
});
