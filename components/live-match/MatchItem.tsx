import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View className="bg-[#1f1f1f] mb-3 py-4">
    {/* League Header */}
    <View className="flex-row gap-1.5 items-center px-4 mb-5">
      <Image source={{ uri: matchList.leagueImage }} className="w-6 h-6 mr-2" />
      <Text className="text-white/90 text-xs font-vazir">{matchList.league}</Text>
    </View>

    {/* Match List */}
    {matchList.matchList.map((match: any, index: number) => (
      <View
        key={index}
        className={`flex-row justify-between px-1 py-4 ${index !== matchList.matchList.length - 1 ? "border-b border-black/5" : ""}`}
      >
        {/* Home Team */}
        <View className="flex-row items-center w-[40%] justify-end">
          <Text className="text-white/80 text-xs mx-2 font-vazir">{match.homeTeam}</Text>
          <Image source={{ uri: match.homeTeamImage || "http://goo.gl/vyAs27" }} className="w-8 h-8 rounded-md" />
        </View>

        {/* Score Section */}
        <View className="items-center">
          <Text className="text-white text-sm font-bold">{match.score || "+90"}</Text>
          {match.matchFinish ? (
            <Text className="text-white/50 text-[10px] mt-1">{match.matchFinish}</Text>
          ) : match.matchMinutes ? (
            <Text className="text-green-500 text-[10px] mt-1">{match.matchMinutes}</Text>
          ) : match.matchMinutesAfter90 ? (
            <Text className="text-green-500 text-[10px] mt-1">{match.matchMinutesAfter90}</Text>
          ) : null}
        </View>

        {/* Away Team */}
        <View className="flex-row items-center w-[40%] justify-start">
          <Image source={{ uri: match.awayTeamImage || "http://goo.gl/vyAs27" }} className="w-8 h-8 rounded-md" />
          <Text className="text-white/80 text-xs mx-2 font-vazir">{match.awayTeam}</Text>
        </View>
      </View>
    ))}
  </View>
  );
};

export default MatchItem;