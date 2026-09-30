import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ActButton ({name, variant = "filled", onPress}) {
    return (
        <TouchableOpacity style={[
            styles.filledBtn,
            variant === "outline" && styles.outlineBtn
            ]}
            onPress={onPress}
        >
            
            <Text style={[
                styles.buttonTxt,
                variant === "outline" && styles.outlineTxt
                ]}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create ({
    filledBtn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#6C4AB6',
        marginTop: 12,
        alignItems: 'center',
    },

    buttonTxt: {
         color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },

    outlineBtn: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#6C4AB6',
    },

    outlineTxt: {
        color: '#6C4AB6',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    }
});