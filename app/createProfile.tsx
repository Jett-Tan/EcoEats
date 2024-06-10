import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { Link, useRouter} from 'expo-router';
import { useState } from "react";
import moment from "moment";
import { getDatabase, ref, set } from "firebase/database";

import { Icon } from "@/components/navigation/Icon";
import Input from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { PressableIcon } from "@/components/navigation/PressableIcon";
import DropdownInput from "@/components/Dropdown";
import { auth, database } from "@/components/auth/firebaseConfig";

export default function CreateProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [userStars,setUserStars] = useState(0);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [dobError, setDobError] = useState('');
    const [descriptionError, setDescriptionError] = useState("");

    const router = useRouter();

    function writeUserData() {
        const db = getDatabase();
        if (isUserDataValid()) {
            set(ref(db, 'users/' + auth.currentUser?.uid+"/userData"), {
                firstName: firstName,
                lastName:lastName,
                dob: dob,
                gender:gender,
                description:description,
                stars: userStars,
                myBookmarks: [],
            });
        }
    }
    const userDataValidation = {
        isFirstNameValid: (name:string) => {
            if(name === "") {
                setFirstNameError("First Name is required");
            }else{
                setFirstNameError("");
            }
        },
        isLastNameValid: (name:string) => {
            if(name === "") {
                setLastNameError("Last Name is required");
            }else{
                setLastNameError("");
            }
        },
        isGenderValid: (sex:string) => {
            if (sex === "") {
                setGenderError("Gender is required");
            }else{
                setGenderError("");
            }
        },
        isDateValid: (date:string) => {
            if(!moment(date, "DD/MM/YYYY", true).isValid()){
                setDobError("Invalid Date Format");
            }else{
                setDobError('')
            }
        },
        isDescriptionValid: (desc:string) => {
            if(desc === ""){
                setDescriptionError("Description is required");
            }else{
                setDescriptionError("");
            }
        }
    }
    function isUserDataValid(){
        userDataValidation.isFirstNameValid(firstName);
        userDataValidation.isLastNameValid(lastName);
        userDataValidation.isGenderValid(gender);
        userDataValidation.isDateValid(dob);
        userDataValidation.isDescriptionValid(description);
        if(firstNameError === "" && lastNameError === "" && genderError === "" && dobError === "" && descriptionError === ""){
            return true;
        }else {
            return false;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <PressableIcon onPress={() => {router.canGoBack()?router.back():{}}} size={30} name="arrow-back-outline" />
            </View>
            <View style={{marginBottom:100, minHeight:500, maxHeight:550}}>
                <ScrollView>
                    <View style={{alignItems:"center",marginBottom:50}}>
                        <Icon size={150} name="add-circle-sharp" color={"#D9D9D9"}/>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>Personal Particulars</Text>
                    </View>
                    <Input
                        type="First Name" //"first Name"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        error={firstNameError}
                        catchError={(e:any) => {
                            userDataValidation.isFirstNameValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Last Name" //"lastName"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        error={lastNameError}
                        catchError={(e:any) => {
                            userDataValidation.isLastNameValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Date of Birth" //"dob"
                        placeholder="DD/MM/YYYY"
                        value={dob}
                        onChangeText={(e:any) => {setDob(e)}}
                        error={dobError}
                        catchError={(e:any ) => {
                            userDataValidation.isDateValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Gender" //"gender"
                        placeholder="Enter Gender"
                        value={gender}
                        onChangeText={setGender}
                        error={genderError}
                        catchError={(e:any) => {
                            userDataValidation.isGenderValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Description" //"gender"
                        placeholder="Enter your description"
                        value={description}
                        onChangeText={setDescription}
                        error={descriptionError}
                        catchError={(e:any) => {
                            userDataValidation.isDescriptionValid(e)
                        }}
                        header={true}
                    />
                    {/* <DropdownInput 
                        type="Gender"
                        value={gender}
                        onChangeText={(e:string) => {console.log("ASD"); setGender(e); return e}}
                    /> */}
                </ScrollView>
            </View>
            <View style={{position:"absolute",marginBottom:100,left:0,bottom:0,width:"100%",marginLeft:7,alignItems:"center",}}>
                <CustomButton 
                text="Get Started! "
                type=""
                onPress={() => {
                    if (isUserDataValid()) {
                        writeUserData();
                        router.push("./myPreferences")
                    }
                }}
                style={{buttonContainer: {backgroundColor:"#3BAE6F"},button: {},text: styles.button_Text}}
                />
            </View>
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