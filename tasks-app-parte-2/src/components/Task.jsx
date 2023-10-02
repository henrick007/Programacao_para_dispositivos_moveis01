import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export function Task({ task, onDeleteTask, onCheckTask }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onCheckTask}>
                <Text style={styles.text}>
                    {task.finished ? '✅' : '⬜️'}
                </Text>
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {task.title}
            </Text>
            <TouchableOpacity onPress={onDeleteTask}>
                <Text style={styles.text}>
                    ❌
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 22,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        maxWidth: '60%',
    }
});
