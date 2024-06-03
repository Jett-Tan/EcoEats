import { Text, View, SafeAreaView, StyleSheet, Button } from "react-native";
import { Link, useRouter, Redirect } from 'expo-router';

export default function Index() {
  const router = useRouter();
  
  const login = () => {
    router.replace('./(tabs)/home');
  }
  return (
     <View style={styles.container}>
        {/* TODO:: add Icon of the app and create multiple links for login*/}
        <Text>My App</Text>
        <Button 
        title="Login"
        onPress={login}/>
        {/* <Link href="./(tabs)/home">move to login</Link> */}
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});