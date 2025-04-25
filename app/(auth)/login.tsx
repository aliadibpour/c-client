import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    return cleaned.length === 11 && cleaned.startsWith('09');
  };
  const handleStart = async () => {
    if (!phone.trim()) {
      setError('لطفا شماره موبایل را وارد کنید.');
      return;
    }
  
    if (!validatePhone(phone)) {
      setError('شماره موبایل باید ۱۱ رقمی و با 09 شروع شود.');
      return;
    }
  
    setError('');
  
    const formattedPhone = phone.replace(/^0/, '+98');
  
    try {
      const res = await fetch('http://172.26.144.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || 'خطایی در ورود رخ داد');
        return;
      }
  
      // موفقیت! انتقال به صفحه تأیید:
      router.push('/(auth)/verify');
  
    } catch (err) {
      console.error('خطا:', err);
      setError('ارتباط با سرور برقرار نشد.');
    }
  };
  

  const handleGuest = () => {
    router.push('/(setup)/pick-teams');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> خوش اومدی 👋</Text>
      <Text style={styles.subtitle}>
        شمارتو وارد کن، کد ارسال میشه به تلگرامت
      </Text>

      <TextInput
        placeholder="شماره موبایل"
        placeholderTextColor="#999"
        keyboardType="number-pad"
        style={[
          styles.input,
          error ? { borderColor: '#e63946' } : {},
        ]}
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          if (error) setError('');
        }}
        maxLength={11}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    marginBottom: 10,
  },
  errorText: {
    color: '#e63946',
    fontSize: 14,
    fontFamily: 'vazir',
    marginBottom: 10,
    textAlign: 'right',
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
