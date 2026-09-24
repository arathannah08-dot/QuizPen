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
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'darkblue'
    },

    buttonTxt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    outlineBtn: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'darkblue'
    },

    outlineTxt: {
        color: 'darkblue',
        textAlign: 'center'
    }
});