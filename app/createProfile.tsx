import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link, useRouter} from 'expo-router';
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";

export default function Index() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState('');
    const [dobError, setDobError] = useState('');
    const [gender, setGender] = useState("");
    const router = useRouter();
    
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.push("./")}} size={30} name="arrow-back-outline" />
            </View>
            <View style={{alignItems:"center"}}>
                <Icon size={150} name="add-circle-sharp" color={"#D9D9D9"}/>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Personal Particulars</Text>
            </View>
            <View style={{}}>
                <Input
                    type="Email" //"first Name"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Input
                    type="Email" //"lastName"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <Input
                    type="Date of Birth" //"dob"
                    placeholder="DD/MM/YYYY"
                    value={dob}
                    onChangeText={setDob}
                />
                <Input
                    type="Email" //"gender"
                    placeholder="Enter Gender"
                    value={gender}
                    onChangeText={setGender}
                />
            </View>
            <CustomButton 
            text="Get Started! "
            type=""
            onPress={() => {router.replace("./myPreferences")}}
            style={{buttonContainer: {backgroundColor:"#3BAE6F"},button: {},text: styles.button_Text}}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"#4BB469",
        borderRadius:5,
        padding:10,
        width:300,
        maxWidth:383,
        minWidth:300,
        alignItems:"center",
        marginBottom:24,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 5,
    },
    button_Text:{
        color:"#FFF",
        fontSize:16,
        fontWeight:"bold",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    icon:{
        width: 279,
        height: 111,
        resizeMode: "contain",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 87,
        overflow: "hidden",
        marginBottom: 200,
        marginTop: 50,
    },
    paragraph_Box:{
        marginBottom: 24,
    },
    paragraph: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"#000000",
        opacity:0.4
    },
    paragraph_Bold: {
        color:"#4BB469",
        fontWeight: 'bold',
        textAlign: 'center',
        opacity:1
    },
    navigation:{
        position: "absolute",
        top: 0,
        left: 0,
        marginTop: 70,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
    }
});