import { View, Text ,StyleSheet, TextInput} from "react-native"
import { Link, useRouter} from 'expo-router';
import MapView, { MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect} from "react";
import React from "react";

import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";
import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";


export default function ShareLocation() {
    const router = useRouter();
    const region ={
        latitude: 1.290270, 
        longitude: 103.851959,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    }
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const mapRef = React.useRef<MapView>(null); // Declare the 'mapRef' variable
    
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                router.back()
            }
            let locationa = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.High  , timeInterval: 100, distanceInterval: 1});
            setLatitude(locationa.coords.latitude);
            setLongitude(locationa.coords.longitude);
        })();
    }, []);
    const search = async (val: string) => {
        console.log(val);
        await fetch(
            "https://www.onemap.gov.sg/api/common/elastic/search?searchVal="+ val + "&returnGeom=Y&getAddrDetails=Y&pageNum=1",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(async (response) => {
                const data = await response.json();
                setLatitude(Number.parseFloat(data.results[0].LATITUDE));
                setLongitude(Number.parseFloat(data.results[0].LONGITUDE));
            }).catch((error) => {console.log("error")});
    }
    const timeInterval = setInterval(() => {
        latitude !== 0 && longitude !== 0 && mapRef.current?.animateCamera({center: {latitude:latitude, longitude:longitude}, zoom: 15});
    }, 1000);
    
    clearInterval(timeInterval); 
    
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.canGoBack() ? router.back(): {}}} size={30} name="arrow-back-outline" />
            </View>
            <View style={[styles.navigation,{marginTop:110,width:"100%",alignItems:"center", flexDirection:"column"}]}>
                <Text style={[styles.paragraph_Bold,{alignSelf:"flex-start",marginLeft:30}]}>Set your location</Text>
                <View>
                    <Input type="Location" placeholder="Enter your postal code" style={{inputBox:{width:350,borderWidth:1,borderColor:"black"},input:{}}} header={false} onChangeText={(e: any) => search(e)} />
                </View>
            </View>
            <View style={[{marginTop:110,width:"100%",height:950,zIndex:-10,position:"absolute",bottom:0}]}>
                <MapView style={{width:"100%",height:"100%"}} showsUserLocation initialRegion={region} >
                    {latitude !== 0 && longitude !== 0 && <MapMarker coordinate={{
                        latitude:latitude,
                        longitude: longitude,
                    }}
                    />}
                </MapView>
            </View>
            <View style={{position:"absolute",marginBottom:100,left:0,bottom:0,width:"100%",marginLeft:7,alignItems:"center"}}>
                <CustomButton 
                text="Ok, Let's Go!"
                type=""
                style={{buttonContainer: {backgroundColor:"#4BB469",
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowRadius: 5,},button: {},text: styles.button_Text}}
                onPress={() => {
                    clearInterval(timeInterval); 
                    router.push("./(tabs)/home")
                }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    button:{
        backgroundColor:"#4BB469",
        borderRadius:5,
        padding:10,
        width:300,
        maxWidth:383,
        minWidth:300,
        alignItems:"center",
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
        backgroundColor: '#ecf0f1',
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
        textAlign:"center",
        flexDirection: "row",
        width: 280,
    },
    paragraph_Box_smaller:{
        marginBottom: 24,
        textAlign:"center",
        flexDirection: "row",
        width: 280,
    },
    paragraph: {
        fontSize: 25,
        color:"#000000",
        opacity:0.4
    },
    paragraph_Bold: {
        fontSize: 25,
        fontWeight: '600',
        opacity:1
    },
    paragraph_smaller:{
        fontSize: 16,
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