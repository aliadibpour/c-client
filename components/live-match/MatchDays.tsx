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
const TOTAL_DAYS = 7;
const DEFAULT_INDEX = 2;

const MatchDays = () => {
  const today = dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "ddd dd mm" });
  const tomorrow = dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "ddd dd mm" });
  const yesterday = dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "ddd dd mm" });

  const [days, setDays] = useState<any[]>([]);
  const router = useRouter();
  const { day } = useGlobalSearchParams();
  const [selectedDay, setSelectedDay] = useState<number>(+day || DEFAULT_INDEX);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const d: any[] = [];
    for (let i = 0; i < TOTAL_DAYS; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i - DEFAULT_INDEX);
      d.push({
        weekday: dateDiplayFormat({ date: dateFormat(date), locale: "fa", format: "ddd dd mm" }),
        date: dateDiplayFormat({ date: dateFormat(date) }),
        index: i,
      });
    }
    setDays(d);
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
    <View className="bg-[#1f1f1f] py-2">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          direction:"rtl",
          paddingHorizontal: 12,
        }}
      >
        {days.map((d, index) => {
          const label =
            d.weekday === today
              ? "امروز"
              : d.weekday === yesterday
              ? "دیروز"
              : d.weekday === tomorrow
              ? "فردا"
              : d.weekday;

          return (
            <TouchableOpacity
              key={d.date}
              onPress={() => {
                router.push({ pathname: "/live-match", params: { day: index.toString() } });
              }}
              className={`mx-2 px-3 py-2 border-b-2 ${selectedDay === index ? "border-white" : "border-transparent"}`}
              style={{ minWidth: 85, alignItems: "center" }}
            >
              <Text
                className={`text-sm font-vazir text-white ${selectedDay === index ? "opacity-100" : "opacity-60"}`}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MatchDays;
