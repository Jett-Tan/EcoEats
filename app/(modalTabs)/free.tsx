import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getDatabase, ref, get, set, child, onValue,push, update } from "firebase/database";
import { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import MapView, { MapMarker } from 'react-native-maps';
import * as Location from 'expo-location';
import React from 'react';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { auth } from '@/components/auth/firebaseConfig';
import { PressableIcon } from '@/components/navigation/PressableIcon';
import  CustomButton  from '@/components/CustomButton';
import { Icon } from '@/components/navigation/Icon';
import Input from '@/components/Input';
import { ShareMeals, LocationData } from '../../components/addData';

export default function FreePage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [instructions, setInstructions] = useState("");
    const [location, setLocation] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [instructionsError, setInstructionsError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [photoUrlError, setPhotoUrlError] = useState("");     

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
    const db = getDatabase();
    async function writeUserData() {
        const data = JSON.stringify({
            "email": "tanjianfeng01@gmail.com",
            "password": "EcoEatsPass123!"
        });
        const accessToken = await fetch(
            "https://www.onemap.gov.sg/api/auth/post/getToken",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            })
            .then(async (response) => {
                const data = await response.json();
                console.log(data);
                return data.access_token;
            }).catch((error) => {console.log("error")});  
        console.log(latitude, longitude);
        
        const locationtemp:LocationData = await fetch(
            "https://www.onemap.gov.sg/api/public/revgeocode?location="+latitude+"%2C"+longitude+"&buffer=40&addressType=All&otherFeatures=N",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken
                },
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                const locations:LocationData = {
                    Block: data.GeocodeInfo[0].BLOCK,
                    Road: data.GeocodeInfo[0].ROAD,
                    PostalCode: data.GeocodeInfo[0].POSTALCODE,
                    UnitNumber:location
                };
                return locations;
            }).catch((error) => {
                console.log("error");
                const locations:LocationData = {
                    Block: "",
                    Road: "",
                    PostalCode: "",
                    UnitNumber:location
                };
                return locations;});
            

        const postData:ShareMeals = {
            title: title,
            photoUrl:photoUrl,
            user_id: auth.currentUser?.uid || "",
            description: description,
            quantity: quantity,
            instructions: instructions,
            location: locationtemp,
            latitude: latitude,
            longitude: longitude,
            rating: 5
        };
        if (isDataValid() && dataValidation.locationChecker(locationtemp)) {
            console.log('====================================');
            console.log("valid");
            console.log('====================================');
            const newPostKey = push(child(ref(db), 'items/surplus')).key;
            const updates:any = {};
            set(ref(db, 'items/surplus/' + newPostKey), postData);
            router.dismiss(2)
        }
    }
    const isDataValid = () => {
        dataValidation.titleError(title);
        dataValidation.descriptionError(description);
        dataValidation.quantityError(Number(quantity));
        dataValidation.instructionsError(instructions);
        dataValidation.locationError(location);
        dataValidation.photoUrlError(photoUrl);
        if (title!==""&& 
            titleError === "" && 
            descriptionError === "" &&
            quantityError === "" &&
            instructionsError === "" &&
            locationError === "" &&
            photoUrlError === "" &&
            descriptionError === "" && 
            quantityError === "" && 
            instructionsError === "" && 
            locationError === "" && 
            photoUrlError === "") {
            return true;
        } else {
            return false;
        }
    }
    const dataValidation = {
        locationChecker: (e:LocationData) => {
            if(e.Block === "" || e.Road === "" || e.PostalCode === "") {
                return false
            } else {
                return true
            }
        },
        titleError:(e:string) => {
            if(e === "") {
                setTitleError("title is Required")
            } else {
                setTitleError('')
            }
        },
        descriptionError:(e:string) => {
            if(e === "") {
                setDescriptionError("description is Required")
            } else {
                setDescriptionError('')
            }
        },
        quantityError:(e:number) => {
            if(e === 0) {
                setQuantityError("quantity is Required")
            } else {
                setQuantityError('')
            }
        },
        instructionsError:(e:string) => {
            if(e === "") {
                setInstructionsError("instructions is Required")
            } else {
                setInstructionsError('')
            }
        },
        locationError:(e:string) => {
            if(e === "") {
                setLocationError("location is Required")
            } else {
                setLocationError('')
            }
        },
        photoUrlError:(e:string) => {
            if(e === "") {
                setPhotoUrlError("photoUrl is Required")
            } else {
                setPhotoUrlError('')
            }
        },
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const imageUrl = result?.assets?.[0]?.uri ?? ''; // Extracting URI from assets
            const base64 = await FileSystem.readAsStringAsync(imageUrl, { encoding: 'base64' });
            setPhotoUrl("data:image/jpeg;base64,"+ base64);
        }
    };
    return (
      <>
        <View style={styles.container}>
            <View style={[styles.navigation,{zIndex:10}]}>
                    <PressableIcon onPress={() => {router.dismiss(2)}} size={30} name="arrow-back-outline" />
                </View>
                <View style={[styles.navigation,{justifyContent:"center"}]}>
                    <Text style={{fontSize:24,fontWeight:"bold"}}>Free item</Text>
                </View>
            <View style={{marginVertical:100}}>
                <TouchableOpacity style={{marginVertical:20,borderWidth:1,borderRadius:10,width:300, height:100,alignItems:"center",justifyContent:"center", borderStyle:"dashed", borderColor:"lightgrey"}} onPress={pickImage}>
                    {!photoUrl &&
                        <View style={{flexDirection:"column", justifyContent:'center',alignItems:"center"}}>
                        <Icon name='camera-outline' size={30}/>
                        <Text style={{fontSize:20}}>Add a Photo</Text>
                    </View>}
                    {photoUrl && <Image source={{uri:photoUrl}} style={{width:300, height:100, borderRadius:10}}/>}
                </TouchableOpacity>
                <View style={{height:500}}>
                    <ScrollView>
                        <Input
                            placeholder="Enter title"
                            value={title}
                            type="Title"
                            onChangeText={setTitle}
                            error={titleError}
                            catchError={(e:string) => dataValidation.titleError(e)}
                            header={true}
                        />
                        <Input
                            placeholder="e.g. 5 servings of curry chicken"
                            value={description}
                            type="Description"
                            onChangeText={setDescription}
                            error={descriptionError}
                            catchError={(e:string) => dataValidation.descriptionError(e)}
                            header={true}
                        />
                        <Input
                            placeholder="Enter quantity"
                            value={quantity}
                            type="Quantity"
                            onChangeText={setQuantity}
                            error={quantityError}
                            catchError={(e:number) => dataValidation.quantityError(e)}
                            header={true}
                        />
                        <Input
                            placeholder="e.g. Please ring door bell"
                            value={instructions}
                            type="Instructions"
                            onChangeText={setInstructions}
                            error={instructionsError}
                            catchError={(e:string) => dataValidation.instructionsError(e)}
                            header={true}
                        />
                        <View>
                            <Text style={styles.input_Title}>Location</Text>
                            <Input 
                                type="Location" 
                                placeholder="Enter your unit number" 
                                header={false} 
                                onChangeText={(e: any) => setLocation(e)} 
                            />
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
                    writeUserData();
                    
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