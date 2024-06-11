import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Icon, Fa6Icon } from '@/components/navigation/Icon';
import CustomButton from '@/components/CustomButton';

export default function AddModal(props:{modalVisible:boolean, toggleVisible:Function}) {
    const router = useRouter();
    return (
        <Modal
          visible = {props.modalVisible}
          transparent={true}
          animationType='slide'
        >
          <TouchableOpacity style={{backgroundColor:"black", width:'100%',height:"100%", opacity:0.5}} onPress={() => router.back()}></TouchableOpacity>
          <View style={{
            width:"100%",
            height:"30%",
            backgroundColor:"#fff",
            justifyContent:"center",
            alignItems:"center",
            position:"absolute",
            bottom:0,
            left:0,
            borderTopRightRadius:50,
            borderTopLeftRadius:50
          }}>
            <View >
              <TouchableOpacity style={{alignItems:"center",flexDirection:"row",marginVertical:20}} onPress={() => {
                  router.navigate("free")
                  props.toggleVisible()
              }}> 
                <View style={{width:50}}>
                  <Fa6Icon name={'hand-holding-heart'} size={40}/>
                </View>
                <View style={{flexDirection:"column",marginLeft:30}}>
                  <Text style={{fontSize:30}}>Free</Text>
                  <Text style={{fontSize:16,opacity:0.3}}>Give away free items.</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems:"center",flexDirection:"row",marginVertical:20}} 
                onPress={() => {
                  router.navigate("sell")
                  props.toggleVisible()
                  
                }}>
                <View style={{width:50}}>
                  <Fa6Icon name={'tag'} size={40} />
                </View>
                <View style={{flexDirection:"column",marginLeft:30}}>
                  <Text style={{fontSize:30}}>Sell</Text>
                  <Text style={{fontSize:16,opacity:0.3}}>Sell items at a discounted price.</Text>
                </View>
              </TouchableOpacity>
              <CustomButton type="Cancel" style={{buttonContainer: styles.buttonContainer,button: {marginVertical:0,},text: styles.text}} onPress={() => router.back()} />
            </View>
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

  buttonContainer: {
    borderRadius:0,
    borderWidth:0,
    marginVertical:0,
  },
  text:{
    fontSize:20,
    fontWeight:"light",
    textAlign:"center",
    color:"red"
  }
});