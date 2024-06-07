import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BookmarkTab: React.FC = () => {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.ratingText}>Bookmark</Text>
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

export default BookmarkTab;
