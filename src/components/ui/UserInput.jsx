import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function UserInput ({type, value, onChangeText, isPassword = false}) {
    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
<<<<<<< Updated upstream
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder={type}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !showPassword}
            style={styles.inputBox}
            />

            {isPassword && (
                <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword (!showPassword)}>
                    <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color='grey'
                    />
                </TouchableOpacity>          
            )}
        </View>
=======
        <TextInput 
        placeholder={type}
        placeholderTextColor="#9B94A8"
        value={value}
        onChangeText={onChangeText}
        style={styles.inputBox}
        />
>>>>>>> Stashed changes
    );
}

const styles = StyleSheet.create ({
    inputContainer: {
        position: 'relative',
    },

    inputBox: {
<<<<<<< Updated upstream
    padding: 8,
    paddingRight: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
},

    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }

=======
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DDD6EA',
        backgroundColor: '#FFFFFF',
        color: '#292333',
        fontSize: 15,
        marginTop: 12,
    },
>>>>>>> Stashed changes
});