
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ActButton({ name, variant = "filled", onPress }) {
    return (
        <TouchableOpacity
            style={[
                styles.filledBtn,
                variant === "outline" && styles.outlineBtn
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonTxt,
                    variant === "outline" && styles.outlineTxt
                ]}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    filledBtn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#FFBA00',
        marginTop: 12,
        alignItems: 'center',
    },

    buttonTxt: {
        color: '#125643',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },

    outlineBtn: {
        backgroundColor: '#F8F8F8',
        borderWidth: 1.5,
        borderColor: '#ACE2B6',
    },

    outlineTxt: {
        color: '#125643',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    }
});
