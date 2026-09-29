import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function UserInput ({type, value, onChangeText, isPassword = false}) {
    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
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
    );
}

const styles = StyleSheet.create ({
    inputContainer: {
        position: 'relative',
    },

    inputBox: {
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

});