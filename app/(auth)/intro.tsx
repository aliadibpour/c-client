
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    title: 'ستاره‌های جوان',
    text: 'مجموعه‌ای از بازیکنان خاص ایران و اروپا در دوران جوانی',
    image: require('../../assets/ss.png'),
  },
  {
    key: 'slide2',
    title: 'لحظه‌های تاریخی',
    text: 'تصاویر تاریخی و بامزه از فوتبال دنیا',
    image: require('../../assets/ss.png'),
  },
  {
    key: 'slide3',
    title: 'نتایج خاص',
    text: 'نتایج به‌یادماندنی و جذاب تاریخ فوتبال',
    image: require('../../assets/ss.png'),
  },
];

export default function IntroScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<any>(null);
  const router = useRouter()
  const handleDone = () => {
    router.push("/(auth)/login")
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (currentIndex === slides.length - 1) {
            handleDone();
          } else {
            const nextIndex = currentIndex + 1;
            sliderRef.current?.goToSlide(nextIndex, true);
            setCurrentIndex(nextIndex);
          }
        }}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'شروع' : 'بعدی'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        showSkipButton={false}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={{ backgroundColor: '#ccc' }}
        activeDotStyle={{ backgroundColor: '#007AFF' }}
        onSlideChange={(newIndex) => {
          if (newIndex < currentIndex) {
            // Prevent going back
            sliderRef.current?.goToSlide(currentIndex, false);
          } else {
            setCurrentIndex(newIndex);
          }
        }}
      />
      <View 
        style={styles.buttonContainer} 
        >
          {renderButton()}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 40,
    height: 300,
    borderRadius: 12,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#222',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#444',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    margin:"auto"
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width:"100%",
  },
});
