import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Platform,
  findNodeHandle,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { io } from "socket.io-client";
import MatchItem from "@/components/live-match/MatchItem";
import MatchDays from "@/components/live-match/MatchDays";
import MatchSkeleton from "@/components/live-match/MatchSkeleton";

const { width } = Dimensions.get("window");

const socket = io("http://192.168.1.104:3000/");
export default function LiveMatch() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const panRef = useRef(null);
  const { day } = useGlobalSearchParams();
  const currentDay = parseInt(Array.isArray(day) ? day[0] : day || "2", 10);
  const [matchList, setMatchList] = useState<any[]>([]);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MatchDays />
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleSwipeEnd}
          waitFor={flatListRef}
          simultaneousHandlers={flatListRef}
        >
          <Animated.View
            style={[
              styles.animatedView,
              { transform: [{ translateX }], flex: 1 },
            ]}
          >
            {matchList.length ? (
              <FlatList
                ref={flatListRef}
                nativeID="flatList"
                data={matchList}
                keyExtractor={(item, index) => `${item.league}-${index}`}
                renderItem={({ item }) => <MatchItem matchList={item} />}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
              />
            ) : (
              <Text className="text-white text-center mt-4">
                <MatchSkeleton />
              </Text>
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  animatedView: {
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});
