import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function VerifyScreen() {
  const [verificationCode, setVerificationCode] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    // Assuming you have a function to verify the code before proceeding
    if (verificationCode === '123456') { // Replace this with actual verification logic
      router.push("/(setup)/pick-teams");
    } else {
      alert("کد تأیید اشتباه است. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>کد تأیید رو وارد کن</Text>
      <TextInput
        style={styles.input}
        placeholder="کد تأیید"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <Button title="تأیید و ورود" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 4,
  },
});
