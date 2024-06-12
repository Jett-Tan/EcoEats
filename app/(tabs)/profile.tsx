import { child, getDatabase, onValue, ref, set } from "firebase/database";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; //https://oblador.github.io/react-native-vector-icons/#MaterialIcons

import CustomButton from '@/components/CustomButton';
import Input from "@/components/Input";
import Interests, { preferences } from '@/components/Interests';
import { auth } from '@/components/auth/firebaseConfig';
import { Icon } from "@/components/navigation/Icon";
import { router } from "expo-router";
import BookmarkTab from '../savedTab';
import StarTab from '../starTab';


export default function ProfilePage() {
  
  const [firstName, setFirstName] = useState('Loading');
  const [lastName, setLastName] = useState('...');
  const [dob, setDOB] = useState('01/01/2000');
  const [gender, setGender] = useState('Male');
  const [description, setDescription] = useState('BrainFried is the best!');
  const [userStars,setUserStars] = useState(0);
  const [myPreferences, setMyPreferences] = useState<preferences[]>([]); 
  
  const [firstNameEdit, setFirstNameEdit] = useState('Loading');
  const [lastNameEdit, setLastNameEdit] = useState('...');
  const [dobEdit, setDOBEdit] = useState('01/01/2000');
  const [genderEdit, setGenderEdit] = useState('Male');
  const [descriptionEdit, setDescriptionEdit] = useState('BrainFried is the best!');
  
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState('');
  const [descriptionError, setDescriptionError] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState('star');
  
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  useEffect(() => {
    (async () => {
      onValue(child(dbRef, `users/${auth.currentUser?.uid}`), (snapshot) => {
        if (snapshot.exists()) {
          // console.log("Data available");
          const user = snapshot.val();
          loadData(user);
        } else {
          console.log("No data available");
        }
      });
    })();
  }, []);
  
  const loadData = (obj:{
    userData:{
      firstName:string,
      lastName:string,
      dob:string,
      gender:string,
      description:string,
      stars:number,
    },
    myPreferences:{
      myPreferences:preferences[]
    }
  }) => {
    if(obj.userData.firstName){
      setFirstName(obj.userData.firstName)
      setFirstNameEdit(obj.userData.firstName)
    } else {
      console.log("no firstName")
    }
    if(obj.userData.lastName){
      setLastName(obj.userData.lastName)
      setLastNameEdit(obj.userData.lastName)
    } else {
      console.log("no lastName")
    }
    if(obj.userData.dob){
      setDOB(obj.userData.dob)
      setDOBEdit(obj.userData.dob)
    } else {
      console.log("no dob")
    }
    if(obj.userData.gender){
      setGender(obj.userData.gender)
      setGenderEdit(obj.userData.gender)
    } else{
      console.log("no gender")
    }
    if(obj.userData.description){
      setDescription(obj.userData.description)
      setDescriptionEdit(obj.userData.description)
    } else {
      console.log("no description")
    }
    if(obj.userData.stars !== undefined){
      setUserStars(obj.userData.stars)
    } else {
      console.log("no stars")
    }
    if(obj.myPreferences){
      setMyPreferences(obj.myPreferences.myPreferences)
    } else {
      console.log("no preferences")
    }
  } 
  
  function writeUserData() {
    if(isUserDataValid()){
      set(ref(db, 'users/' + auth.currentUser?.uid +"/userData"), {
        firstName: firstNameEdit,
        lastName:lastNameEdit,
        dob: dobEdit,
        gender:genderEdit,
        description:descriptionEdit,
        stars:userStars,
      });
    }
  }
  function writeUserPreferences() {
    set(ref(db, 'users/' + auth.currentUser?.uid + '/myPreferences'), {
          myPreferences,
    });
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
      userDataValidation.isFirstNameValid(firstNameEdit);
      userDataValidation.isLastNameValid(lastNameEdit);
      userDataValidation.isGenderValid(genderEdit);
      userDataValidation.isDateValid(dobEdit);
      userDataValidation.isDescriptionValid(descriptionEdit);
      if(firstNameError === "" && lastNameError === "" && genderError === "" && dobError === "" && descriptionError === ""){
          return true;
      }else {
          return false;
      }
  }

  const renderIcon = (tabKey: string, focused: boolean) => {
    let iconName;

    switch (tabKey) {
      case 'star':
        iconName = focused ? 'star' : 'star-outline';
        break;
      case 'bookmark':
        iconName = focused ? 'bookmark' : 'bookmark-outline';
        break;
      case 'pref':
        iconName = focused ? 'list' : 'list';
        break;
      default:
        iconName = 'star';
        break;
    }
    return <MaterialIcons name={iconName} size={24} color={focused ? 'black' : 'gray'} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerRowLeft}>
          <Icon size={90} name="person-circle-sharp" />
          <Text style={styles.headerText}>{firstName} {lastName}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.starText}>5.0 ⭐</Text>
        </View>
      </View>
      <View style={styles.subTitle}>
        <Text style={[styles.subTitleText,{marginLeft:10}]}>{description}</Text>
      </View>
      {/* <View style={styles.betweenTextBlock}></View> */}
      <View style={styles.personalParticulars}>
        {/* <Text style={styles.personalParticularsTitle}>Personal Particulars</Text> */}
        {/* <View style={styles.betweenTextBlock}></View> */}
        <View style={{flexDirection:"row", justifyContent:"space-evenly"}}>
          <CustomButton 
            type="" 
            text="Edit Profile" 
            style={{
              buttonContainer: {width:170,minWidth:100, backgroundColor:"#3BAE6F"},
              button: {},
              text: {color:"white"}
            }} 
            onPress={() => {
              setIsEditing(true)
              setModalVisible(!modalVisible)
            }} /> 
          <CustomButton 
            type="" 
            text="Log Out" 
            style={{
              buttonContainer: {width:170,minWidth:100, backgroundColor:"#3BAE6F"},
              button: {},
              text: {color:"white"}
            }} 
            onPress={() => {auth.signOut(); router.dismissAll();}} /> 
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
              setIsEditing(false)
            }}
          >
            <TouchableOpacity 
              onPress={()=>{
                setModalVisible(!modalVisible);
                setIsEditing(false);
              }} 
              style={{
                zIndex:-1,
                width:"100%",
                height:"100%",
                position:"absolute",
                left:0,
                top:0,
                opacity:0.2,
                backgroundColor:"black", justifyContent:'center',alignItems:'center'
              }}/>
            <View style={{ justifyContent:'center',alignItems:'center',
                marginVertical:150,
                marginHorizontal:20,
                width:'90%',
                height:'60%',}}>
              <View 
              style={{
                alignItems:"center",
                justifyContent:"center",
                borderRadius:10,
                backgroundColor:"white", 
                width:'100%',
                height:'100%',}}>
                <ScrollView contentContainerStyle={{padding:30}}>
                  <View style={{alignItems:'center',justifyContent:"center",flexDirection:"column"}}>
                      <Icon size={100} name="person-circle-sharp" />
                      <Input
                        type="First Name" //"first Name"
                        placeholder="Enter First Name"
                        value={firstNameEdit}
                        onChangeText={setFirstNameEdit}
                        error={firstNameError}
                        catchError={(e:any) => {
                            userDataValidation.isFirstNameValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Last Name" //"lastName"
                        placeholder="Enter Last Name"
                        value={lastNameEdit}
                        onChangeText={setLastNameEdit}
                        error={lastNameError}
                        catchError={(e:any) => {
                            userDataValidation.isLastNameValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Date of Birth" //"dob"
                        placeholder="DD/MM/YYYY"
                        value={dobEdit}
                        onChangeText={(e:any) => {setDOBEdit(e)}}
                        error={dobError}
                        catchError={(e:any ) => {
                            userDataValidation.isDateValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Gender" //"gender"
                        placeholder="Enter Gender"
                        value={genderEdit}
                        onChangeText={setGenderEdit}
                        error={genderError}
                        catchError={(e:any) => {
                            userDataValidation.isGenderValid(e)
                        }}
                        header={true}
                    />
                    <Input
                        type="Description" //"gender"
                        placeholder="Enter your description"
                        value={descriptionEdit}
                        onChangeText={setDescriptionEdit}
                        error={descriptionError}
                        catchError={(e:any) => {
                            userDataValidation.isDescriptionValid(e)
                        }}
                        header={true}
                    />
                    <CustomButton
                      type=''
                      text="Save"
                      onPress={() => {
                        writeUserData();
                        setModalVisible(!modalVisible);
                        setIsEditing(false)
                        }}
                      style={{
                        buttonContainer: {backgroundColor: '#3BAE6F'}, 
                        button: {}, 
                        text: {color: 'white'}
                      }}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.tabs}>
        <View style={styles.tabBar}>
          {['star', 'bookmark', 'pref'].map((tabKey) => (
            <Text
              key={tabKey}
              style={[styles.tabItem, activeTab === tabKey && styles.activeTab]}
              onPress={() => setActiveTab(tabKey)}
            >
              {renderIcon(tabKey, activeTab === tabKey)}
            </Text>
          ))}
        </View>
        <View style={styles.tabContent}>
          {/* <Interests 
            setInterests={(e:preferences[]) => {
              writeUserPreferences()
              setMyPreferences(e)
            }} 
            interests={[]}/> */}
          {activeTab === 'star' && <StarTab />}
          {activeTab === 'bookmark' && <BookmarkTab />}
          {activeTab === 'pref' && 
            <Interests 
              setInterests={(e:preferences[]) => {
                writeUserPreferences()
                setMyPreferences(e)
              }}  
              interests={myPreferences}/>}
          {/* {activeTab === 'pref' && <PrefTab />} */}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop:20,
  },
  container: {
    padding: 20,
  },
  betweenTextBlock: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginTop: 0,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 20,
  },
  starText: {
    fontSize: 20,
    marginLeft: 5,
  },
  personalParticulars: {
    marginBottom: 20,
  },
  personalParticularsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    padding: 5,
    flex: 1,
    textAlign: 'left',
  },
  tabs: {
    marginTop: 0,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    padding: 10,
    textAlign: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginVertical:10,
  },
});

// export default ProfilePage;

