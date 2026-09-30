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
        backgroundColor: '#6C4AB6',

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#6C4AB6',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },

});