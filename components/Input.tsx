import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Icon } from "./navigation/Icon";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TestProps {
    type:"Email" | "Password" | "Phone" | "Name" | "Username" | "Address" | "City" | "State" | "Country" | "First Name" | "Last Name" | "Date of Birth" | "Gender",
    placeholder?:string,
    value?:string,
    onChangeText?:Function,
    error?:String,
    catchError?:Function,
    style?:{inputBox:Object, input:Object}
}

const defaultProps: TestProps = {
    type:"Email" ,
    placeholder:"",
    value:"",
    onChangeText:(e)=>{console.log("changed")},
    error:"",
    catchError:(e) => {console.log("changed")},
    style:{inputBox:{}, input:{}}
}

export default function Input(props = defaultProps) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <View style={styles.input_Container}>
                <Text style={styles.input_Title}>{props.type}</Text>
                <View style={[styles.input_Box, props.style?.inputBox]} >
                    <TextInput 
                        style={[styles.input, props.style?.input]}
                        value={props.value} 
                        placeholder={props.placeholder}
                        placeholderTextColor="#A9A9A9"
                        secureTextEntry={props.type === "Password" && !visible}
                        onChangeText={(e) => {
                            props.onChangeText(e);
                            props.catchError}} 
                    />
                    {props.type ==="Password" && <Icon 
                        size={20} 
                        name={visible ? "eye-off-outline" : "eye-outline"} 
                        onPress={() => setVisible(!visible)} 
                    />
                    }
                </View>
                {props.type === "Password" && <Text style={{color:"#000", fontSize:12,paddingTop:5, paddingLeft:10}}>Include at least 6 characters</Text>}
                {props.error && <Text style={{color:"red", fontSize:12, paddingLeft:10}}>{props.error}</Text>}
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    input:{
        width:265,
        fontSize:16,
    },
    input_Box:{
        padding:10,
        width:300,
        maxWidth:383,
        minWidth:300,
        fontSize:16,
        backgroundColor:"#F5F4F4",
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center",
    },
    input_Container:{
        marginBottom:12,
    },
    input_Title:{
        paddingLeft:10,
        fontSize:16,
        marginBottom:4,
        fontWeight:"bold",
    }
});