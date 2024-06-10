import { PressableIcon } from '@/components/navigation/PressableIcon'; // Ensure the path is correct
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getDatabase, onValue, ref, push, child, update, remove } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../.expo/types/types';
import { ShareMeals, DiscountedMeals } from '@/components/addData';
import { auth } from '@/components/auth/firebaseConfig';
import { useRouter } from 'expo-router';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

type Item = {
  id: string;
  type: 'Discounted' | 'Surplus';
  item: DiscountedMeals | ShareMeals;
  bookmarked: boolean;
};

export default function HomeTab({ navigation }: Props) {
  const [discountedItems, setDiscountedItems] = useState<Item[]>([]);
  const [surplusItems, setSurplusItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<'Discounted' | 'Surplus'>('Discounted');
  const [CurrbookmarkedItems, setCurrBookmarkedItems] = useState<string[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const discountedItemsRef = ref(db, 'items/discounted');
    const surplusItemsRef = ref(db, 'items/surplus');
    const userBookmarks = ref(db, 'users/'+auth.currentUser?.uid+'/myBookmarks');

    onValue(discountedItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items: Item[] = Object.keys(data).map(key => ({
          id: key,
          type: 'Discounted',
          item: data[key],
          bookmarked: false // Initial bookmarked status
        }));
        setDiscountedItems(items);
      }
    });

    onValue(surplusItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items: Item[] = Object.keys(data).map(key => ({
          id: key,
          type: 'Surplus',
          item: data[key],
          bookmarked: false // Initial bookmarked status
        }));
        setSurplusItems(items);
      }
    });

    onValue(userBookmarks, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        const temp: string[] = data
        
        temp.forEach((id) => {
          loadBookmarks(id);
        });
        setCurrBookmarkedItems(data);
      }
    });
  }, []);

  const loadBookmarks = (id:string) => {
    setDiscountedItems((prevItems) =>
      prevItems.map((item) => 
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
    ));
    setSurplusItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
    ));
  }

  useEffect(() => {
    let filtered;
    if (activeTab === 'Discounted') {
      filtered = discountedItems.filter((item) =>
        item.item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filtered = surplusItems.filter((item) =>
        item.item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(filtered);
  }, [searchTerm, discountedItems, surplusItems, activeTab]);
 
  const db = getDatabase();
  const toggleBookmark = async (id: string) => {
    await delay(100);
    if (activeTab === 'Discounted') {
      setDiscountedItems((prevItems) =>
        prevItems.map((item) => 
          item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      ));
      const item = discountedItems.find((item) => item.id === id)
      if (item?.bookmarked) {
        setCurrBookmarkedItems(CurrbookmarkedItems.filter((itemid) => itemid !== id));
      }else{
        setCurrBookmarkedItems([...CurrbookmarkedItems, id]);        
      }
      
    } else {
      setSurplusItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      ));
      const item = surplusItems.find((item) => item.id === id)
      if (item?.bookmarked) {
        setCurrBookmarkedItems(CurrbookmarkedItems.filter((itemid) => itemid !== id));
      }else{
        setCurrBookmarkedItems([...CurrbookmarkedItems, id]);
      }
    }
    await delay(1000);
    console.log(CurrbookmarkedItems);
    let updates = {}
    updates['/myBookmarks/'] = CurrbookmarkedItems;
    update(ref(db,`users/${auth.currentUser?.uid}`), updates)
  };

  const  delay = async (ms: number) => await new Promise((res) => setTimeout(res, ms));

  let chosenItems = activeTab === 'Discounted' ? discountedItems : surplusItems;
  const bookmarkedItems = chosenItems.filter(item => item.bookmarked);
  const nonBookmarkedItems = chosenItems.filter(item => !item.bookmarked);
  chosenItems = [...bookmarkedItems, ...nonBookmarkedItems];
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <PressableIcon
          name="location-outline"
          size={24}
          onPress={() => console.log('Location pressed')}
        />
        <PressableIcon
          name="bookmark-outline"
          size={24}
          onPress={() => router.push('/myBookmarks')}
        />
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
          <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => {console.log("Clicked",item.id)}}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item.item.title}</Text>
              <PressableIcon
                name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                onPress={() => toggleBookmark(item.id)}
              />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemStore}>{item.item.description}</Text>
              <Text style={styles.itemLocation}>
                {item.item.location.Road? item.item.location.Road:""}, 
                {item.item.location.Block? item.item.location.Block: ""}, 
                {item.item.location.UnitNumber? item.item.location.UnitNumber:""}, 
                {item.item.location.PostalCode?item.item.location.PostalCode:""}
              </Text>
              <Text style={styles.itemRating}>{item.item.rating} ⭐️</Text>
            </View>
          </TouchableOpacity>
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
