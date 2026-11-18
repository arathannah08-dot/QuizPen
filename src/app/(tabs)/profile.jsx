
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActButton from '../../components/ui/ActButton';
import ActButton2 from '../../components/ui/ActButton2';
import { getFlashcard } from '../../storage/flashcard';
import { getQuiz } from '../../storage/quiz';

export default function Profile() {
    const router = useRouter();

    const [flashcardCount, setFlashcardCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);

    // Load the current user's flashcard and quiz counts
    useFocusEffect(
        useCallback(() => {
            const loadCounts = async () => {
                try {
                    const flashcards = await getFlashcard();
                    const quizzes = await getQuiz();

                    setFlashcardCount(
                        Array.isArray(flashcards) ? flashcards.length : 0
                    );

                    setQuizCount(
                        Array.isArray(quizzes) ? quizzes.length : 0
                    );

                } catch (error) {
                    console.log('Error loading profile counts:', error);
                }
            };

            loadCounts();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Account</Text>
            <Text style={styles.subtitle}>
                Manage your account and study activities
            </Text>

            <View style={styles.statsBox}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{flashcardCount}</Text>
                    <Text style={styles.stat}>Flashcards</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{quizCount}</Text>
                    <Text style={styles.stat}>Quizzes</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Account Options</Text>

            <View style={styles.options}>
                <ActButton2
                    name="Performance"
                    onPress={() => router.push('/screens/performance')}
                />

                <ActButton2
                    name="Activity History"
                    onPress={() => router.push('/screens/activity')}
                />

                <ActButton2
                    name="Settings"
                    onPress={() => router.push('/screens/settings')}
                />
            </View>

            <View style={styles.logout}>
                <ActButton
                    name="Logout"
                    onPress={() => router.push('/')}
                />
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

    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFBA00',
        marginTop: 25,
    },

    subtitle: {
        fontSize: 14,
        color: '#ACE2B6',
        marginTop: 5,
        marginBottom: 25,
    },

    statsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#F8F8F8',
        borderRadius: 16,
        paddingVertical: 22,
        marginBottom: 30,
    },

    statItem: {
        flex: 1,
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: '#125643',
        marginBottom: 5,
    },

    stat: {
        fontSize: 15,
        fontWeight: '700',
        color: '#125643',
    },

    divider: {
        width: 1,
        height: 45,
        backgroundColor: '#ACE2B6',
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F8F8F8',
        marginBottom: 12,
    },

    options: {
        marginBottom: 20,
    },

    logout: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
});
