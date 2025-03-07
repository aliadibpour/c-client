import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';


const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View style={tw`py-2 mt-3 rounded bg-gray-900`}>
      <View style={tw`flex-row items-center rounded bg-gray-900 py-1 px-2`}>
        <Image source={{ uri: matchList.leagueImage }} style={tw`w-6 h-6`} />
        <Text style={tw`text-sm text-gray-300`}>{matchList.league}</Text>
      </View>

      {/* Matches List */}
      {matchList.matchList.map((match: any, index: number) => (
        <View
          key={index}
          style={[
            tw`flex-row items-center justify-between px-2 py-3 mt-2`,
            index !== matchList.matchList.length - 1 ? tw`border-b border-gray-700` : {},
          ]}
        >
          <View style={tw`flex-row items-center justify-end `}>
            <Text style={tw`text-white`}>{match.homeTeam}</Text>
            <Image
              source={{ uri: match.homeTeamImage || 'http://goo.gl/vyAs27' }}
              style={tw`w-9 h-9`}
            />
          </View>

          <View style={tw`items-center`}>
            <Text style={tw`text-white`}>{match.score ? match.score : '+90'}</Text>
            {match.matchFinish ? (
              <Text style={tw`text-gray-500`}>{match.matchFinish}</Text>
            ) : match.matchMinutes ? (
              <Text style={tw`text-green-600`}>{match.matchMinutes}</Text>
            ) : (
              <Text style={tw`text-green-600`}>{match.matchMinutesAfter90}</Text>
            )}
          </View>

          <View style={tw`flex-row items-center justify-start `}>
            <Image
              source={{ uri: match.awayTeamImage || 'http://goo.gl/vyAs27' }}
              style={tw`w-9 h-9`}
            />
            <Text style={tw`text-white`}>{match.awayTeam}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MatchItem;
