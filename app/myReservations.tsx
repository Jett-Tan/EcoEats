import { PressableIcon } from '@/components/navigation/PressableIcon';
import { Stack } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { child, get, getDatabase, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Reservation {
    id: string;
    dish: string;
    image: string;
    address: string;
    rating: number;
}

interface Item {
    title: string;
    location: {
        Road: string;
        Block: string;
        UnitNumber: string;
        PostalCode: string;
    };
    rating: number;
    photoUrl: string;
    description: string;
    quantity: number;
    latitude: number;
    longitude: number;
    instructions: string;
}

const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalItem, setModalItem] = useState<Item | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setError('User not authenticated.');
                return;
            }

            try {
                console.log(`Fetching reservations for user: ${userId}`);
                const db = getDatabase();
                const dbRef = ref(db);
                const reservationsSnapshot = await get(child(dbRef, `users/${userId}/myReservations`));

                if (reservationsSnapshot.exists()) {
                    console.log('Reservations data exists');
                    const reservationsData = reservationsSnapshot.val();
                    const itemPromises = reservationsData.map(async (key: string) => {
                        let itemSnapshot = await get(child(dbRef, `items/discounted/${key}`));
                        if (!itemSnapshot.exists()) {
                            itemSnapshot = await get(child(dbRef, `items/surplus/${key}`));
                        }
                        if (itemSnapshot.exists()) {
                            console.log(`Item ${key} found`);
                            return { id: key, ...itemSnapshot.val() };
                        } else {
                            console.log(`Item ${key} does not exist in both discounted and surplus`);
                        }
                        return null;
                    });

                    const reservationsList = (await Promise.all(itemPromises)).filter(item => item !== null);
                    console.log('Reservations list:', reservationsList);
                    setReservations(reservationsList as Reservation[]);
                    setFilteredReservations(reservationsList as Reservation[]);
                } else {
                    console.log("No reservations data available");
                    setError("No reservations data available");
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Permission denied or another error occurred.');
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredReservations(reservations);
        } else {
            const filtered = reservations.filter(reservation => 
                reservation.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reservation.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredReservations(filtered);
        }
    }, [searchTerm, reservations]);

    const renderItem = ({ item }: { item: Reservation }) => (
        <TouchableOpacity onPress={() => { setModalItem(item as unknown as Item); setModalVisible(true); }}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.dish}</Text>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.rating}>{item.rating} ⭐</Text>
            </View>
        </TouchableOpacity>
    );

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <>
            <Stack.Screen options={{ title: 'My Reservations', headerBackTitleVisible: false, headerSearchBarOptions: { placeholder: 'Search' } }} />
            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor= '#a0a0a0'
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

            <FlatList
                data={filteredReservations}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />

            {modalItem && (
                <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
                    <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        </TouchableOpacity>
                        <View style={{ width: "85%", height: "80%", backgroundColor: "white", borderRadius: 10, shadowRadius: 10 }}>
                            <View style={{ padding: 10, height: "100%" }}>
                                <PressableIcon style={{ marginTop: 20 }} onPress={() => { setModalVisible(false) }} size={30} name="arrow-back-outline" />
                                <View style={{ width: "100%", height: '80%' }}>
                                    <View style={[styles.itemHeader, { width: '100%', height: "15%", flexDirection: "row", alignItems: "flex-start" }]}>
                                        <View style={[styles.itemTextContainer, { width: "80%" }]}>
                                            <Text style={[styles.itemTitle, { fontSize: 24 }]}>{modalItem.title}</Text>
                                            <Text style={[styles.itemLocation, { flexWrap: "wrap" }]}>
                                                <Text>{modalItem.location.Road}, </Text>
                                                <Text>{modalItem.location.Block}, </Text>
                                                <Text>{modalItem.location.UnitNumber}, </Text>
                                                <Text>{modalItem.location.PostalCode}</Text>
                                            </Text>
                                        </View>
                                        <Text style={[styles.itemRating, { fontSize: 20 }]}>{modalItem.rating.toFixed(1)} ⭐</Text>
                                    </View>
                                    <View style={{ width: "100%", height: "100%" }}>
                                        <ScrollView>
                                            <Image source={{ uri: modalItem.photoUrl }} style={{ marginBottom: 10, borderWidth: 1, borderColor: "black", width: "100%", height: 200 }} />
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.itemTitle}>Description</Text>
                                                <Text>{modalItem.description}</Text>
                                            </View>
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.itemTitle}>Quantity</Text>
                                                <Text>{modalItem.quantity}</Text>
                                            </View>
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.itemTitle}>Instructions</Text>
                                                <Text>{modalItem.instructions}</Text>
                                            </View>
                                            <View style={styles.itemContainer}>
                                                <Text style={styles.itemTitle}>Location</Text>
                                                <MapView style={{ width: "100%", height: 200, borderWidth: 1, borderColor: "black" }} region={{ latitude: modalItem.latitude, longitude: modalItem.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
                                                    <Marker coordinate={{ latitude: modalItem.latitude, longitude: modalItem.longitude }} />
                                                </MapView>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
});

export default Reservations;
