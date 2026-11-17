
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

                <Text
                    style={styles.back}
                    onPress={() => router.replace('/(tabs)/profile')}
                >
                    ‹ Back
                </Text>

                <Text style={styles.title}>Activity History</Text>

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
                            color="#e9e4f1"
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
                        activities.map((item, index) => (
                            <View
                                style={styles.activityCard}
                                key={item.activityId}
                            >
                                <View style={styles.activityHeader}>
                                    <View style={styles.typeContainer}>
                                        <Text style={styles.activityIcon}>
                                            {item.type === 'Quiz' ? '✎' : '✦'}
                                        </Text>

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
        marginTop: 8,
        fontSize: 14,
        lineHeight: 21,
    },

    summaryBox: {
        backgroundColor: '#6b1376',
        borderRadius: 12,
        padding: 18,
        marginTop: 25,
        borderWidth: 1,
        borderColor: '#9c94ae',
    },

    summaryTitle: {
        color: '#ffffff',
        fontSize: 16,
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
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
    },

    summaryLabel: {
        color: '#e0d3e5',
        fontSize: 13,
        marginTop: 5,
    },

    divider: {
        width: 1,
        height: 45,
        backgroundColor: '#92539b',
    },

    section: {
        marginTop: 30,
        marginBottom: 20,
    },

    sectionTitle: {
        color: '#e9e4f1',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    activityCard: {
        backgroundColor: '#6b1376',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#92539b',
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
        color: '#e9e4f1',
        fontSize: 18,
        marginRight: 8,
    },

    activityType: {
        color: '#d8b9df',
        fontSize: 13,
        fontWeight: '600',
    },

    cardTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    cardDescription: {
        color: '#e0d3e5',
        fontSize: 14,
        marginTop: 6,
        lineHeight: 20,
    },

    cardDetails: {
        borderTopWidth: 1,
        borderTopColor: '#92539b',
        marginTop: 15,
        paddingTop: 12,
    },

    cardCount: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },

    cardDate: {
        color: '#d8c8df',
        fontSize: 12,
        marginTop: 7,
    },

    emptyBox: {
        backgroundColor: '#6b1376',
        borderRadius: 12,
        padding: 25,
        alignItems: 'center',
    },

    emptyTitle: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    emptyText: {
        color: '#d8c8df',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
