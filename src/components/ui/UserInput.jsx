import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function UserInput({
    type,
    value,
    onChangeText,
    isPassword = false
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.inputContainer}>

            <TextInput
                placeholder={type}
                placeholderTextColor="#9B94A8"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !showPassword}
                style={styles.inputBox}
            />

            {isPassword && (
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#6C4AB6"
                    />
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({

    inputContainer: {
        position: 'relative',
    },

    inputBox: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        paddingRight: 45,

        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DDD6EA',

        backgroundColor: '#FFFFFF',
        color: '#292333',
        fontSize: 15,

        marginTop: 12,
    },

    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
        bottom: 0,
        justifyContent: 'center',
    },

});