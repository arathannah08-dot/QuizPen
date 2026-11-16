
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFlashcard } from '../../storage/flashcard';

export default function Performance() {
    const router = useRouter();

    const [flashcardCount, setFlashcardCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadPerformance = async () => {
        try {
            setLoading(true);

            const flashcards = await getFlashcard();

            setFlashcardCount(flashcards.length);
        } catch (error) {
            console.log('Error loading performance:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPerformance();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')}>
                <Text style={styles.back}>‹ Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Performance</Text>
            <Text style={styles.subtitle}>
                Here's a quick look at your learning activity.
            </Text>

            <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Flashcards</Text>

                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.statNumber}>
                        {flashcardCount}
                    </Text>
                )}

                <Text style={styles.statDescription}>
                    Flashcards saved.
                </Text>
            </View>

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

    statBox: {
        backgroundColor: '#6b1376',
        borderRadius: 12,
        padding: 22,
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
        fontSize: 42,
        fontWeight: 'bold',
        marginTop: 12,
    },

    statDescription: {
        color: '#d7c9df',
        fontSize: 13,
        marginTop: 5,
    },

    infoBox: {
        marginTop: 20,
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
