import { View, Text ,StyleSheet, TextInput} from "react-native"
import { Link, useRouter} from 'expo-router';
import MapView, { MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import React,{ useState, useEffect} from "react";
import { getDatabase, onValue, ref, update } from "firebase/database";

import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";
import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";
import { DiscountedMeals, ShareMeals } from "@/components/addData";

type Item = {
  id: string;
  type: 'Discounted' | 'Surplus';
  item: DiscountedMeals | ShareMeals;
  bookmarked: boolean;
};

export default function LocationPage() {
    const [discountedItems, setDiscountedItems] = useState<Item[]>([]);
    const [surplusItems, setSurplusItems] = useState<Item[]>([]);

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
            let locationa = await Location.getCurrentPositionAsync({accuracy: Location.LocationAccuracy.High  , timeInterval: 100, distanceInterval: 1});
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
        })()
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
                console.log(data);
                
                setLatitude(Number.parseFloat(data.results[0].LATITUDE));
                setLongitude(Number.parseFloat(data.results[0].LONGITUDE));
                
                setRegion({latitudeDelta: 0.01,
                    longitudeDelta: 0.01, latitude: Number.parseFloat(data.results[0].LATITUDE), longitude: Number.parseFloat(data.results[0].LONGITUDE)});
            }).catch((error) => {console.log("error")});
    }
    // const timeInterval = setInterval(() => {
    //     latitude !== 0 && longitude !== 0 && mapRef.current?.animateCamera({center: {latitude:latitude, longitude:longitude}, zoom: 15});
    // }, 1000);
    
    // clearInterval(timeInterval); 
    
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
                <MapView style={{width:"100%",height:"100%"}} showsUserLocation region={region}>
                    {discountedItems && discountedItems.map((item:Item) => <MapMarker key={item.id} coordinate={{
                        latitude:item.item.latitude,
                        longitude: item.item.longitude,
                    }}
                    />)}
                    {surplusItems && surplusItems.map((item:Item) => <MapMarker key={item.id} coordinate={{
                        latitude:item.item.latitude,
                        longitude: item.item.longitude,
                    }}
                    />)}
                </MapView>
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