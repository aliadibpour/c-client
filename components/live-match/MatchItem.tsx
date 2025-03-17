import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View className='bg-zinc-900/40 mt-3 py-5 rounded'>
      <View>
        <Image source={{ uri: matchList.leagueImage }}
        className='w-8 h-8' />
        <Text className='text-white'>{matchList.league}</Text>
      </View>

      {matchList.matchList.map((match: any, index: number) => (
        <View
          key={index}
          className={`flex-row items-center justify-between px-2 py-3 mt-2 ${
            index !== matchList.matchList.length - 1 ? 'border-b border-black/30' : ''
          }`}
        >
          <View className="flex-row items-center justify-end">
            <Text className='text-white'>{match.homeTeam}</Text>
            <Image 
              className="rounded-md w-10 h-10"
              source={{ uri: match.homeTeamImage || 'http://goo.gl/vyAs27' }}
            />
          </View>

          <View className="items-center">
            <Text className='text-white'>{match.score ? match.score : '+90'}</Text>
            {match.matchFinish ? (
              <Text className="text-gray-500">{match.matchFinish}</Text>
            ) : match.matchMinutes ? (
              <Text className="text-green-600">{match.matchMinutes}</Text>
            ) : (
              <Text className="text-green-600">{match.matchMinutesAfter90}</Text>
            )}
          </View>

          <View className="flex-row items-center justify-start">
            <Image 
              className="rounded-md w-10 h-10"
              source={{ uri: match.awayTeamImage || 'http://goo.gl/vyAs27' }}
            />
            <Text className='text-white'>{match.awayTeam}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MatchItem;