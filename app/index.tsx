import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Link, useNavigation } from 'expo-router';

export default function Index() {
  
  return (
     <SafeAreaView style={styles.container}>
        {/* TODO:: add Icon of the app and create multiple links for login*/}
        <Text>My App</Text>
        
        <Link href="./(tabs)/home">View first user details</Link>
    </SafeAreaView>
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