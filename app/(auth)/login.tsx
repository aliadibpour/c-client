import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const handleStart = () => {
    if (phone.trim()) {
      router.push({
        pathname: '/(auth)/verify',
        params: { phone },
      });
    }
  };

  const handleGuest = () => {
    router.push('/(setup)/pick-teams');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> خوش اومدی 👋</Text>

      <Text style={styles.subtitle}>
        شمارتو وارد کن کد ارسال میشه به تلگرامت
      </Text>
      <TextInput
        placeholder="شماره موبایل"
        placeholderTextColor="#999"
        keyboardType="number-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      {/* دکمه ورود با تلگرام */}
      <TouchableOpacity onPress={handleStart} style={styles.shadowWrapper}>
        <LinearGradient
          colors={['#0088cc', '#1c9ce6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <FontAwesome5 name="telegram-plane" size={18} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>ورود با تلگرام</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* دکمه مهمان */}
      <TouchableOpacity onPress={handleGuest} style={styles.guestButton}>
        <Text style={styles.guestText}>ورود به عنوان مهمان</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'vazir',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'vazir',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'vazir',
    marginBottom: 20,
  },
  shadowWrapper: {
    width: '100%',
    borderRadius: 10,
    shadowColor: '#0088cc',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'vazir',
  },
  guestButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  guestText: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'vazir',
    textDecorationLine: 'underline',
  },
});
