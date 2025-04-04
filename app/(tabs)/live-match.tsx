import React, { useEffect, useState } from "react";
import { Animated, Text, StyleSheet, View, Dimensions } from "react-native";
import { PanGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
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
    translateX.setValue(0);
    socket.emit("live-match", currentDay, (response: any) => {
      setMatchList(response.matchList);
    });
  }, [currentDay]);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const handleSwipeEnd = (event: any) => {
    const translationX = event.nativeEvent.translationX;
    let nextDay = currentDay;

    if (translationX > 80 && currentDay < 6) {
      nextDay = currentDay + 1;
    } else if (translationX < -80 && currentDay > 0) {
      nextDay = currentDay - 1;
    }

    if (nextDay !== currentDay) {
      Animated.timing(translateX, {
        toValue: translationX > 0 ? width : -width,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        translateX.setValue(0);
        router.push(`/live-match?day=${nextDay}`);
      });
    } else {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <MatchDays className="w-full h-14" />
        <PanGestureHandler onGestureEvent={handleGestureEvent} onHandlerStateChange={handleSwipeEnd}>
          <Animated.View style={[styles.animatedView, { transform: [{ translateX }] }]}>
            {matchList.length ? (
              matchList.map((match: any) => <MatchItem matchList={match} key={match.league} />)
            ) : (
              <Text className="text-white text-center mt-4">Loading...</Text>
            )}
          </Animated.View>
        </PanGestureHandler>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    width: "100%",
  },
});
