import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function VerifyScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>کد تأیید رو وارد کن</Text>
      <Button title="تأیید و ورود" onPress={() => router.push("/(setup)/pick-teams")} />
    </View>
  );
}
