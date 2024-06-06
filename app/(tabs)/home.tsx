import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../.expo/types/types';
import { Icon } from 'react-native-elements';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const items = [
  {
    id: 1,
    title: 'Fruits and Vegetables',
    store: 'Fairprice',
    location: '63 Jurong West Central 3, #03 - 01 Jurong Point, Singapore 648331',
    rating: 5.0,
    //image: require('./path/to/fruits_image.jpg'), // Replace with actual image path
  },
  {
    id: 2,
    title: 'Bread',
    store: 'BreadTalk',
    location: '63 Jurong West Central 3, #B1 - 72 / 73, Singapore 648331',
    rating: 4.5,
    //image: require('./path/to/bread_image.jpg'), // Replace with actual image path
  },
  // Add more items as needed
];

export default function HomeTab({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search" />
        <Icon name="location-pin" type="material" color="#000" />
        <Icon name="bookmark-outline" type="material" color="#000" />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.tabTextActive}>Discounted</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveTab}>
          <Text style={styles.tabTextInactive}>Surplus</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            {/* <Image source={item.image} style={styles.itemImage} /> */}
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemStore}>{item.store}</Text>
              <Text style={styles.itemLocation}>{item.location}</Text>
              <Text style={styles.itemRating}>{item.rating} ⭐️</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%', // Make header span the entire width
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    flex: 1,
    height: 30,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 16,
    marginRight: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  inactiveTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tabTextInactive: {
    fontSize: 16,
    color: '#a0a0a0',
  },
  scrollViewContainer: {
    flex: 1, // Take up the remaining vertical space
    padding: 16,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  itemTextContainer: {
    marginTop: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemStore: {
    fontSize: 14,
    color: '#757575',
  },
  itemLocation: {
    fontSize: 14,
    color: '#757575',
  },
  itemRating: {
    fontSize: 16,
    color: '#ffcc00',
    marginTop: 4,
  },
});
