import { StyleSheet, TextInput } from 'react-native';

export default function UserInput ({type, value, onChangeText}) {
    return (
        <TextInput 
        placeholder={type}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputBox}
        />
    );
}

const styles = StyleSheet.create ({
    inputBox: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'darkgrey'
    }
});