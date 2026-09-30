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


const styles = StyleSheet.create({
    addBox: {
        padding: 15,
        minHeight: 120,
        borderRadius: 12,
        borderWidth: 1,
<<<<<<< Updated upstream
        borderColor: 'lightgrey'
    }
});
=======
        borderColor: '#DDD6EA',
        backgroundColor: '#FFFFFF',
        color: '#292333',
        fontSize: 15,
        textAlignVertical: 'top',
        marginTop: 10,
    },
});
>>>>>>> Stashed changes
