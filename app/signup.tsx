import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter } from 'expo-router';
import { useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";
import { auth } from "@/components/auth/firebaseConfig";

export default function Index() {
    const[email, setEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState(''); 
    
    const [signupError,setSignupError] = useState('');

    const router = useRouter();
    
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('====================================');
            console.log('User:', user);
            router.push('/createProfile');
            console.log('====================================');
        }).catch((error) => {
            const errorCode:string = error.code;
            const errorMessage = error.message;
            console.log('====================================');
            setSignupError(errorCode.replace('auth/','').split('-').join(' '));
            console.log('====================================');
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Link href={"/"} style={{marginLeft:15}}>
                    <Icon size={30} name="arrow-back-outline" />
                </Link>
            </View>
            <View style={styles.icon}>
                <Image style={{width:381, height: 152}} source={require('../assets/images/icon.jpg')} />
            </View>
            <Input 
                type="Email" 
                placeholder="Enter your Email" 
                value={email} 
                onChangeText={setEmail} 
                error={emailError} 
                catchError={(e:string) => {e.includes("@") && e.includes(".") ? setEmailError('') : setEmailError("Please enter a valid email")}}
            />
            <Input 
                type="Password" 
                placeholder="Set a Password" 
                value={password} 
                onChangeText={setPassword} 
                error={passwordError} 
                catchError={(e:string) => {e.length < 6 ? setPasswordError("Password must be at least 6 characters") : setPasswordError('')}}
            />
            <Pressable onPress={handleSignup}>
                <View style={styles.button}>
                    <Text style={styles.button_Text}>Create Account</Text>
                </View>
            </Pressable>
            {signupError ? <Text style={{color:"red",textTransform:"capitalize", fontSize:12}}>{signupError}</Text> : null}
            <Text style={styles.paragraph_Box}>
                <Text style={styles.paragraph}>Already have an account? </Text>
                <Text style={[styles.paragraph,styles.paragraph_Bold]}>
                    <Link href={"/"}>
                        Log in
                    </Link>
                </Text>
            </Text>
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