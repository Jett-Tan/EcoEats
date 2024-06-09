import { auth } from '@/components/auth/firebaseConfig';
import { View, Text, StyleSheet } from 'react-native';
import ProfilePage from '../(tabs)/profile';
import AddModal from './add';

export default function ProfilePageOverlay() {
  // auth.signOut();
    return (
        <>
          <AddModal/>
          <ProfilePage/>
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