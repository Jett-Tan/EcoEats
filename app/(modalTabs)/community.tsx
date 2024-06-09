import { View, Text, StyleSheet } from 'react-native';
import CommunityTab from '../(tabs)/community';
import AddModal from './add';
export default function CommunityaTab() {
    return (
      <>
        <AddModal/>
        <CommunityTab/>
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