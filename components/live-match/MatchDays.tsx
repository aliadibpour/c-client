import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { dateDiplayFormat, dateFormat } from "@/shared/helpers";
import { useLocalSearchParams, useRouter } from "expo-router";

const MatchDays: React.FC<any> = () => {
    const today = dateDiplayFormat({ date: dateFormat(new Date()), locale: "fa", format: "ddd dd mm" });
    const tomorrow = dateDiplayFormat({ date: dateFormat(new Date(Date.now() + 864e5)), locale: "fa", format: "ddd dd mm" });
    const yesterday = dateDiplayFormat({ date: dateFormat(new Date(Date.now() - 864e5)), locale: "fa", format: "ddd dd mm" });

    const [days, setDays] = useState<any[]>([]);
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState<any>("3");

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
        router.setParams({ day: newDay });
        setSelectedDay(newDay);
    }

    return (
        <ScrollView horizontal style={{ backgroundColor: "#1a1a1a", padding: 10 }}>
            {days.length ? (
                days.map((day ,index:number) => (
                    <TouchableOpacity
                        key={day.date}
                        onPress={() => selectDay(index)}
                        style={{
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                            backgroundColor: index == selectedDay ? "#d1d5db" : "#3a3a3a",
                            borderRadius: 10,
                            marginHorizontal: 5,
                        }}
                    >
                        <Text style={{ color: index == selectedDay ? "#000" : "#fff" }}>
                            {day.weekday === today ? "امروز" : day.weekday === yesterday ? "دیروز" : day.weekday === tomorrow ? "فردا" : day.weekday}
                        </Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={{ color: "#fff" }}>در حال بارگذاری...</Text>
            )}
        </ScrollView>
    );
};

export default MatchDays;
