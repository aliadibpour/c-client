import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated, PanResponder, Dimensions, I18nManager } from "react-native";
import { dateDiplayFormat, dateFormat } from "@/shared/helpers";
import { useGlobalSearchParams, useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const TOTAL_DAYS = 7;
const BUTTON_WIDTH = screenWidth / 8; 
const DEFAULT_INDEX = 2;

const MatchDays: React.FC<any> = () => {
    const today = dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "ddd dd mm" });
    const tomorrow = dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "ddd dd mm" });
    const yesterday = dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "ddd dd mm" });

    const [days, setDays] = useState<any[]>([]);
    const router = useRouter();
    const { day } = useGlobalSearchParams();
    const [selectedDay, setSelectedDay] = useState<number>(+day);
    const scrollViewRef = useRef<ScrollView>(null);
    const indicatorPosition = useRef(new Animated.Value(selectedDay * BUTTON_WIDTH)).current;

    useEffect(() => {
        const d: any = [];
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
        //scrollToDay(selectedDay);
    }, []);

    useEffect(() => {
        if (day) {
            const newIndex = +day;
            setSelectedDay(newIndex);
            //moveIndicator(newIndex);
            ///scrollToDay(newIndex);
        }
    }, [day]);

    // function moveIndicator(dayIndex: number) {
    //     Animated.spring(indicatorPosition, {
    //         toValue: dayIndex * BUTTON_WIDTH,
    //         useNativeDriver: false,
    //     }).start();
    // }


    // function scrollToDay(dayIndex: number) {
    //     if (scrollViewRef.current) {
    //         const position = Math.max(0, dayIndex * BUTTON_WIDTH - screenWidth / 2 + BUTTON_WIDTH / 2);
    //         scrollViewRef.current.scrollTo({ x: position , animated: true });
    //     }
    // }


    return (
        <View className="py-2 overflow-auto bg-[#1f1f1f] mb-5" >
                <View className={`relative flex-row`}>
                    {days.map((day, index: number) => (
                        <TouchableOpacity 
                            key={day.date} 
                            onPress={() => router.push({ pathname: "/live-match", params: { day: index.toString() } })}
                            className="py-3 items-center justify-center"
                            style={{ width: BUTTON_WIDTH }}
                        >
                            <Text className={`text-white text-sm ${selectedDay === index ? "opacity-100" : "opacity-70"}
                             font-vazir text-nowrap`}>
                                {day.weekday === today ? "امروز" : day.weekday === yesterday ? "دیروز" : day.weekday === tomorrow ? "فردا" : day.weekday}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <Animated.View
                        className="absolute bottom-0 h-[3px] bg-white"
                        style={{
                            width: BUTTON_WIDTH,
                            "left": (TOTAL_DAYS - selectedDay) * BUTTON_WIDTH,
                        }}
                    />
                </View>
        </View>
    );
};

export default MatchDays;