
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Create() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>QuizPen</Text>

            <Text style={styles.header}>Create</Text>

            <Text style={styles.subtitle}>
                What would you like to create?
            </Text>

            <View style={styles.cardsContainer}>
                <View style={styles.card}>
                    <Ionicons
                        name="albums-outline"
                        size={90}
                        color="#B46617"
                    />

                    <Text style={styles.cardText}>
                        Turn your lessons into study cards!
                    </Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => router.push('/screens/createflash')}
                    >
                        <Text style={styles.buttonText}>
                            Create Flashcard
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.card}>
                    <Ionicons
                        name="document-text-outline"
                        size={90}
                        color="#FFBA00"
                    />

                    <Text style={styles.cardText}>
                        Turn your lessons into quizzes!
                    </Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => router.push('/screens/createquiz')}
                    >
                        <Text style={styles.buttonText}>
                            Create Quiz
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125643',
        paddingHorizontal: 20,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 15,
    },

    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFBA00',
        marginTop: 25,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#ACE2B6',
        marginBottom: 20,
    },

    cardsContainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20,
    },

    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardText: {
        fontSize: 16,
        color: '#125643',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 18,
    },

    button: {
        backgroundColor: '#B46617',
        width: '75%',
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#F8F8F8',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
