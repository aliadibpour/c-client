import { Slot, Redirect } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, ToastAndroid } from 'react-native';

export default function AuthLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [authRoute, setAuthRoute] = useState<"/" | "login" | "verify">("/");
  const backPressCount = useRef(0);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await AsyncStorage.getItem("auth-status");
      if (authStatus) {
        const parsed = JSON.parse(authStatus);
        setIsAuth(parsed.register);
        setAuthRoute(parsed.route || "/");
      } else {
        setIsAuth(false);
        setAuthRoute("/");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (backPressCount.current === 0) {
        ToastAndroid.show("برای خروج دوباره بازگشت را بزنید", ToastAndroid.SHORT);
        backPressCount.current = 1;
        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000);
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (isAuth === null) {
    return null;
  }

  if (isAuth) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}
