import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AddTab() {
    const [modalVisible, setModalVisible] = useState(true);
    const toggleModal = () => { setModalVisible(!modalVisible) }
    if (modalVisible === false) {
      toggleModal();
    }
    return (
      <Modal
      visible = {modalVisible}
      transparent={true}
      >
        <View style={{backgroundColor:"black", width:'100%',height:"60%", opacity:0.5}}>
        </View>
          <View style={{
            width:"100%",
            height:"40%",
            backgroundColor:"#fff",
            justifyContent:"center",
            alignItems:"center",
            borderTopRightRadius:50,
            borderTopLeftRadius:50
          }}>
            <Text>add</Text>
            <Button title="close" onPress={() => 
              {
                toggleModal();
                router.back();
              }}/>
          </View>
      </Modal>
    );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});