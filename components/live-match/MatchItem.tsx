import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MatchItem: React.FC<any> = ({ matchList }) => {
  return (
    <View style={styles.container}>
      {/* League Header */}
      <View style={styles.leagueHeader}>
        <Image source={{ uri: matchList.leagueImage }} style={styles.leagueImage} />
        <Text style={styles.leagueText}>{matchList.league}</Text>
      </View>

      {/* Match List */}
      {matchList.matchList.map((match: any, index: number) => (
        <View
          key={index}
          style={[styles.matchRow, index !== matchList.matchList.length - 1 && styles.matchBorder]}
        >
          {/* Home Team */}
          <View style={styles.teamContainerRight}>
            <Text style={styles.teamText}>{match.homeTeam}</Text>
            <Image source={{ uri: match.homeTeamImage || 'http://goo.gl/vyAs27' }} style={styles.teamImage} />
          </View>

          {/* Score Section */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{match.score || '+90'}</Text>
            {match.matchFinish ? (
              <Text style={styles.matchFinishText}>{match.matchFinish}</Text>
            ) : match.matchMinutes ? (
              <Text style={styles.matchMinutesText}>{match.matchMinutes}</Text>
            ) : match.matchMinutesAfter90 ? (
              <Text style={styles.matchMinutesText}>{match.matchMinutesAfter90}</Text>
            ) : null}
          </View>

          {/* Away Team */}
          <View style={styles.teamContainerLeft}>
            <Image source={{ uri: match.awayTeamImage || 'http://goo.gl/vyAs27' }} style={styles.teamImage} />
            <Text style={styles.teamText}>{match.awayTeam}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    marginBottom: 12,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  leagueHeader: {
    flexDirection: 'row',
    gap:6,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  leagueImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  leagueText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontFamily:"vazir",
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  matchBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.03)',
  },
  teamContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-end',
  },
  teamContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-start',
  },
  teamImage: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  teamText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginHorizontal: 8,
    fontFamily:"vazir",
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  matchFinishText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    marginTop: 4,
  },
  matchMinutesText: {
    color: '#22c55e',
    fontSize: 10,
    marginTop: 4,
  },
});

export default MatchItem;
