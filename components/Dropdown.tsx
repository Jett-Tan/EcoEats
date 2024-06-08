import { SetStateAction, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Icon } from "./navigation/Icon";
import moment from "moment";  
import { SelectList } from 'react-native-dropdown-select-list'
import { onValue } from "firebase/database";

interface TestProps {
    type:"Gender",
    placeholder?:string,
    value?:string,
    onChangeText?:Function,
    style?:{inputBox:Object, input:Object}
}

const defaultProps: TestProps = {
    type:"Gender" ,
    placeholder:"",
    value:"",

    style:{inputBox:{}, input:{}}
}



export default function DropdownInput(this: any, props = defaultProps) {    
    const [selected, setSelected] = useState(props.value);

    const data = [
        {key:'1', value:'Male'},
        {key:'2', value:'Female'},
        {key:'3', value:'Others'},
    ]
    return (
        <>
            <View style={styles.input_Container}>
                <Text style={styles.input_Title}>Gender</Text>
                <View style={[styles.input_Box, props.style?.inputBox]} > 
                    <SelectList 
                        onSelect={() => {
                            console.log(selected); 
                            props.onChangeText && props.onChangeText(selected)
                            console.log(props.onChangeText && props.onChangeText(selected));
                            
                        }}
                        
                        setSelected={(val: any) => {setSelected(val); props.onChangeText && props.onChangeText(val)}} 
                        data={data} 
                        search={false}
                        boxStyles={[styles.input,{borderWidth:0, margin:0,padding:0}]} //override default styles
                        save="value"
                        placeholder={props.placeholder}
                    />      
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    input:{
        width:265,
        fontSize:16,
        paddingVertical:0,
        paddingHorizontal:0
    },
    label:{},
    dropdown:{},
    placeholderStyle:{},
    selectedTextStyle:{},
    inputSearchStyle:{},
    iconStyle:{},
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