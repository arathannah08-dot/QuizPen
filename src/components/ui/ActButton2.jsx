import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ActButton2 ({name}) {
    return (
        <TouchableOpacity style={styles.actBtn}>
            <Text style={styles.actTxt}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles =StyleSheet.create ({
    actBtn: {
        padding: 10
    },

    actTxt: {
        marginRight: 15,
        color: '#6C4AB6',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '600',
    }
})