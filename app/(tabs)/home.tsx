import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../.expo/types/types';
import { Icon } from 'react-native-elements';
import { getDatabase, ref, get, set, child, onValue } from "firebase/database";

import { auth } from '@/components/auth/firebaseConfig';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

type Item = {
  id: number;
  title: string;
  store: string;
  location: string;
  rating: number;
  bookmarked: boolean; // Add bookmarked field
};

const discountedItems: Item[] = [
  {
    id: 1,
    title: 'Fruits and Vegetables',
    store: 'Fairprice',
    location: '63 Jurong West Central 3, #03 - 01 Jurong Point, Singapore 648331',
    rating: 5.0,
    bookmarked: false, // Initial bookmarked status
  },
  {
    id: 2,
    title: 'Bread',
    store: 'BreadTalk',
    location: '63 Jurong West Central 3, #B1 - 72 / 73, Singapore 648331',
    rating: 4.5,
    bookmarked: false, // Initial bookmarked status
  },
  // Add more discounted items as needed
];

const surplusItems: Item[] = [
  {
    id: 1,
    title: 'Fruits ',
    store: 'NTUC',
    location: '63 Jurong West Central 3, #03 - 01 Jurong Point, Singapore 648331',
    rating: 5.0,
    bookmarked: false, // Initial bookmarked status
  },
  {
    id: 2,
    title: 'Bread',
    store: 'IBread',
    location: '63 Jurong West Central 3, #B1 - 72 / 73, Singapore 648331',
    rating: 4.5,
    bookmarked: false, 
  },
];

export default function HomeTab({ navigation }: Props) {
  const [discountedItemsState, setDiscountedItems] = useState<Item[]>(discountedItems); 
  const [surplusItemsState, setSurplusItems] = useState<Item[]>(surplusItems); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(discountedItems);
  const [activeTab, setActiveTab] = useState<'Discounted' | 'Surplus'>('Discounted');

  const toggleDiscountedBookmark = (id: number) => {
    setDiscountedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  const toggleSurplusBookmark = (id: number) => {
    setSurplusItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  // Choose items based on the active tab
  let chosenItems = activeTab === 'Discounted' ? discountedItemsState : surplusItemsState;
  const bookmarkedItems = chosenItems.filter(item => item.bookmarked);
  const nonBookmarkedItems = chosenItems.filter(item => !item.bookmarked);
  chosenItems = [...bookmarkedItems, ...nonBookmarkedItems];

  const toggleBookmark = (id: number) => {
    if (activeTab === 'Discounted') {
      toggleDiscountedBookmark(id);
    } else {
      toggleSurplusBookmark(id);
    }
  };

  useEffect(() => {
    let filtered;
    if (activeTab === 'Discounted') {
      filtered = discountedItemsState.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filtered = surplusItemsState.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [searchTerm, discountedItemsState, surplusItemsState, activeTab]);
  
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  useEffect(() => {
    (async () => {
      onValue(child(dbRef, 'items'), (snapshot) => {
        if (snapshot.exists()) {
          console.log("Data available");
          const user = snapshot.val();
          console.log(user);
          // loadData(user);
        } else {
          console.log("No data available");
        }
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Icon name="location-pin" type="material" color="#000" />
        <Icon name="bookmark-outline" type="material" color="#000" />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Discounted' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('Discounted')}>
          <Text style={activeTab === 'Discounted' ? styles.tabTextActive : styles.tabTextInactive}>Discounted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Surplus' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('Surplus')}>
          <Text style={activeTab === 'Surplus' ? styles.tabTextActive : styles.tabTextInactive}>Surplus</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {chosenItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                <Icon
                  name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
                  type="material"
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.itemTextContainer}>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
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
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  inactiveTab: {
    paddingVertical: 10,
    paddingHorizontal: 50,
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
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
