import { StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddSign ({icon, size = 30, color = "darkblue", onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons 
             name={icon}
             size={size} 
             color={color} 
            />
        </TouchableOpacity>
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