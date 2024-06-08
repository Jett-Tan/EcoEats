import { View, Text ,StyleSheet} from "react-native"
import { Link, useRouter} from 'expo-router';
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import { getDatabase, ref, get } from "firebase/database";

import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";
import { Icon } from "@/components/navigation/Icon";
import { auth } from "@/components/auth/firebaseConfig";

export default function ShareLocation() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    
    const db = getDatabase();
    get(ref(db, `users/`+ auth.currentUser?.uid)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        setName(snapshot.val().firstName);
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error("error", error);
    });
    const onClickNext = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        } else {
            router.push("/setLocation")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.back()}} size={30} name="arrow-back-outline" />
            </View>
            <Icon size={100} name="location-sharp" style={{color:"#4BB49D"}}/>
            <Text style={styles.paragraph_Box}>
                <Text style={styles.paragraph_Bold}>Hi, {name}!</Text>
            </Text>
            <Text style={styles.paragraph_Box}>
                <Text style={styles.paragraph_Bold}>Before you can share your bites, we need to know your location</Text>
            </Text>
            <Text style={[styles.paragraph_Box,styles.paragraph_Box_smaller,{marginBottom:200}]}>
                <Text style={[styles.paragraph,styles.paragraph_smaller]}>So we can show </Text>
                <Text style={[styles.paragraph_Bold,styles.paragraph_smaller]}>nearby listings</Text>
                <Text style={[styles.paragraph,styles.paragraph_smaller]}> & how many </Text>
                <Text style={[styles.paragraph_Bold,styles.paragraph_smaller]}>other people</Text>
                <Text style={[styles.paragraph,styles.paragraph_smaller]}> are waiting to share with you</Text>
            </Text>
            <View style={{position:"absolute",marginBottom:100,left:0,bottom:0,marginLeft:7,width:"100%",alignItems:"center"}}>
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
                onPress={() => {onClickNext()}}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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
        padding: 8,
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