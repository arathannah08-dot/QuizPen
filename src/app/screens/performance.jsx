
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
import BackButton from '../../components/ui/BackButton';
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
                <ActivityIndicator color="#125643" />
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
            <Text style={styles.logo}>QuizPen</Text>

            <View style={styles.titleRow}>
                <BackButton />
                <Text style={styles.title}>Performance</Text>
            </View>

            <Text style={styles.subtitle}>
                Here's a quick look at your performance and progress.
            </Text>

                <Text style={styles.sectionTitle}>
                    Your Activity
                </Text>

                <View style={styles.statsContainer}>
                    <StatCard
                        title="Total Flashcards"
                        count={flashcardCount}
                        description="Flashcards created"
                    />

                    <StatCard
                        title="Total Quizzes"
                        count={quizCount}
                        description="Quizzes created"
                    />
                </View>

                <Text style={styles.sectionTitle}>
                    Quiz Performance
                </Text>

                <View style={styles.performanceContainer}>
                    <View style={styles.performanceCard}>
                        <Text style={styles.performanceLabel}>
                            Mastered
                        </Text>

                        {loading ? (
                            <ActivityIndicator color="#125643" />
                        ) : (
                            <Text style={styles.performanceNumber}>
                                {masteredCount}
                            </Text>
                        )}

                        <Text style={styles.performanceDescription}>
                            Quizzes with 80% or higher
                        </Text>
                    </View>

                    <View style={styles.reviewCard}>
                        <Text style={styles.performanceLabel}>
                            Needs More Review
                        </Text>

                        {loading ? (
                            <ActivityIndicator color="#125643" />
                        ) : (
                            <Text style={styles.performanceNumber}>
                                {reviewCount}
                            </Text>
                        )}

                        <Text style={styles.performanceDescription}>
                            Quizzes below 80%
                        </Text>
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>
                        Performance Guide
                    </Text>

                    <View style={styles.legendItem}>
                        <View style={styles.masteredDot} />
                        <Text style={styles.infoText}>
                            80% or higher – Mastered
                        </Text>
                    </View>

                    <View style={styles.legendItem}>
                        <View style={styles.reviewDot} />
                        <Text style={styles.infoText}>
                            Lower than 80% – Needs More Review
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125643',
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    back: {
        color: '#ACE2B6',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 20,
    },

    title: {
        color: '#FFBA00',
        fontSize: 28,
        fontWeight: '800',
    },

    subtitle: {
        color: '#ACE2B6',
        fontSize: 14,
        marginTop: 8,
        marginBottom: 25,
        lineHeight: 20,
    },

    sectionTitle: {
        color: '#F8F8F8',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 25,
    },

    statBox: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 15,
        minHeight: 125,
        justifyContent: 'center',
    },

    statLabel: {
        color: '#125643',
        fontSize: 14,
        fontWeight: '700',
    },

    statNumber: {
        color: '#125643',
        fontSize: 32,
        fontWeight: '800',
        marginTop: 10,
    },

    statDescription: {
        color: '#557568',
        fontSize: 12,
        marginTop: 5,
    },

    performanceContainer: {
        gap: 12,
        marginBottom: 25,
    },

    performanceCard: {
        backgroundColor: '#ACE2B6',
        borderRadius: 15,
        padding: 18,
    },

    reviewCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 18,
    },

    performanceLabel: {
        color: '#125643',
        fontSize: 16,
        fontWeight: '700',
    },

    performanceNumber: {
        color: '#125643',
        fontSize: 36,
        fontWeight: '800',
        marginTop: 8,
    },

    performanceDescription: {
        color: '#557568',
        fontSize: 13,
        marginTop: 4,
    },

    infoBox: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 18,
    },

    infoTitle: {
        color: '#125643',
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 12,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    masteredDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ACE2B6',
        marginRight: 10,
    },

    reviewDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#B46617',
        marginRight: 10,
    },

    infoText: {
        color: '#125643',
        fontSize: 13,
    },

    logo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F8F8F8',
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: -1,
    },

    titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
    },
});
