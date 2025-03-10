import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View>
      <View style={styles.league}>
        <Image source={{ uri: matchList.leagueImage }} style={styles.teamImage} />
        <Text>{matchList.league}</Text>
      </View>

      {matchList.matchList.map((match: any, index: number) => (
        <View
          key={index}
          className={`flex-row items-center justify-between px-2 py-3 mt-2 ${
            index !== matchList.matchList.length - 1 ? 'border-b border-gray-700' : ''
          }`}
          style={styles.match}
        >
          <View className="flex-row items-center justify-end">
            <Text className="text-black">{match.homeTeam}</Text>
            <Image
              source={{ uri: match.homeTeamImage || 'http://goo.gl/vyAs27' }}
              style={styles.teamImage}
            />
          </View>

          <View className="items-center">
            <Text className="text-black">{match.score ? match.score : '+90'}</Text>
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
              source={{ uri: match.awayTeamImage || 'http://goo.gl/vyAs27' }}
              style={styles.teamImage}
            />
            <Text className="text-black">{match.awayTeam}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MatchItem;
const styles = StyleSheet.create({
  teamImage: {
    width: 46,
    height: 46
  },
  league: {
    display: "flex",
    flexDirection:"row",
  },
  match: {
    display: "flex",
    flexDirection: "row",
  }
})