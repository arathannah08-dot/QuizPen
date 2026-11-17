
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function UserInput({
    type,
    value,
    onChangeText,
    isPassword = false,
    error,
    onBlur
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.inputContainer}>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder={type}
                    placeholderTextColor="#9B94A8"
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    secureTextEntry={isPassword && !showPassword}
                    autoCapitalize="none"
                    keyboardType={
                        type.toLowerCase().includes('email')
                            ? 'email-address'
                            : 'default'
                    }
                    style={[
                        styles.inputBox,
                        error && styles.inputError
                    ]}
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

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },

    inputWrapper: {
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

    inputError: {
        borderColor: '#E53935',
    },

    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
        bottom: 0,
        justifyContent: 'center',
    },

    errorText: {
        color: '#E53935',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 4,
    },
});
