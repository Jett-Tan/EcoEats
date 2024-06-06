import { Text, View, StyleSheet, Image } from "react-native";
import { Link, Redirect, useRouter } from 'expo-router';

import LoginButton from "../components/LoginButton";

export default function Index() {
    const router = useRouter();
    const isSkip = true;
    async function onGoogleButtonPress() {
      
    }

  return (
    
    <View style={styles.container}>
          {/* TODO:: add Icon of the app and create multiple links for login*/}
          <View style={styles.icon}>
            <Image style={{width:381, height: 152}} source={require('../assets/images/icon.jpg')} />
          </View>
          <LoginButton type="Google" onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}/>
          <LoginButton type="Facebook" onPress={()=>{}} />
          <LoginButton type="Apple" onPress={()=>{}}/>
          <LoginButton type="Email" onPress={()=>{router.replace('login')}}/>
          <Text style={styles.paragraph_Box}>
              <Text style={styles.paragraph}>By signing up, you agree to our </Text>
              <Text style={[styles.paragraph,styles.paragraph_Bold]}>Terms of Service</Text> 
              <Text style={styles.paragraph}> and </Text> 
              <Text style={[styles.paragraph,styles.paragraph_Bold]}>Privacy Policy</Text>
          </Text>
          <Text style={styles.paragraph_Box}>
              <Link style={styles.paragraph} href="./signup">Sign up</Link>
          </Text>
          {/* <Link href="./(tabs)/home">move to login</Link> */}

          {
            isSkip 
            && 
            // to change to your own page on load comment out the below line 
            // and uncomment the ur page below it
            <Redirect href="./(tabs)/home"/>
            // <Redirect href="./(tabs)/add"/>
            // <Redirect href="./(tabs)/community"/>
            // <Redirect href="./(tabs)/profile"/>
            // <Redirect href="./(tabs)/rewards"/>
          }
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  icon:{
    width: 381,
    height: 152,
    resizeMode: "cover",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 87,
    overflow: "hidden",
    marginBottom: 100,
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
});