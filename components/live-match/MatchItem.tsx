import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  const renderMatch = ({ item, index }: { item: any; index: number }) => (
    <View
      className={`flex-row justify-between px-1 py-4 ${index !== matchList.matchList.length - 1 ? "border-b border-black/5" : ""}`}
    >
      {/* Home Team */}
      <View className="flex-row items-center w-[40%] justify-end">
        <Text className="text-white/80 text-xs mx-2 font-vazir">{item.homeTeam}</Text>
        <Image source={{ uri: item.homeTeamImage || "http://goo.gl/vyAs27" }} className="w-8 h-8 rounded-md" />
      </View>

      {/* Score Section */}
      <View className="items-center">
        <Text className="text-white text-sm font-bold">{item.score || "+90"}</Text>
        {item.matchFinish ? (
          <Text className="text-white/50 text-[10px] mt-1">{item.matchFinish}</Text>
        ) : item.matchMinutes ? (
          <Text className="text-green-500 text-[10px] mt-1">{item.matchMinutes}</Text>
        ) : item.matchMinutesAfter90 ? (
          <Text className="text-green-500 text-[10px] mt-1">{item.matchMinutesAfter90}</Text>
        ) : null}
      </View>

      {/* Away Team */}
      <View className="flex-row items-center w-[40%] justify-start">
        <Image source={{ uri: item.awayTeamImage || "http://goo.gl/vyAs27" }} className="w-8 h-8 rounded-md" />
        <Text className="text-white/80 text-xs mx-2 font-vazir">{item.awayTeam}</Text>
      </View>
    </View>
  );

  return (
    <View className="bg-[#1f1f1f] mb-3 py-4">
      {/* League Header */}
      <View className="flex-row gap-1.5 items-center px-4 mb-5">
        <Image source={{ uri: matchList.leagueImage }} className="w-6 h-6 mr-2" />
        <Text className="text-white/90 text-xs font-vazir">{matchList.league}</Text>
      </View>

      {/* Match List with FlatList */}
      <FlatList
        data={matchList.matchList}
        renderItem={renderMatch}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default MatchItem;
