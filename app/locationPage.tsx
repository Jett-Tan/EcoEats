import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import { child, get, getDatabase, onValue, push, ref,update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapMarker, Marker } from 'react-native-maps';

import CustomButton from '@/components/CustomButton';
import Input from "@/components/Input";
import { DiscountedMeals, ShareMeals } from "@/components/addData";
import { auth } from '@/components/auth/firebaseConfig';
import { PressableIcon } from "@/components/navigation/PressableIcon";

type Item = {
    id: string;
    type: 'Discounted' | 'Surplus';
    item: DiscountedMeals | ShareMeals;
    bookmarked: boolean;
};

export default function LocationPage() {
    const [discountedItems, setDiscountedItems] = useState<Item[]>([]);
    const [surplusItems, setSurplusItems] = useState<Item[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<Item>();

    const router = useRouter();
    const [region, setRegion] = useState({
        latitude: 1.290270,
        longitude: 103.851959,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    // const mapRef = React.useRef<MapView>(null); // Declare the 'mapRef' variable

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                router.back()
            }
            let locationa = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.High, timeInterval: 100, distanceInterval: 1 });
            setLatitude(locationa.coords.latitude);
            setLongitude(locationa.coords.longitude);
        })();

        (async () => {
            const db = getDatabase();
            const discountedItemsRef = ref(db, 'items/discounted');
            const surplusItemsRef = ref(db, 'items/surplus');

            onValue(discountedItemsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // console.log(data);
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
                    // console.log(data);
                    const items: Item[] = Object.keys(data).map(key => ({
                        id: key,
                        type: 'Surplus',
                        item: data[key],
                        bookmarked: false // Initial bookmarked status
                    }));
                    setSurplusItems(items);
                }
            });
        })()
    }, []);

    const search = async (val: string) => {
        // console.log(val);
        await fetch(
            "https://www.onemap.gov.sg/api/common/elastic/search?searchVal=" + val + "&returnGeom=Y&getAddrDetails=Y&pageNum=1",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (response) => {
                const data = await response.json();
                // console.log(data);

                setLatitude(Number.parseFloat(data.results[0].LATITUDE));
                setLongitude(Number.parseFloat(data.results[0].LONGITUDE));

                setRegion({
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01, latitude: Number.parseFloat(data.results[0].LATITUDE), longitude: Number.parseFloat(data.results[0].LONGITUDE)
                });
            }).catch((error) => { console.log("error") });
    }
    // const timeInterval = setInterval(() => {
    //     latitude !== 0 && longitude !== 0 && mapRef.current?.animateCamera({center: {latitude:latitude, longitude:longitude}, zoom: 15});
    // }, 1000);

    // clearInterval(timeInterval); 

    const reserve = async (id: string) => {
        const dbRef = ref(getDatabase());
        const newPostKey = push(child(ref(getDatabase(), `users/${auth.currentUser?.uid}`), '/myReservations')).key;
        const currReservation =
            get(child(dbRef, `users/${auth.currentUser?.uid}/myReservations`)).then((snapshot) => {
                let updates:any = {}
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    if (!snapshot.val().includes(id)) {
                        updates['/myReservations/'] = [...snapshot.val(), id];
                    } else {
                        updates['/myReservations/'] = snapshot.val();
                    }
                } else {
                    updates['/myReservations/'] = [id];
                }
                update(ref(getDatabase(), `users/${auth.currentUser?.uid}`), updates)
            }).catch((error) => {
                console.error(error);
            });

    }


    return (
        <><Stack.Screen options={{ title: '', headerBackTitleVisible: false }} /><View style={styles.container}>
            <View style={[styles.navigation, { backgroundColor: "white", width: "100%", alignItems: "center", flexDirection: "column" }]}>
                <Text style={[styles.paragraph_Bold, { alignSelf: "flex-start", width: "100%", textAlign: "center" }]}>Map</Text>
                <View>
                    <Input
                        type="Location"
                        placeholder="Enter your postal code"
                        style={{ inputBox: { marginTop: 10, width: 350, borderWidth: 1, borderColor: "black" }, input: {} }}
                        header={false}
                        onChangeText={(e:string) => search(e)} />
                </View>
            </View>
            <View style={[{ marginTop: 110, width: "100%", height: 950, zIndex: -10, position: "absolute", bottom: 0 }]}>
                <MapView style={{ width: "100%", height: "100%" }} showsUserLocation region={region}>
                    {discountedItems && discountedItems.map((item) => (
                        <TouchableOpacity style={styles.markerContainer}
                            onPress={() => {
                                // console.log("Clicked", item.id),
                                    setModalItem(item);
                                setModalVisible(true);
                            } }><Marker
                                key={item.id}
                                coordinate={{
                                    latitude: item.item.latitude,
                                    longitude: item.item.longitude,
                                }}
                            >
                                <View style={styles.marker}>
                                    <Image src={item.item.photoUrl} style={styles.markerImage}></Image>
                                </View>
                            </Marker>
                        </TouchableOpacity>
                    ))}
                    {surplusItems && surplusItems.map((item) => (
                        <TouchableOpacity style={styles.markerContainer}
                            onPress={() => {
                                console.log("Clicked", item.id),
                                    setModalItem(item);
                                setModalVisible(true);
                            } }>
                            <Marker
                                key={item.id}
                                coordinate={{
                                    latitude: item.item.latitude,
                                    longitude: item.item.longitude,
                                }}
                            >
                                <View style={styles.marker}>
                                    <Image src={item.item.photoUrl} style={styles.markerImage}></Image>
                                </View>
                            </Marker>
                        </TouchableOpacity>
                    ))}
                </MapView>
            </View>
            <Modal visible={modalVisible} transparent={true}>
                <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    </TouchableOpacity>
                    <View style={{ width: "85%", height: "80%", backgroundColor: "white", borderRadius: 10, shadowRadius: 10 }}>
                        <View style={{ padding: 10, height: "100%" }}>
                            <PressableIcon style={{ marginTop: 20 }} onPress={() => { setModalVisible(false); } } size={30} name="arrow-back-outline" />
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
                                                </View>}
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
                                                } }
                                                type=""
                                                style={{
                                                    buttonContainer: {
                                                        width: "100%",
                                                        backgroundColor: "#3BAE6F"
                                                    },
                                                    text: {
                                                        color: "white"
                                                    }
                                                }} />
                                        </ScrollView>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View></>

    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: "#4BB469",
        borderRadius: 5,
        padding: 10,
        width: 300,
        maxWidth: 383,
        minWidth: 300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
    },
    button_Text: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    icon: {
        width: 279,
        height: 111,
        resizeMode: "contain",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 87,
        overflow: "hidden",
        marginBottom: 200,
        marginTop: 50,
    },
    paragraph_Box: {
        marginBottom: 24,
        textAlign: "center",
        flexDirection: "row",
        width: 280,
    },
    paragraph_Box_smaller: {
        marginBottom: 24,
        textAlign: "center",
        flexDirection: "row",
        width: 280,
    },
    paragraph: {
        fontSize: 25,
        color: "#000000",
        opacity: 0.4
    },
    paragraph_Bold: {
        fontSize: 25,
        fontWeight: '600',
        opacity: 1
    },
    paragraph_smaller: {
        fontSize: 16,
    },
    navigation: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    marker: {
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: 25,
        borderColor: '#8B008B',
        borderWidth: 2,
        overflow: 'hidden',
    },
    markerImage: {
        height: 35,
        width: 35,
        borderRadius: 17.5,
    },
    markerContainer: {
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
});