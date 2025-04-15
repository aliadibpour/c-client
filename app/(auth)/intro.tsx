import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>خوش اومدی!</Text>
      <Button title="شروع" onPress={() => router.push("./login")} />
    </View>
  );
}
