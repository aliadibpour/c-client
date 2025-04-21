import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const teamsData = [
  { name: 'Persepolis', league: 'Iran', image: 'https://i.imgur.com/t0XHqkG.png' },
  { name: 'Esteghlal', league: 'Iran', image: 'https://i.imgur.com/NrcnzAS.png' },
  { name: 'Sepahan', league: 'Iran', image: 'https://i.imgur.com/qfOQGht.png' },
  { name: 'Tractor', league: 'Iran', image: 'https://i.imgur.com/b5fIVl8.png' },

  { name: 'Barcelona', league: 'LaLiga', image: 'https://i.imgur.com/O3oTtDq.png' },
  { name: 'Real Madrid', league: 'LaLiga', image: 'https://i.imgur.com/H96xZIB.png' },

  { name: 'Arsenal', league: 'England', image: 'https://i.imgur.com/H76Zb6J.png' },
  { name: 'Manchester City', league: 'England', image: 'https://i.imgur.com/UHTmGeD.png' },
  { name: 'Manchester United', league: 'England', image: 'https://i.imgur.com/AJQd7uC.png' },
  { name: 'Liverpool', league: 'England', image: 'https://i.imgur.com/zKjbhP7.png' },
  { name: 'Chelsea', league: 'England', image: 'https://i.imgur.com/nBlGkXb.png' },

  { name: 'PSG', league: 'France', image: 'https://i.imgur.com/VY94tTw.png' },

  { name: 'Bayern', league: 'Bundesliga', image: 'https://i.imgur.com/G2j8clH.png' },
  { name: 'Dortmund', league: 'Bundesliga', image: 'https://i.imgur.com/0OyE58G.png' },

  { name: 'Inter', league: 'Italy', image: 'https://i.imgur.com/zzcCIKk.png' },
  { name: 'Milan', league: 'Italy', image: 'https://i.imgur.com/IklATeF.png' },
  { name: 'Juventus', league: 'Italy', image: 'https://i.imgur.com/YrKdLkY.png' },
];

export default function PickTeams() {
  const [favorites, setFavorites] = useState<{ name: string; league: string }[]>([]);

  const isLeaguePicked = (league: string) =>
    favorites.some((team) => team.league === league);

  const selectTeam = (team: { name: string; league: string }) => {
    if (favorites.length >= 3) {
      Alert.alert('فقط می‌تونی ۳ تیم انتخاب کنی!');
      return;
    }
    if (isLeaguePicked(team.league)) {
      Alert.alert('از هر لیگ فقط می‌تونی ۱ تیم انتخاب کنی!');
      return;
    }

    setFavorites([...favorites, { name: team.name, league: team.league }]);
  };

  const removeTeam = (name: string) => {
    setFavorites(favorites.filter((team) => team.name !== name));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تیم‌های مورد علاقه‌ات رو انتخاب کن (۳ تیم از لیگ‌های مختلف)</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.name}
        horizontal
        contentContainerStyle={{ marginVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeTeam(item.name)}>
              <Text style={styles.removeBtn}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <FlatList
        data={teamsData}
        keyExtractor={(item) => item.name}
        numColumns={3}
        renderItem={({ item }) => {
          const selected = favorites.some((t) => t.name === item.name);
          const leaguePicked = isLeaguePicked(item.league);
          const disabled = leaguePicked && !selected;

          return (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => selectTeam(item)}
              style={[
                styles.teamCard,
                selected && styles.selected,
                disabled && styles.disabled,
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.teamLogo} />
              <Text style={styles.teamName}>{item.name}</Text>
              <Text style={styles.leagueName}>{item.league}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 15 },
  title: { color: '#fff', fontSize: 16, marginBottom: 10, textAlign: 'center' },
  teamCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    margin: 6,
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
  },
  teamLogo: { width: 40, height: 40, marginBottom: 6 },
  teamName: { color: '#fff', fontSize: 12 },
  leagueName: { color: '#888', fontSize: 10 },
  selected: {
    borderColor: '#00f',
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.3,
  },
  favoriteItem: {
    backgroundColor: '#0022aa',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 20,
  },
  favoriteText: { color: '#fff', marginRight: 5 },
  removeBtn: { color: '#fff', fontSize: 16 },
});
