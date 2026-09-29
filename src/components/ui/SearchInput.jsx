import { StyleSheet, TextInput, View} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchInput ({type, value, onChangeText}) {
    return (
        <View style={styles.search}>
            <Ionicons 
             style={styles.icon}
             name="search" 
             size={20} 
             color='darkgrey' 
            />

            <TextInput 
            placeholder={type}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white'
    },

    icon: {
        marginLeft: 5,
    },

    input: {
        flex: 1,
        padding: 8,
        fontSize: 16
    }
});