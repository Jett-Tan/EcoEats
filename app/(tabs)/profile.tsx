import Input from "@/components/Input";
import { Icon } from "@/components/navigation/Icon";
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //https://oblador.github.io/react-native-vector-icons/#MaterialIcons

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialLayout = { width: Dimensions.get('window').width };

const StarRoute = () => (
  <View style={styles.tabContent}>
    <Text style={styles.ratingText}> Star</Text>
  </View>
);

const BookmarkRoute = () => (
  <View style={styles.tabContent}>
    <Text style={styles.ratingText}>Bookmark</Text>
  </View>
);

const PrefRoute = () => (
  <View style={styles.tabContent}>
    <Text style={styles.ratingText}>Pref</Text>
  </View>
);

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Low');
  const [dob, setDOB] = useState('01/01/2000');
  const [gender, setGender] = useState('Male');
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'star'},
    { key: 'bookmark'},
    { key: 'pref'},
  ]);

  const renderScene = SceneMap({
    star: StarRoute,
    bookmark: BookmarkRoute,
    pref: PrefRoute,
  });

  const reviews: Review[] = [
    { name: 'John Doe', rating: 5, comment: 'Very trustworthy', date: '01-01-2024 01:01' },
    { name: 'Mei Li', rating: 4.5, comment: '', date: '' },
  ];

  const colorScheme = useColorScheme();

  const renderIcon = ({ route,focused, color }: { route: { key: string }, focused: boolean, color: string }) => {
    let iconName;

    switch (route.key) {
      case 'star':
        iconName = focused ? 'star' : 'star-outline';
        break;
      case 'bookmark':
        iconName = focused ? 'bookmark' : 'bookmark-outline';
        break;
      case 'pref':
        iconName = focused ? 'list' : 'list';
        break;
      default:
        iconName = 'star'; // Default to 'star' to satisfy the type
        break;
    }
    return <MaterialIcons name={iconName} size={24} color={color} />;
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperBlock}></View>
      <View style={styles.headerRow}>
        <View style={styles.headerRowLeft}>
          <Icon size={90} name="person-circle-sharp" />
          <Text style={styles.headerText}>John Low</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>5.0</Text>
          <Text style={styles.starText}>⭐</Text>
        </View>
      </View>
      <View style={styles.subTitle}>
        <Text style={styles.subTitleText}>A profile sub title</Text>
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
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Last Name"
          placeholder="Enter your Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Date of Birth"
          placeholder="Enter your Date of Birth"
          value={dob}
          onChangeText={setDOB}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
        <Input
          type="Gender"
          placeholder="Enter your Gender"
          value={gender}
          onChangeText={setGender}
          style={{
            inputBox: { width: 350 },
            input: styles.input
          }}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderIcon={renderIcon}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
          />
        )}
      />

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
  upperBlock: {
    padding: 30,
  },
  betweenTextBlock: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  personalParticularsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  tabBar: {
    backgroundColor: 'white',
  },
  indicator: {
    backgroundColor: 'black',
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});

export default ProfilePage;
