import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export interface preferences{
  key:number,
  name:string,
  selected:Boolean
}

export const defaultPreferences:preferences[] = [
  {key:1,name: "🍞 Bakeries", selected: false},
  {key:2,name: "🥦 Groceries", selected: false},
  {key:3,name: "🇫🇷 French", selected: false},
  {key:4,name: "🇨🇳 Chinese", selected: false},
  {key:5,name: "🇮🇹 Italian", selected: false},
  {key:6,name: "🇺🇸 American", selected: false},
  {key:7,name: "🇰🇷 Korean", selected: false},
  {key:8,name: "🇮🇳 Indian", selected: false},
  {key:9,name: "🇪🇸 Spanish", selected: false},
  {key:10,name: "🇲🇽 Mexican", selected: false},
  {key:11,name: "🇹🇷 Turkish", selected: false},
  {key:12,name: "🇬🇷 Greek", selected: false},
]

export default function Interests( props: {interests: preferences[], setInterests:Function}) {
    
    return (
        <>
            {props.interests.length === 0 && <Text>Loading...</Text>}
            <View style={{marginBottom:150,flexDirection:"row", flexWrap:"wrap", width:350}}>
                {props.interests.map((interest) => {
                    return (
                        <TouchableOpacity key={interest.key} onPress={() => {
                            interest.selected = !interest.selected; 
                            props.setInterests([...props.interests]);
                        }}>
                            <View 
                                style={[{flexDirection:"row",justifyContent:"center",alignItems:"center",margin:10,borderColor:"lightgrey",borderRadius:5,borderWidth:1,padding:4},
                                interest.selected ? {borderColor:"green"} : {}]}>
                                <Text>{interest.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
                </View>
        </>
    )
}