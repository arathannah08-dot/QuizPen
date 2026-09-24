import { StyleSheet, TextInput } from 'react-native';

export default function Add ({add, value, onChangeText}) {
    return (
        <TextInput
         placeholder={add}
         value={value}
         onChangeText={onChangeText}
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
