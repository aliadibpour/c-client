// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import "../global.css";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StyleSheet, View } from 'react-native';
// import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from 'react';
// import { useFonts } from 'expo-font';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const MyDarkTheme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       background: "#101010",
//       text: "#eef0ed",
//       color:"white"
//     },
//   };

//   const [loaded, error] = useFonts({
//     'vazir': require('./../assests/fonts/vazir-font-v16.1.0/Vazir.ttf'),
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ThemeProvider value={MyDarkTheme}>
//         <SafeAreaView style={styles.safeArea}>
//           <View style={styles.container}>
//             <View style={styles.contentWrapper}>
//               <Stack
//                 screenOptions={{
//                   contentStyle: { 
//                     backgroundColor: MyDarkTheme.colors.background,
//                     //direction: "rtl"
//                   }
//                 }}
//               >
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                 <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//                 <Stack.Screen name="+not-found" />
//               </Stack>
//             </View>
//             <StatusBar />
//           </View>
//         </SafeAreaView>
//       </ThemeProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#101010",
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   contentWrapper: {
//     flex: 1,
//     width: "100%",
//     alignSelf: "center",
//     maxWidth: 1000,
//   },
// });

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = still loading
  const [loaded, error] = useFonts({
    'vazir': require('./../assests/fonts/vazir-font-v16.1.0/Vazir.ttf'),
  });

  const MyDarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#101010",
      text: "#eef0ed",
      color: "white"
    },
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt");
        setIsAuth(!!token);
      } catch (e) {
        console.error("Failed to load JWT", e);
        setIsAuth(false);
      } finally {
        if (loaded || error) {
          SplashScreen.hideAsync();
        }
      }
    };

    prepare();
  }, [loaded, error]);

  if (!loaded || isAuth === null) {
    return null; // Wait for both font and JWT check
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={MyDarkTheme}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.contentWrapper}>
              <Stack
                screenOptions={{
                  contentStyle: {
                    backgroundColor: MyDarkTheme.colors.background,
                  }
                }}
              >
                {isAuth ? (
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                ) : (
                  <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                )}
                <Stack.Screen name="+not-found" />
              </Stack>
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
    backgroundColor: "#101010",
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
