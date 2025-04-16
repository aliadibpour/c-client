import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
  Dimensions,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { dateDiplayFormat, dateFormat } from "@/shared/helpers";

const screenWidth = Dimensions.get("window").width;
const TOTAL_DAYS = 9;
const DEFAULT_INDEX = 2;

const MatchDays = () => {
  const today = {
    weekDay: dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "weekDay" }),
    dayNumber: dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "d" })
  }
  const tomorrow = {
    weekDay: dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "weekDay" }),
    dayNumber: dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "d" })
  }
  const yesterday = {
    weekDay: dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "weekDay" }),
    dayNumber: dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "d" })
  }

  const [days, setDays] = useState<any[]>([]);
  const router = useRouter();
  const { day } = useGlobalSearchParams();
  const [selectedDay, setSelectedDay] = useState<number>(+day || DEFAULT_INDEX);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const d: any[] = [];
    for (let i = -2; i < TOTAL_DAYS; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i - DEFAULT_INDEX);
      d.push({
        weekday: dateDiplayFormat({ date: dateFormat(date), locale: "fa", format: "weekDay" }),
        dayNumber: dateDiplayFormat({ date: dateFormat(date), locale: "fa", format: "d" }),
      });
    }
    setDays(d);
    console.log(d);
    
  }, []);

  useEffect(() => {
    if (day) {
      const newIndex = +day;
      setSelectedDay(newIndex);
      scrollViewRef.current?.scrollTo({
        x: newIndex * -95 - screenWidth / 2 - 47,
        animated: true,
      });
    }
  }, [day]);

  return (
    <View className="py-3">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          direction:"rtl",
          margin:"auto"
        }}
      >
        {days.map((d, index) => {
          const label =
            d.weekday === today.weekDay
              ? "امروز"
              : d.weekday === yesterday.weekDay
              ? "دیروز"
              : d.weekday === tomorrow.weekDay
              ? "فردا"
              : d.weekday;

          return (
            <TouchableOpacity
              key={d.date}
              onPress={() => {
                router.push({ pathname: "/live-match", params: { day: index.toString() } });
              }}
              className={`mx-2 py-2 min-w-22 max-md:min-w-12 ${selectedDay === index ? "bg-zinc-700 rounded-lg" : ""}`}
              style={{ alignItems: "center" }}
            >
              <Text
                className={`text-xs font-vazir text-white ${selectedDay === index ? "opacity-100" : ""}`}
                numberOfLines={1}
              >
                {label}
              </Text>
              <Text className="text-white">
                {d.dayNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MatchDays;
