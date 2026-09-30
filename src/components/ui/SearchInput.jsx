import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput ({type, value, onChangeText}) {
    return (
        <View style={styles.search}>
            <Ionicons 
             style={styles.icon}
             name="search" 
             size={20} 
             color="#6C4AB6" 
            />

            <TextInput 
            placeholder={type}
            placeholderTextColor="#9B94A8"
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
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DDD6EA',
        backgroundColor: '#FFFFFF',
        height: 48,
        paddingHorizontal: 12,
        marginBottom: 10,
    },

    icon: {
        marginLeft: 8,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: '#292333',
        marginLeft: 8,
    },
});