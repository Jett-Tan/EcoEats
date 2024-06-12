import { auth } from '@/components/auth/firebaseConfig';
import { PressableIcon } from '@/components/navigation/PressableIcon';
import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, get, getDatabase, ref, onValue, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { DiscountedMeals, ShareMeals } from '@/components/addData';
// interface Reservation {
//     id: string;
//     item:Item;
    // dish: string;
    // image: string;
    // address: string;
    // rating: number;
// }

export type Item = {
  id: string;
  type: 'Discounted' | 'Surplus';
  item: DiscountedMeals | ShareMeals;
};

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Item[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Item[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<Item | null>(null);

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    async function loadData(){
        // console.log(discountedItems);
        // console.log(surplusItems);
        const db = getDatabase();
            let discountedItems:Item[] = [];
            let surplusItems:Item[] = [];
            const discountedItemsRef = ref(db, 'items/discounted');
            const surplusItemsRef = ref(db, 'items/surplus');

           await onValue(discountedItemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const items: Item[] = Object.keys(data).map(key => ({
                id: key,
                type: 'Discounted',
                item: data[key],
                bookmarked: false // Initial bookmarked status
                }));
                discountedItems = items;
            }
            });

            await onValue(surplusItemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const items: Item[] = Object.keys(data).map(key => ({
                id: key,
                type: 'Surplus',
                item: data[key],
                bookmarked: false // Initial bookmarked status
                }));
                surplusItems = items;
                // setSurplusItems(items);
            }
            });
        // const db = getDatabase();
        const dbRef = ref(db);
        let tempArr:Item[] = [];
        await get(child(dbRef, `users/${auth.currentUser?.uid}/myReservations`))
        .then(async (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // console.log('Data exists',data);
                tempArr = await Object(data).map(async (key: string) => {
                    const temp = discountedItems.filter((item) => {return (item.id == key)});
                    if(temp.length > 0){
                        return temp[0];
                    }else {
                        const temp2 = surplusItems.filter((item) => {return (item.id == key)});
                        return temp2[0];
                    }                    
                })
                // console.log('TempArr:',tempArr.length);
                return tempArr;
            }}).catch((error) => {console.error('Error fetching data:', error);}) 
        // console.log('TempArr:',tempArr.length);
        return tempArr;
    }
    useEffect(() => {
        (async () => {
            loadData().then(async (data) => {
                await setReservations(await data);
            })
        })();        
    }, []);

    
     
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredReservations(reservations);
        } else {
            // const filtered = reservations.filter(reservation => 
            //     // reservation.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //     // reservation.address.toLowerCase().includes(searchTerm.toLowerCase())
            // );
            // setFilteredReservations(filtered);
        }
    }, [searchTerm, reservations]);

    const renderItem = ({ item }: { item: Item }) => {   
        // console.log();
             
        return (
        <TouchableOpacity onPress={() => { setModalItem(item); setModalVisible(true); }}>
            <View style={styles.card}>
                {/* <Image source={{ uri: item.item.photoUrl }} style={styles.image} /> */}
                {/* <Text style={styles.title}>{item.dish}</Text>
                <Text style={styles.address}>{item.address}</Text> */}
                <Text style={styles.rating}>{item.id} ⭐</Text>
            </View>
        </TouchableOpacity>
    )};
    
    
    // if (error) {
    //     return <Text>{error}</Text>;
    // }
    const router = useRouter();

    return (
        <>
            {/* <Stack.Screen options={{ title: 'My Reservations!', headerBackTitleVisible: false, headerSearchBarOptions: { placeholder: 'Search' }}}  /> */}
            {/* <View style={styles.header}> */}
                {/* <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor= '#a0a0a0'
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                /> */}
            {/* </View> */}  
            <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.push('./(tabs)/home')}} size={30} name="arrow-back-outline" />
            </View>              
            <View style={{alignItems:"center",position: "absolute",
            top: 0,
            left: 0,
            marginLeft:"35%",
            width:"30%",
            marginTop:70,
            height:30,
            justifyContent:"center"}}>
                <Text style={{textAlign:"center",fontSize:16, fontWeight:"bold"}}>My Reservations</Text>
            </View>         
            <View style={{marginTop:100, minHeight:"80%"}}>
                <ScrollView style={{margin:40, width:'95%', height:"100%"}}>
                    <View>
                    {reservations.length>0 && ( Object(reservations).map(async (reservations:Item) =>{
                        const item = await reservations;
                        // console.log(item);
                        
                        return(
                            <View style={{marginBottom:10}}>
                            <TouchableOpacity onPress={() => { setModalItem(item); setModalVisible(true); }}>
                                <Image src={item.item.photoUrl} style={{ marginBottom: 10, borderWidth: 1, borderColor: "black", width: "100%", height: 200 }}></Image>
                                <View style={styles.itemHeader}>
                                <Text style={styles.itemTitle}>{item.item.title}</Text>
                                <PressableIcon
                                    name={'bookmark-outline'}
                                    size={24}
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
                                <Text style={styles.itemRating}>{item.item.rating} ⭐️</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                        )
                    })
                    )}
                    </View>
                </ScrollView>
            </View>
            </View>              
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    reservationContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginTop: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    address: {
        fontSize: 14,
        color: '#888',
    },
    rating: {
        fontSize: 14,
        color: '#444',
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
    navigation:{
        position: "absolute",
        top: 0,
        left: 0,
        marginTop: 70,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    }
});

export default Reservations;
