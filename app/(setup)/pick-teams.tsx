import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function IntroScreen() {
  const router = useRouter();
  useEffect(() =>{console.log(AsyncStorage.getItem("jwt"))},[])
  return (
    <View>
      <Text>خوش اومدی!</Text>
      <Button title="seklect-teams" onPress={() => router.push("/(tabs)")} />
    </View>
  );
}
