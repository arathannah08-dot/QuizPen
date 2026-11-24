
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../components/ui/BackButton';

export default function About() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.logo}>QuizPen</Text>

            <View style={styles.titleRow}>
                <BackButton />
                <Text style={styles.title}>About QuizPen</Text>
            </View>

            <Text style={styles.subtitle}>
                Learn more about our application.
            </Text>

            {/* APP INFORMATION */}
            <View style={styles.card}>
                <Text style={styles.appName}>QuizPen</Text>

                <Text style={styles.description}>
                    QuizPen is a mobile application that allows users
                    to create, organize, and study flashcards and quizzes.

                    {'\n\n'}

                    It helps make reviewing and learning easier and more
                    convenient.

                    {'\n\n'}

                    By:
                    {'\n'}
                    Arat, Bacarro, Gomez, Heras, and Sabio
                </Text>
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
        marginTop: 10,
        marginBottom: 20,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },

    title: {
        color: '#FFBA00',
        fontSize: 28,
        fontWeight: '800',
    },

    subtitle: {
        color: '#ACE2B6',
        marginTop: 8,
        fontSize: 14,
        marginBottom: 25,
        lineHeight: 21,
    },

    card: {
        backgroundColor: '#F8F8F8',
        padding: 22,
        borderRadius: 15,
        marginBottom: 18,
    },

    appName: {
        color: '#B46617',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    description: {
        color: '#125643',
        fontSize: 14,
        lineHeight: 22,
    },
});
