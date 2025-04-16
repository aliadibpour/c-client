import { Slot, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      setIsAuth(!!jwt);
    };

    checkAuth();
  }, []);

  if (isAuth === null) return null;

  if (isAuth) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}
