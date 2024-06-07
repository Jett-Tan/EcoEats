import { Icon } from "@/components/navigation/Icon";
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
  { name: 'Mei Li', rating: 5, comment: 'Food in good condition and still tasty!!', date: '11-12-2023 12:15' },
  { name: 'Susan', rating: 5, comment: 'Nice and polite', date: '15-11-2023 09:12' },
];

const StarTab: React.FC = () => {
    return (
      <View style={styles.tabContent}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
            <Icon size={30} name="person-circle-sharp" />
              <Text style={styles.reviewName}>{review.name}</Text>
            </View>
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
  },
  reviewCard: {
    width: 350,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
