
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
import { getQuiz } from '../../storage/quiz';

export default function Activity() {
    const router = useRouter();

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load the current user's flashcard and quiz activities
    useFocusEffect(
        useCallback(() => {
            let active = true;

            const loadActivities = async () => {
                setLoading(true);

                try {
                    const flashcards = await getFlashcard();
                    const quizzes = await getQuiz();

                    // Add activity types to each item
                    const flashcardActivities = (
                        Array.isArray(flashcards) ? flashcards : []
                    ).map((item, index) => ({
                        ...item,
                        type: 'Flashcard Set',
                        itemCount: Array.isArray(item.flash)
                            ? item.flash.length
                            : 0,
                        activityId: item.id || `flashcard-${index}`,
                    }));

                    const quizActivities = (
                        Array.isArray(quizzes) ? quizzes : []
                    ).map((item, index) => ({
                        ...item,
                        type: 'Quiz',
                        itemCount: Array.isArray(item.quiz)
                            ? item.quiz.length
                            : 0,
                        activityId: item.id || `quiz-${index}`,
                    }));

                    // Combine both activity types
                    const allActivities = [
                        ...flashcardActivities,
                        ...quizActivities,
                    ];

                    // Sort by ID (Date.now), newest first
                    allActivities.sort((a, b) => {
                        const dateA = Number(a.id) || 0;
                        const dateB = Number(b.id) || 0;

                        return dateB - dateA;
                    });

                    if (active) {
                        setActivities(allActivities);
                    }

                } catch (error) {
                    console.log('Error loading activities:', error);
                } finally {
                    if (active) {
                        setLoading(false);
                    }
                }
            };

            loadActivities();

            return () => {
                active = false;
            };
        }, [])
    );

    // Format the creation date using the saved ID
    const formatDate = (id) => {
        const timestamp = Number(id);

        if (!timestamp || !Number.isFinite(timestamp)) {
            return 'Date unavailable';
        }

        return new Date(timestamp).toLocaleString();
    };

    const flashcardCount = activities.filter(
        item => item.type === 'Flashcard Set'
    ).length;

    const quizCount = activities.filter(
        item => item.type === 'Quiz'
    ).length;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.logo}>QuizPen</Text>

                <View style={styles.titleRow}>
                    <BackButton />
                    <Text style={styles.title}>Activity History</Text>
                </View>

                <Text style={styles.subtitle}>
                    View the flashcard sets and quizzes you've created.
                </Text>

                {/* Activity Summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>
                        Your Created Content
                    </Text>

                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>
                                {flashcardCount}
                            </Text>
                            <Text style={styles.summaryLabel}>
                                Flashcard Sets
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryNumber}>
                                {quizCount}
                            </Text>
                            <Text style={styles.summaryLabel}>
                                Quizzes
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Activity List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Recent Activities
                    </Text>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color="#F8F8F8"
                        />
                    ) : activities.length === 0 ? (
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyTitle}>
                                No activities yet
                            </Text>

                            <Text style={styles.emptyText}>
                                Your created flashcard sets and quizzes
                                will appear here.
                            </Text>
                        </View>
                    ) : (
                        activities.map((item) => (
                            <View
                                style={styles.activityCard}
                                key={item.activityId}
                            >
                                <View style={styles.activityHeader}>
                                    <View style={styles.typeContainer}>

                                        <Text style={styles.activityType}>
                                            {item.type} Created
                                        </Text>
                                    </View>
                                </View>

                                <Text style={styles.cardTitle}>
                                    {item.title || 'Untitled'}
                                </Text>

                                <Text style={styles.cardDescription}>
                                    {item.desc ||
                                        'No description provided.'}
                                </Text>

                                <View style={styles.cardDetails}>
                                    <Text style={styles.cardCount}>
                                        {item.itemCount}{' '}
                                        {item.type === 'Quiz'
                                            ? 'Questions'
                                            : 'Flashcards'}
                                    </Text>

                                    <Text style={styles.cardDate}>
                                        {formatDate(item.id)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

            </ScrollView>
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
        lineHeight: 21,
    },

    summaryBox: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 18,
        marginTop: 25,
    },

    summaryTitle: {
        color: '#125643',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 18,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },

    summaryNumber: {
        color: '#B46617',
        fontSize: 28,
        fontWeight: 'bold',
    },

    summaryLabel: {
        color: '#125643',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 5,
    },

    divider: {
        width: 1,
        height: 45,
        backgroundColor: '#ACE2B6',
    },

    section: {
        marginTop: 30,
        marginBottom: 20,
    },

    sectionTitle: {
        color: '#F8F8F8',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    activityCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,
    },

    activityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    activityIcon: {
        color: '#B46617',
        fontSize: 18,
        marginRight: 8,
    },

    activityType: {
        color: '#B46617',
        fontSize: 13,
        fontWeight: '700',
    },

    cardTitle: {
        color: '#125643',
        fontSize: 18,
        fontWeight: 'bold',
    },

    cardDescription: {
        color: '#527466',
        fontSize: 14,
        marginTop: 6,
        lineHeight: 20,
    },

    cardDetails: {
        borderTopWidth: 1,
        borderTopColor: '#ACE2B6',
        marginTop: 15,
        paddingTop: 12,
    },

    cardCount: {
        color: '#125643',
        fontSize: 13,
        fontWeight: '700',
    },

    cardDate: {
        color: '#527466',
        fontSize: 12,
        marginTop: 7,
    },

    emptyBox: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
    },

    emptyTitle: {
        color: '#125643',
        fontSize: 17,
        fontWeight: 'bold',
    },

    emptyText: {
        color: '#527466',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
