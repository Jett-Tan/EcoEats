import CustomButton from '@/components/CustomButton';
import { DiscountedMeals, ShareMeals } from '@/components/addData';
import { auth } from '@/components/auth/firebaseConfig';
import { PressableIcon } from '@/components/navigation/PressableIcon'; // Ensure the path is correct
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRouter } from 'expo-router';
import { child, get, getDatabase, onValue, push, ref, update } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { MapMarker } from 'react-native-maps';
import { RootStackParamList } from '../../.expo/types/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type Item = {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState<Item>();
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const discountedItemsRef = ref(db, 'items/discounted');
    const surplusItemsRef = ref(db, 'items/surplus');
    const userBookmarks = ref(db, 'users/' + auth.currentUser?.uid + '/myBookmarks');

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
        const temp: string[] = data

        temp.forEach((id) => {
          loadBookmarks(id);
        });
        setCurrBookmarkedItems(data);
      }
    });
  }, []);

  const loadBookmarks = (id: string) => {
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
      } else {
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
      } else {
        setCurrBookmarkedItems([...CurrbookmarkedItems, id]);
      }
    }
    // await delay(1000);
    // console.log(CurrBookmarkedItems);
    // let updates = {}
    // updates['/myBookmarks/'] = CurrBookmarkedItems;
    // update(ref(db,`users/${auth.currentUser?.uid}`), updates)
  };

  const reserve = async (id: string) => {
    const dbRef = ref(getDatabase());
    const newPostKey = push(child(ref(db, `users/${auth.currentUser?.uid}`), '/myReservations')).key;
    const currReservation =
      get(child(dbRef, `users/${auth.currentUser?.uid}/myReservations`)).then((snapshot) => {
        let updates = {}
        if (snapshot.exists()) {
          console.log(snapshot.val());
          if (!snapshot.val().includes(id)) {
            updates['/myReservations/'] = [...snapshot.val(), id];
          } else {
            updates['/myReservations/'] = snapshot.val();
          }
        } else {
          updates['/myReservations/'] = [id];
        }
        update(ref(db, `users/${auth.currentUser?.uid}`), updates)
      }).catch((error) => {
        console.error(error);
      });

  }

  const delay = async (ms: number) => await new Promise((res) => setTimeout(res, ms));

  let chosenItems = activeTab === 'Discounted' ? discountedItems : surplusItems;
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor= '#a0a0a0'
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <PressableIcon
          name="location-outline"
          size={24}
          onPress={() => router.push('/locationPage')}
        />
        <PressableIcon
          name="journal-outline"
          size={24}
          onPress={() => router.push('/myReservations')}
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

      <Modal visible={modalVisible} transparent={true}>
        <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          </TouchableOpacity>
          <View style={{ width: "85%", height: "80%", backgroundColor: "white", borderRadius: 10, shadowRadius: 10 }}>
            <View style={{ padding: 10, height: "100%" }}>
              <PressableIcon style={{ marginTop: 20 }} onPress={() => { setModalVisible(false) }} size={30} name="arrow-back-outline" />
              {modalItem && (
                <View style={{ width: "100%", height: '80%' }}>
                  <View style={[styles.itemHeader, { width: '100%', height: "15%", flexDirection: "row", alignItems: "flex-start" }]}>
                    <View style={[styles.itemTextContainer, { width: "80%" }]}>
                      <Text style={[styles.itemTitle, { fontSize: 24 }]}>{modalItem.item.title}</Text>
                      <Text style={[styles.itemLocation, { flexWrap: "wrap" }]}>
                        <Text>{modalItem.item.location.Road}, </Text>
                        <Text>{modalItem.item.location.Block}, </Text>
                        <Text>{modalItem.item.location.UnitNumber}, </Text>
                        <Text>{modalItem.item.location.PostalCode}</Text>
                      </Text>
                    </View>
                    <Text style={[styles.itemRating, { fontSize: 20 }]}>5.0 ⭐</Text>
                  </View>
                  <View style={{ width: "100%", height: "100%" }}>
                    <ScrollView>
                      <Image source={{ uri: modalItem.item.photoUrl }} style={{ marginBottom: 10, borderWidth: 1, borderColor: "black", width: "100%", height: 200 }} />
                      <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Description</Text>
                        <Text>{modalItem.item.description}</Text>
                      </View>
                      <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Quantity</Text>
                        <Text>{modalItem.item.quantity}</Text>
                      </View>
                      {modalItem.type === "Discounted" &&
                        <View style={styles.itemContainer}>
                          <Text style={styles.itemTitle}>Price</Text>
                          {/* {const s = modalItem.item as DiscountedMeals }
                          <Text>{s.price}</Text> */}
                        </View>
                      }
                      <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Instructions</Text>
                        <Text>{modalItem.item.instructions}</Text>
                      </View>
                      <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>Location</Text>
                        <MapView style={{ width: "100%", height: 200, borderWidth: 1, borderColor: "black" }} region={{ latitude: modalItem.item.latitude, longitude: modalItem.item.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
                          <MapMarker coordinate={{ latitude: modalItem.item.latitude, longitude: modalItem.item.longitude }} />
                        </MapView>
                      </View>
                      <CustomButton
                        text="Reserve"
                        onPress={() => {
                          reserve(modalItem.id);
                          setModalVisible(false);
                          router.push('/myReservations');
                        }}
                        type=""
                        style={{
                          buttonContainer: {
                            width: "100%",
                            backgroundColor: "#3BAE6F"
                          },
                          text: {
                            color: "white"
                          }
                        }}
                      />
                    </ScrollView>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollViewContainer}>
          {chosenItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemContainer}
              onPress={() => {
                console.log("Clicked", item.id)
                setModalItem(item);
                setModalVisible(true);
              }}>
              <Image src={item.item.photoUrl} style={{ marginBottom: 10, borderWidth: 1, borderColor: "black", width: "100%", height: 200 }}></Image>
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
                  {item.item.location.Road ? item.item.location.Road : ""},
                  {item.item.location.Block ? item.item.location.Block : ""},
                  {item.item.location.UnitNumber ? item.item.location.UnitNumber : ""},
                  {item.item.location.PostalCode ? item.item.location.PostalCode : ""}
                </Text>
                <Text style={styles.itemRating}>5.0 ⭐️</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 20,
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
    borderRadius: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: '#fff',
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
