import React, { useEffect, useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, PanResponder, Dimensions, I18nManager } from "react-native";
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
        scrollToDay(selectedDay);
    }, []);

    useEffect(() => {
        if (day) {
            const newIndex = +day;
            setSelectedDay(newIndex);
            moveIndicator(newIndex);
            scrollToDay(newIndex);
        }
    }, [day]);

    function moveIndicator(dayIndex: number) {
        Animated.spring(indicatorPosition, {
            toValue: dayIndex * BUTTON_WIDTH,
            useNativeDriver: false,
        }).start();
    }

    function selectDay(dayIndex: number) {
        setSelectedDay(dayIndex);
        moveIndicator(dayIndex);
        router.push({ pathname: "/live-match", params: { day: dayIndex.toString() } });
        scrollToDay(dayIndex);
    }

    function scrollToDay(dayIndex: number) {
        if (scrollViewRef.current) {
            const position = Math.max(0, dayIndex * BUTTON_WIDTH - screenWidth / 2 + BUTTON_WIDTH / 2);
            scrollViewRef.current.scrollTo({ x: position, animated: true });
        }
    }

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 50 && selectedDay > 0) {
                selectDay(selectedDay + 1);
            } else if (gestureState.dx < -50 && selectedDay < TOTAL_DAYS - 1) {
                selectDay(selectedDay - 1);
            }
        },
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers} >
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.daysRow}>
                    {days.map((day, index: number) => (
                        <TouchableOpacity key={day.date} onPress={() => selectDay(index)} style={[styles.dayButton, { width: BUTTON_WIDTH }]}>
                            <Text style={[styles.dayText, selectedDay === index && styles.selectedDayText]}>
                                {day.weekday === today ? "امروز" : day.weekday === yesterday ? "دیروز" : day.weekday === tomorrow ? "فردا" : day.weekday}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <Animated.View
                        style={[
                            styles.selectedIndicator,
                            {
                                [I18nManager.isRTL ? "right" : "left"]: (TOTAL_DAYS - selectedDay) * BUTTON_WIDTH,
                                width: BUTTON_WIDTH,
                            },
                        ]}
                    />

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        width: "100%",
    },
    scrollContainer: {
        paddingHorizontal: 0,
    },
    daysRow: {
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        position: "relative",
        width: screenWidth,
    },
    dayButton: {
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    dayText: {
        color: "white",
        fontSize: 14,
        opacity: 0.7,
        fontFamily: "vazir",
    },
    selectedDayText: {
        opacity: 1,
    },
    selectedIndicator: {
        position: "absolute",
        bottom: 0,
        height: 3,
        backgroundColor: "white",
    },
});

export default MatchDays;
