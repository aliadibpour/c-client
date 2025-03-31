import React, { useEffect, useState } from "react";
import { Animated, Text, StyleSheet, View, Dimensions } from "react-native";
import { PanGestureHandler, GestureHandlerRootView, State } from "react-native-gesture-handler";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { io } from "socket.io-client";
import MatchItem from "@/components/live-match/MatchItem";
import MatchDays from "@/components/live-match/MatchDays";

const { width } = Dimensions.get("window");
const socket = io("http://172.22.32.1:3000/");

export default function LiveMatch() {
  const router = useRouter();
  const { day } = useGlobalSearchParams();
  const currentDay = parseInt(Array.isArray(day) ? day[0] : day || "2", 10);

  const [matchList, setMatchList] = useState<any>([]);
  const translateX = useState(new Animated.Value(0))[0];

  useEffect(() => {
    translateX.setValue(0); // مقدار اولیه را ریست می‌کنیم
    socket.emit("live-match", currentDay, (response: any) => {
      setMatchList(response.matchList);
    });
  }, [currentDay]);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const handleSwipeEnd = (event: any) => {
    const translationX = event.nativeEvent.translationX;
    let nextDay = currentDay;

    if (translationX > 50 && currentDay > 0) {
      // حرکت به راست (روز قبل)
      nextDay = currentDay - 1;
    } else if (translationX < -50 && currentDay < 6) {
      // حرکت به چپ (روز بعد)
      nextDay = currentDay + 1;
    }

    if (nextDay !== currentDay) {
      Animated.timing(translateX, {
        toValue: translationX > 0 ? width : -width,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        translateX.setValue(0); // قبل از تغییر صفحه مقدار را ریست می‌کنیم
        router.push(`/live-match?day=${nextDay}`);
      });
    } else {
      // اگر حرکت کافی نبود، به جای اول برگردد
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MatchDays />
      <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleSwipeEnd}>
        <Animated.View style={[styles.animatedView, { transform: [{ translateX }] }]}>
          {matchList.length ? (
            matchList.map((match: any) => <MatchItem matchList={match} key={match.league} />)
          ) : (
            <Text>Loading...</Text>
          )}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    width: "100%",
  },
});
