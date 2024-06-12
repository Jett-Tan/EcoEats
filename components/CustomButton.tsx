import { Pressable, StyleSheet, View, Text } from "react-native";
import { useState } from "react";

interface TestProps {
    type?: "Email" | "Google" | "Facebook" | "Apple" | "" | "Cancel",
    onPress?: Function,
    text?: String,
    style?: { buttonContainer?: Object, button?: Object, text?: Object }
}

const defaultProps: TestProps = {
    type: "",
    onPress: () => { console.log("Button Pressed") },
    text: "",
    style: { buttonContainer: {}, button: {}, text: {} }
}

export default function CustomButton(props = defaultProps) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={[
            styles.buttonContainer,
            props.style?.buttonContainer,
            isPressed && styles.buttonContainerPressed
        ]}>
            <Pressable
                style={[
                    styles.button,
                    props.style?.button,
                    isPressed && styles.buttonPressed
                ]}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={props?.onPress}
            >
                <Text style={[styles.text, props.style?.text]}>{props.text}{props.type}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#DDD7D7",
        paddingVertical: 10.5,
        marginVertical: 10,
        maxWidth: 383,
        minWidth: 300,
        width: 300,
    },
    buttonContainerPressed: {
        borderColor: "#4BB469", // Green border color when pressed
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    }
});