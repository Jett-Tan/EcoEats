import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import MapView, { MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';

import { PressableIcon } from '@/components/navigation/PressableIcon';
import  CustomButton  from '@/components/CustomButton';
import { Icon } from '@/components/navigation/Icon';
import Input from '@/components/Input';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SellPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [instructions, setInstructions] = useState("");

    const region ={
        latitude: 1.290270, 
        longitude: 103.851959,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const mapRef = React.useRef<MapView>(null); // Declare the 'mapRef' variable
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                router.back()
            }
            let locationa = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.High  , timeInterval: 100, distanceInterval: 1});
            setLatitude(locationa.coords.latitude);
            setLongitude(locationa.coords.longitude);
            await mapRef.current?.animateCamera({center: {latitude:latitude, longitude:longitude}, zoom: 15})
        })();
    }, []);
    const timeInterval = setInterval(() => {
        latitude !== 0 && longitude !== 0 && mapRef.current?.animateCamera({center: {latitude:latitude, longitude:longitude}, zoom: 15});
    }, 1000);

    const router = useRouter();
    const handleAddPhoto = () => {console.log("add photo")}
    // const db = getDatabase();
    // function writeUserData() {
    //     set(ref(db, 'users/' + auth.currentUser?.uid + '/myPreferences'), {
    //         myPreferences,
    //     });
    // }
    // get(ref(db, `users/`+ auth.currentUser?.uid)).then((snapshot) => {
    // if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     setName(snapshot.val().firstName);
    // } else {
    //     console.log("No data available");
    // }
    // }).catch((error) => {
    //     console.error("error", error);
    // });
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.navigation,{zIndex:10}]}>
                    <PressableIcon onPress={() => {router.dismiss(2)}} size={30} name="arrow-back-outline" />
                </View>
                <View style={[styles.navigation,{justifyContent:"center"}]}>
                    <Text style={{fontSize:24,fontWeight:"bold"}}>Sell your item</Text>
                </View>
                <View style={{marginVertical:100}}>
                    <TouchableOpacity style={{marginVertical:20,borderWidth:1,borderRadius:10,width:300, height:100,alignItems:"center",justifyContent:"center", borderStyle:"dashed", borderColor:"lightgrey"}} onPress={handleAddPhoto}>
                        <View style={{flexDirection:"column", justifyContent:'center',alignItems:"center"}}>
                            <Icon name='camera-outline' size={30}/>
                            <Text style={{fontSize:20}}>Add a Photo</Text>
                        </View>
                    </TouchableOpacity>
                <View style={{height:500}}>
                    <ScrollView>
                        <Input
                            placeholder="Enter title"
                            value={title}
                            type="Title"
                            onChangeText={setTitle}
                            header={true}
                        />
                        <Input
                            placeholder="e.g. 5 servings of curry chicken"
                            value={description}
                            type="Description"
                            onChangeText={setDescription}
                            header={true}
                        />
                        <Input
                            placeholder="Enter quantity"
                            value={quantity}
                            type="Quantity"
                            onChangeText={setQuantity}
                            header={true}
                        />
                        <Input
                            placeholder="Enter price"
                            value={price}
                            type="Price"
                            onChangeText={setPrice}
                            header={true}
                        />
                        <Input
                            placeholder="e.g. Please ring door bell"
                            value={instructions}
                            type="Instructions"
                            onChangeText={setInstructions}
                            header={true}
                        />
                        <View>
                            <Text style={styles.input_Title}>Location</Text>
                            <View style={{borderRadius:10}}>
                                <MapView style={{width:300, height:150}} showsUserLocation initialRegion={region} ref={mapRef}>
                                {latitude !== 0 && longitude !== 0 && <MapMarker coordinate={{
                                    latitude:latitude,
                                    longitude: longitude,
                                }}
                                />}
                                </MapView>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={{position:"absolute",marginBottom:50,left:0,bottom:0,width:"100%",alignItems:"center"}}>
                <CustomButton 
                text="Add Now"
                type=""
                onPress={() => {
                    // writeUserData();
                    router.dismiss(2)
                }}
                style={{buttonContainer: {backgroundColor:"#3BAE6F"},button: {},text: styles.button_Text}}
                />
            </View>
        </View>
        </>
    );
}
const styles = StyleSheet.create({
  input_Title:{
        paddingLeft:10,
        fontSize:16,
        marginBottom:4,
        fontWeight:"bold",
    },
    button:{
        backgroundColor:"#4BB469",
        borderRadius:5,
        padding:10,
        width:300,
        maxWidth:383,
        minWidth:300,
        alignItems:"center",
        marginBottom:24,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
    },
    button_Text:{
        color:"#FFF",
        fontSize:16,
        fontWeight:"bold",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // padding: 8,
    },
    icon:{
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
    paragraph_Box:{
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"#000000",
        opacity:0.4
    },
    paragraph_Bold: {
        color:"#4BB469",
        fontWeight: 'bold',
        textAlign: 'center',
        opacity:1
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