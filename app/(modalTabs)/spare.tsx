import { auth } from '@/components/auth/firebaseConfig';
import { View, Text, StyleSheet } from 'react-native';

export default function SpareTab() {
  // auth.signOut();
    return (
        <View style={styles.container}>
            <Text>unReachable</Text>
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