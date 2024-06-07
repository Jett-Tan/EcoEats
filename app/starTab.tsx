import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  { name: 'John Doe', rating: 5, comment: 'Very trustworthy', date: '01-01-2024 01:01' },
  { name: 'Mei Li', rating: 4.5, comment: '', date: '' },
];

const StarTab: React.FC = () => {
  return (
    <View style={styles.tabContent}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <Text style={styles.reviewName}>{review.name}</Text>
          <View style={styles.stars}>
            {[...Array(Math.floor(review.rating))].map((_, i) => (
              <Text key={i} style={styles.starText}>⭐</Text>
            ))}
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
          <Text style={styles.reviewDate}>{review.date}</Text>
        </View>
      ))}
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
  reviewCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: 'row',
  },
  starText: {
    fontSize: 20,
  },
  reviewComment: {
    fontSize: 14,
    color: 'gray',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
  },
});

export default StarTab;
