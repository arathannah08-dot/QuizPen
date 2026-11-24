
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ActButton2({ name, onPress }) {
    return (
        <TouchableOpacity
            style={styles.actBtn}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.actTxt}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    actBtn: {
        paddingVertical: 16,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        marginBottom: 10,
    },

    actTxt: {
        color: '#125643',
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '700',
    },
});
