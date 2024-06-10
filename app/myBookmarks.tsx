import { getDatabase, onValue, ref, push, child, update, remove } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ShareMeals, DiscountedMeals } from '@/components/addData';
import { auth } from "@/components/auth/firebaseConfig";
import {PressableIcon} from "@/components/navigation/PressableIcon";

type Item = {
  id: string;
  type: 'Discounted' | 'Surplus';
  item: DiscountedMeals | ShareMeals;
  bookmarked: boolean;
};
const temp:Item = {
    id: "",
    type: 'Discounted',
    item: {
        user_id: "",
        title: "",
        description: "",
        quantity: "",
        instructions: "",
        location: {
            Block: "",
            Road: "",
            PostalCode: "",
            UnitNumber: "",
        },
        latitude: 0,
        longitude: 0,
        photoUrl: "",
        rating: 0,
        price: "",
    },
    bookmarked: false
};
export default function MyBookmarks() {
    const [discountedItems, setDiscountedItems] = useState<Item[]>([]);
    const [surplusItems, setSurplusItems] = useState<Item[]>([]);
    const [CurrBookmarkedItems, setCurrBookmarkedItems] = useState<Item[]>([temp]);

    useEffect(() => {
        const db = getDatabase();
        const discountedItemsRef = ref(db, 'items/discounted');
        const surplusItemsRef = ref(db, 'items/surplus');
        const userBookmarks = ref(db, 'users/'+auth.currentUser?.uid+'/myBookmarks');
        
        onValue(discountedItemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data);
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
                console.log(data);
                
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
            console.log("userBookmarks",data);
            const bookmarks:Item[] = 
            data.map((x:string) => { 
                discountedItems.find((item) => item.id === x) || surplusItems.find((item) => item.id === x)
            })
            
            setCurrBookmarkedItems(bookmarks);
        }else {console.log("No bookmarks");
        }
        });
    }, []); 
    
    setTimeout(() => {console.log("test",CurrBookmarkedItems)}, 1000);
    

    return (
        <View style={{flex:1}}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {CurrBookmarkedItems.length > 0 && CurrBookmarkedItems.map((item) => 
                <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => {console.log("Clicked",item.id)}}>
                    <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{item.item.title}</Text>
                    <PressableIcon
                        name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
                        size={24}
                    />
                    </View>
                    <View style={styles.itemTextContainer}>
                    <Text style={styles.itemStore}>{item.item.description?item.item.description:""}</Text>
                    <Text style={styles.itemLocation}>
                        {item.item.location.Road? item.item.location.Road:""}, 
                        {item.item.location.Block? item.item.location.Block: ""}, 
                        {item.item.location.UnitNumber? item.item.location.UnitNumber:""}, 
                        {item.item.location.PostalCode?item.item.location.PostalCode:""}
                    </Text>
                    <Text style={styles.itemRating}>{item.item.rating} ⭐️</Text>
                    </View>
                </TouchableOpacity>
                // <View><Text>1</Text></View>
                )}
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
