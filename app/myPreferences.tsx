import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter} from 'expo-router';
import { useState } from "react";

import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";
import Interests from "@/components/Interests";

export default function Index() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();
    
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.canGoBack()? router.back(): {}}} size={30} name="arrow-back-outline" />
            </View>
            <View style={{alignItems:"center",position: "absolute",
                top: 0,
                left: 0,
                marginLeft:"35%",
                width:"30%",
                marginTop:70,
                height:30,
                justifyContent:"center"}}>
                <Text style={{textAlign:"center",fontSize:16, fontWeight:"bold"}}>My Preferences</Text>
            </View>
            <View style={{marginTop:50,width:300}}>
                <Text>Hi John</Text>
                <Text style={{opacity:0.5}}>Choose a few categories to get started</Text>
            </View>
            <Interests/>
            <View style={{position:"absolute",marginBottom:100,left:0,bottom:0,marginLeft:7,width:"100%",alignItems:"center"}}>
                <CustomButton 
                text="Add Now"
                type=""
                onPress={() => {router.push("./shareLocation")}}
                style={{buttonContainer: {backgroundColor:"#3BAE6F"},button: {},text: styles.button_Text}}
                />
            </View>
        </View>
    );
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