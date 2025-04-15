import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>ورود با تلگرام</Text>
      <Button title="ارسال کد" onPress={() => router.push('./verify')} />
    </View>
  );
}
