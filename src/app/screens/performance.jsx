
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFlashcard } from '../../storage/flashcard';
import {
    getQuiz,
    getQuizResults
} from '../../storage/quiz';

export default function Performance() {
    const router = useRouter();

    const [flashcardCount, setFlashcardCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [masteredCount, setMasteredCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Load the current user's performance
    useFocusEffect(
        useCallback(() => {
            let active = true;

            const loadPerformance = async () => {
                setLoading(true);

                try {
                    const flashcards = await getFlashcard();
                    const quizzes = await getQuiz();
                    const results = await getQuizResults();

                    const mastered = results.filter(
                        item => item.status === 'Mastered'
                    ).length;

                    const needsReview = results.filter(
                        item => item.status === 'Needs More Review'
                    ).length;

                    if (active) {
                        setFlashcardCount(
                            Array.isArray(flashcards)
                                ? flashcards.length
                                : 0
                        );

                        setQuizCount(
                            Array.isArray(quizzes)
                                ? quizzes.length
                                : 0
                        );

                        setMasteredCount(mastered);
                        setReviewCount(needsReview);
                    }

                } catch (error) {
                    console.log('Error loading performance:', error);
                } finally {
                    if (active) {
                        setLoading(false);
                    }
                }
            };

            loadPerformance();

            return () => {
                active = false;
            };
        }, [])
    );

    const StatCard = ({ title, count, description }) => (
        <View style={styles.statBox}>
            <Text style={styles.statLabel}>{title}</Text>

            {loading ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <Text style={styles.statNumber}>{count}</Text>
            )}

            <Text style={styles.statDescription}>
                {description}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text
                    style={styles.back}
                    onPress={() => router.replace('/(tabs)/profile')}
                >
                    ‹ Back
                </Text>

                <Text style={styles.title}>Performance</Text>

                <Text style={styles.subtitle}>
                    Here's a quick look at your performance and progress.
                </Text>

                <View style={styles.statsContainer}>
                    <StatCard
                        title="Total Flashcards"
                        count={flashcardCount}
                        description="Flashcards created"
                    />
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>
                        Legend:
                    </Text>

                    <Text style={styles.infoText}>
                        80% or higher = Mastered
                        <br></br>
                        Lower than 80% = Needs More Review
                    </Text>
                </View>
                    <StatCard
                        title="Total Quizzes"
                        count={quizCount}
                        description="Quizzes created"
                    />

                    <StatCard
                        title="Mastered"
                        count={masteredCount}
                        description="Quizzes with 80% or higher"
                    />

                    <StatCard
                        title="Needs More Review"
                        count={reviewCount}
                        description="Quizzes below 80%"
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e0945',
        padding: 20,
    },

    back: {
        color: '#c9aece',
        fontSize: 16,
        marginBottom: 25,
    },

    title: {
        color: '#e9e4f1',
        fontSize: 28,
        fontWeight: 'bold',
    },

    subtitle: {
        color: '#ccc8d5',
        fontSize: 14,
        marginTop: 8,
        marginBottom: 25,
    },

    statsContainer: {
        gap: 15,
    },

    statBox: {
        backgroundColor: '#6b1376',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#9c94ae',
    },

    statLabel: {
        color: '#e9e4f1',
        fontSize: 16,
        fontWeight: '600',
    },

    statNumber: {
        color: '#ffffff',
        fontSize: 38,
        fontWeight: 'bold',
        marginTop: 10,
    },

    statDescription: {
        color: '#d7c9df',
        fontSize: 13,
        marginTop: 5,
    },

    infoBox: {
        marginTop: 20,
        marginBottom: 20,
        padding: 18,
        backgroundColor: '#50105a',
        borderRadius: 12,
    },

    infoTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    infoText: {
        color: '#d7c9df',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8,
    },
});
