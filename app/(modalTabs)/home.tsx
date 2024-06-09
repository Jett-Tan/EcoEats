import { auth } from '@/components/auth/firebaseConfig';
import { View, Text, StyleSheet } from 'react-native';
import HomeTab from '../(tabs)/home';
import AddModal from './add';

export default function HomeTabOverlay() {
  // auth.signOut();
    return (
        <>
          <AddModal/>
          <HomeTab/>
        </>
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