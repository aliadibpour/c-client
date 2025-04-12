import React from "react";
import { View, StyleSheet } from "react-native";

export default function MatchSkeleton() {
  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <View key={index} style={styles.skeletonBox} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  skeletonBox: {
    height: 80,
    borderRadius: 10,
    backgroundColor: "#2c2c2c",
    marginBottom: 12,
    opacity: 0.6,
  },
});
