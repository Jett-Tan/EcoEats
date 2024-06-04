import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link} from 'expo-router';
import { useState } from "react";

import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";

export default function Index() {
    const[email, setEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState(''); 

    const handleSignup = () => {
        console.log('====================================');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('====================================');
    }
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Link href={"/"} style={{marginLeft:15}}>
                    <Icon size={30} name="arrow-back-outline" />
                </Link>
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