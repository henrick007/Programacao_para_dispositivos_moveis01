import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function Input(props) {
    return (
        <TextInput
            style={styles.input}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 10
    }
})
