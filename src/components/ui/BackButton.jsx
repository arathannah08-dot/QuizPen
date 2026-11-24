
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function BackButton() {
    const router = useRouter();

    return (
        <Pressable
            style={styles.button}
            onPress={() => router.back()}
        >
            <Ionicons
                name="arrow-back"
                size={24}
                color="#F8F8F8"
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
});
