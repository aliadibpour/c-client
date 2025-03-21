import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { dateDiplayFormat, dateFormat } from "@/shared/helpers";
import { useGlobalSearchParams, useLocalSearchParams, usePathname, useRouter } from "expo-router";

const MatchDays: React.FC<any> = () => {
    const today = dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "ddd dd mm" });
    const tomorrow = dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "ddd dd mm" });
    const yesterday = dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "ddd dd mm" });
    const params = useGlobalSearchParams();
    const pathname = usePathname();
    const [days, setDays] = useState<any[]>([]);
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<any>("2");

    useEffect(() => {
        const d: any = [];
        for (let i = -2; i < 5; i++) {
            const date = new Date();
            const week1 = new Date(date);
            week1.setDate(date.getDate() + i);
            d.push({
                weekday: dateDiplayFormat({ date: dateFormat(week1), locale: "fa", format: "ddd dd mm" }),
                date: dateDiplayFormat({ date: dateFormat(week1) }),
                index: i.toString(),
            });
        }
        setDays(d);
    }, []);

    function selectDay(day: number) {
        const newDay = day.toString();
        router.push({ pathname: "/live-match", params: {day: newDay} })
        setSelectedDay(newDay);
    }

    return (
        <View className="py-2">
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="relative"
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                {days.length ? (
                    <View className="flex-row">
                        {days.map((day, index:number) => (
                            <TouchableOpacity
                                key={day.date}
                                onPress={() => selectDay(index)}
                                className={`p-4 px-6 relative ${+selectedDay === index ? 'border-b-2 border-white' : ''}`}
                            >
                                <Text className={`text-white font-vazir ${+selectedDay === index ? 'text-base' : 'text-base opacity-70'}`}>
                                    {day.weekday === today ? "امروز" : day.weekday === yesterday ? "دیروز" : day.weekday === tomorrow ? "فردا" : day.weekday}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Text className="text-white font-vazir px-4">در حال بارگذاری...</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default MatchDays;