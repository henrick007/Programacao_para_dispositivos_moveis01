import { TouchableOpacity, StyleSheet, Text, ActivityIndicator } from "react-native";

export function Button({ loading, title, disabled, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: disabled || loading ? '#ababab' : '#BB86FC',
            }]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator size={30} />
            ) : (
                <Text style={styles.title}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    }
})
