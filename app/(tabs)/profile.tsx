// import { View, Text, StyleSheet } from 'react-native';

// export default function ProfileTab() {
//     return (
//         <View style={styles.container}>
//             <Text>Profile</Text>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// src/components/ProfilePage.tsx
// src/components/ProfilePage.tsx
import Input from "@/components/Input";
import { Icon } from "@/components/navigation/Icon";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[dob, setDOB] = useState('');
    const[gender, setGender] = useState('');
    
const reviews: Review[] = [
  { name: 'John Doe', rating: 5, comment: 'Very trustworthy', date: '01-01-2024 01:01' },
  { name: 'Mei Li', rating: 4.5, comment: '', date: '' },
];

const ProfilePage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperBlock}></View>
      <View style={styles.headerRow}>
      <Icon size={90} name="person-circle-sharp" />
        <Text style={styles.headerText}>John Low</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>5.0</Text>
          <Text style={styles.starText}>⭐</Text>
        </View>
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.subTitleText}>An profile sub title</Text>
      </View>
      <View style={styles.betweenTextBlock}></View>
      <View style={styles.personalParticulars}>
        <Text style={styles.personalParticularsTitle}>Personal Particulars</Text>
        <View style={styles.betweenTextBlock}></View>
        <Input
            type="First Name"
            placeholder="Enter your First Name"
            value={firstName}
            onChangeText={setFirstName}
            error=""
            catchError={() => {}}
            />
          <View style={styles.betweenInputBlock}></View>
        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
        </View>
        <View style={styles.containerLeft}>
        <TextInput style={styles.input} value="Low" editable={true} />
          </View>
          <View style={styles.betweenInputBlock}></View>
        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth</Text>
          </View>
        <View style={styles.containerLeft}>
        <TextInput style={styles.input} value="01/01/2000" editable={true} />
          </View>
          <View style={styles.betweenInputBlock}></View>
        <View style={styles.field}>
          <Text style={styles.label}>Gender</Text>
        </View>
        <View style={styles.containerLeft}>
        <TextInput style={styles.input} value="Male" editable={true} />
          </View>
      </View>
      <View style={styles.reviews}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  containerLeft: {
    
  },
  upperBlock: {
    padding: 30,
  },
  betweenTextBlock: {
    padding: 10,
  },
  betweenInputBlock: {
    padding: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileHeader: {
    textAlign: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
  },
  starText: {
    fontSize: 20,
    marginLeft: 5,
  },
  personalParticulars: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  personalParticularsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    textAlign: 'left',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviews: {
    marginBottom: 20,
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
  reviewComment: {
    fontSize: 14,
    color: 'gray',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navLink: {
    fontSize: 16,
    color: 'blue',
  },
});

export default ProfilePage;
