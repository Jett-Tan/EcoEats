import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PrefTab: React.FC = () => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.ratingText}>Pref</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ratingText: {
    fontSize: 20,
  },
});

export default PrefTab;
