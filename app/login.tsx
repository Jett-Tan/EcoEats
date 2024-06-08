import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Input from "@/components/Input";
import { auth } from "@/components/auth/firebaseConfig";
import { Icon } from "@/components/navigation/Icon";
import CustomButton from '@/components/CustomButton';
export default function Index() {
    const[email, setEmail] = useState('');
    const[emailError, setEmailError] = useState('');
    const[password, setPassword] = useState('');
    const[passwordError, setPasswordError] = useState(''); 
    const[loginError, setLoginError] = useState(''); 
    
    const router = useRouter();
    
    const handleLogin = () => {
        setLoginError('');
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('====================================');
            console.log('User:', user);
            router.push('/(tabs)/home');
            console.log('====================================');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('====================================');
            console.log('Error Code:', errorCode);
            console.log('Error Message:', errorMessage);
            setLoginError(errorCode);
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
            />
            <Input 
                type="Password" 
                placeholder="Enter your Password" 
                value={password} 
                onChangeText={setPassword} 
            />
            <CustomButton text="Login" style={{buttonContainer: styles.button,button: {},text: styles.button_Text}} type="" onPress={handleLogin}/>
            {loginError && <Text style={{color:"red", fontSize:12}}>{loginError}</Text>}
            <Text style={[styles.paragraph_Box,{marginTop:24}]}>
                <Text style={styles.paragraph}>By signing up, you agree to our </Text>
                <Text style={[styles.paragraph,styles.paragraph_Bold]}>Terms of Service</Text> 
                <Text style={styles.paragraph}> and </Text> 
                <Text style={[styles.paragraph,styles.paragraph_Bold]}>Privacy Policy</Text>
            </Text>
            <Text style={styles.paragraph_Box}>
                <Link style={styles.paragraph} href="./signup">Sign up</Link>
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
        marginBottom:0,
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
        marginBottom: 150,
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#dcdcdc',
        borderRadius: 5,
        padding: 5,
        flex: 1,
        textAlign: 'left',
    }
});