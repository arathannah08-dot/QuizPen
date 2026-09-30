import { StyleSheet, TextInput } from 'react-native';

export default function Add({ add, value, onChangeText }) {
    return (
        <TextInput
            placeholder={add}
            placeholderTextColor="#9B94A8"
            value={value}
            onChangeText={onChangeText}
            style={styles.addBox}
            multiline={true}
        />
    );
}


const styles = StyleSheet.create({
    addBox: {
        width: '100%',
        padding: 15,
        minHeight: 120,

        borderRadius: 12,
        borderWidth: 1,

        borderColor: 'lightgrey'
    }
});


