
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Display from '../../components/ui/Display';
import SearchInput from '../../components/ui/SearchInput';

import { Favorite, getFavoriteIds } from '../../storage/favorites';
import { getFlashcard } from '../../storage/flashcard';
import { getQuiz } from '../../storage/quiz';

export default function Home() {
    const router = useRouter();

    const [flashcards, setFlashcards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [search, setSearch] = useState('');
    const [favoriteFlashcards, setFavoriteFlashcards] = useState([]);
    const [favoriteQuizzes, setFavoriteQuizzes] = useState([]);

    const loadData = useCallback(async () => {
        const flashcardData = await getFlashcard();
        const quizData = await getQuiz();

        const flashcardFavorites = await getFavoriteIds('flashcard');
        const quizFavorites = await getFavoriteIds('quiz');

        setFlashcards(flashcardData || []);
        setQuizzes(quizData || []);

        setFavoriteFlashcards(flashcardFavorites || []);
        setFavoriteQuizzes(quizFavorites || []);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const handleFavorite = async (itemType, itemId) => {
        const success = await Favorite(itemType, itemId);

        if (success) {
            if (itemType === 'flashcard') {
                const favorites = await getFavoriteIds('flashcard');
                setFavoriteFlashcards(favorites);
            } else {
                const favorites = await getFavoriteIds('quiz');
                setFavoriteQuizzes(favorites);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Header */}
                <Text style={styles.logo}>
                    QuizPen
                </Text>

                {/* Search */}
                <SearchInput
                    type="Search flashcards and quizzes..."
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Continue Studying */}
                <View style={styles.headingContainer}>
                    <Text style={styles.welcome}>
                        Continue where you left off
                    </Text>

                    <Text style={styles.subtitle}>
                        Check out your recent flashcards and quizzes
                    </Text>
                </View>

                {/* Recent Flashcards */}
                <Text style={styles.sectionTitle}>
                    Recent Flashcards
                </Text>

                {flashcards.map((item, index) => (
                    <Display
                        key={item.id}
                        title={item.title}
                        desc={item.desc}
                        length={item.flash?.length || 0}
                        name="Cards"

                        isFavorite={favoriteFlashcards.includes(item.id)}
                        onFavorite={() => handleFavorite('flashcard', item.id)}

                        onPress={() =>
                            router.push({
                                pathname: '/screens/flashscreen/[id]',
                                params: { id: index }
                            })
                        }
                    />
                ))}

                {/* Recent Quizzes */}
                <Text style={styles.sectionTitle}>
                    Recent Quizzes
                </Text>

                {quizzes
                    .map((item, index) => ({ item, index }))
                    .slice(-3)
                    .reverse()
                    .map(({ item, index }) => (
                        <Display
                            key={item.id}
                            title={item.title}
                            desc={item.desc}
                            length={item.quiz?.length || 0}
                            name="Questions"

                            isFavorite={favoriteQuizzes.includes(item.id)}
                            onFavorite={() => handleFavorite('quiz', item.id)}

                            onPress={() =>
                                router.push({
                                    pathname: '/screens/quizscreen/[id]',
                                    params: { id: String(index) }
                                })
                            }
                        />
                    ))}

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
        paddingTop: 15,
        paddingBottom: 30,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 12,
    },

    welcome: {
        fontSize: 24,
        fontWeight: '800',
        color: '#F8F8F8',
        marginBottom: 5
    },

    subtitle: {
        fontSize: 14,
        color: '#ACE2B6',
        marginBottom: 8,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F8F8F8',
        marginTop: 22,
        marginBottom: 10,
    },

    headingContainer: {
    marginTop: 24,
    },

});
