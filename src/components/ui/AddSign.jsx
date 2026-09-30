import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, TouchableOpacity } from 'react-native';

export default function AddSign({
    icon,
    size = 30,
    color = '#FFFFFF',
    onPress,
    style
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.addButton, style]}
        >
            <Ionicons
                name={icon}
                size={size}
                color={color}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4d1147',
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});