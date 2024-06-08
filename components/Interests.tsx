import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
export default function Interests() {
    const [interests, setInterests] = useState([
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
    
    ]);
    return (
        <>
            <View style={{marginTop:50,marginBottom:150,flexDirection:"row", flexWrap:"wrap", width:350}}>
                {interests.map((interest) => {
                    return (
                        <TouchableOpacity key={interest.key} onPress={() => {interest.selected = !interest.selected; setInterests([...interests])}}>
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