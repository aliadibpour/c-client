import React from 'react';
import { View, Text, Image } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View className="bg-zinc-800 mb-2 py-5 rounded-lg">
      {/* League Header */}
      <View className="flex-row items-center px-3 mb-2">
        <Image source={{ uri: matchList.leagueImage }} className="w-8 h-8 mr-2" />
        <Text className="text-white text-lg font-bold">{matchList.league}</Text>
      </View>

      {/* Match List */}
      {matchList.matchList.map((match: any, index: number) => (
        <View
          key={index}
          className={`flex-row items-center justify-between px-3 py-3 ${index !== matchList.matchList.length - 1 ? 'border-b border-black/30' : ''}`}
        >
          {/* Home Team */}
          <View className="flex-row items-center w-[40%] justify-end">
            <Text className="text-white text-sm mx-2">{match.homeTeam}</Text>
            <Image source={{ uri: match.homeTeamImage || 'http://goo.gl/vyAs27' }} className="w-9 h-9 rounded-md" />
          </View>

          {/* Score Section */}
          <View className="items-center w-[20%]">
            <Text className="text-white text-lg font-bold">{match.score || '+90'}</Text>
            {match.matchFinish ? (
              <Text className="text-gray-500 text-xs">{match.matchFinish}</Text>
            ) : match.matchMinutes ? (
              <Text className="text-green-600 text-xs">{match.matchMinutes}</Text>
            ) : (
              <Text className="text-green-600 text-xs">{match.matchMinutesAfter90}</Text>
            )}
          </View>

          {/* Away Team */}
          <View className="flex-row items-center w-[40%] justify-start">
            <Image source={{ uri: match.awayTeamImage || 'http://goo.gl/vyAs27' }} className="w-9 h-9 rounded-md" />
            <Text className="text-white text-sm mx-2">{match.awayTeam}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MatchItem;
