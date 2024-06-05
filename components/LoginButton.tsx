import { Pressable, StyleSheet, View, Text } from "react-native";



export default function LoginButton(props: {
    type: "Email" | "Google" | "Facebook" | "Apple",
    onPress: () => void
}) {
    return (
        <>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={props.onPress}>
                    <Text style={styles.text}>Continue with {props.type}</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:5,
        borderWidth:1,
        borderColor:"#DDD7D7",
        paddingVertical:10.5,
        marginVertical:10,
        maxWidth:383,
        minWidth:300,
        width:300,

    },
    button: {

    },
    text:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center"
    }
})