
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

            <View style={styles.statsBox}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{flashcardCount}</Text>
                    <Text style={styles.stat}>Flashcards</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{quizCount}</Text>
                    <Text style={styles.stat}>Quizzes</Text>
                </View>
            </View>

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

            <ActButton
                name="Logout"
                onPress={() => router.push('/')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e0945',
        paddingHorizontal: 20,
    },

    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#e9e4f1',
        marginTop: 25,
        marginBottom: 20,
    },

    statsBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#6b1376',
        borderRadius: 16,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: '#9c94ae',
    },

    statItem: {
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 5,
    },

    stat: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ccc8d5',
    },

    options: {
        marginTop: 20,
    },
});
