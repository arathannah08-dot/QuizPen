import { StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

export default function Add ({add}) {
    return (
        <TextInput 
         placeholder={add}
         style={styles.addBox}
        />
    );
}

const styles = StyleSheet.create ({
    addBox: {
        padding: 55,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'darkgrey'
    }
});