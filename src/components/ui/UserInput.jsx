import { StyleSheet, Text, TextInput} from 'react-native';

export default function UserInput ({type}) {
    return (
        <TextInput 
        placeholder={type}
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