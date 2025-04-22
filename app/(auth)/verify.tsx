import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  I18nManager,
  useWindowDimensions,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Ionicons } from '@expo/vector-icons';

I18nManager.forceRTL(true);

const CELL_COUNT = 5;

export default function VerifyScreen() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resendAvailable, setResendAvailable] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const router = useRouter();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendAvailable(true);
    }
  }, [timer]);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (value === '123456') {
        router.push('/(setup)/pick-teams');
      } else {
        alert('کد اشتباهه!');
      }
    }, 1200);
  };

  const handleResend = () => {
    setValue('');
    setResendAvailable(false);
    setTimer(60);
    alert('کد دوباره ارسال شد!');
  };

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.08 }]}>
      {/* دکمه بازگشت */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>کد تأیید رو وارد کن</Text>

      {/* فیلد کد تأیید */}
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      {/* دکمه تأیید */}
      <TouchableOpacity
        style={[styles.button, { opacity: value.length === 5 ? 1 : 0.5 }]}
        disabled={value.length !== 5 || loading}
        onPress={handleVerify}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>تأیید و ورود</Text>
        )}
      </TouchableOpacity>

      {/* تایمر یا دکمه ارسال دوباره */}
      <View style={styles.resendWrapper}>
        {resendAvailable ? (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>ارسال دوباره کد</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timerText}>ارسال دوباره کد در {timer} ثانیه</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'right',
    fontWeight: '600',
    marginBottom: 32,
    color: '#fff',
    fontFamily: 'vazir',
  },
  codeFieldRoot: {
    marginBottom: 30,
    justifyContent: 'space-between',
    flexDirection: 'row', // شروع از چپ
  },
  cell: {
    width: 44,
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'vazir',
  },
  focusCell: {
    borderColor: '#1E90FF',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'vazir',
  },
  resendWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    color: '#1E90FF',
    fontSize: 16,
    fontFamily: 'vazir',
  },
  timerText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'vazir',
  },
});
