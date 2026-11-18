
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Display from '../../components/ui/Display';
import SearchInput from '../../components/ui/SearchInput';
import { Favorite, getFavoriteIds } from '../../storage/favorites';
import { deleteQuiz, getQuiz } from '../../storage/quiz';

export default function Quizzes() {
    const router = useRouter();

    const [quizzes, setQuizzes] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [search, setSearch] = useState('');

    const loadData = useCallback(async () => {
        const data = await getQuiz();
        const favorites = await getFavoriteIds('quiz');

        setQuizzes(data || []);
        setFavoriteIds(favorites || []);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const handleFavorite = async (itemId) => {
        const success = await Favorite('quiz', itemId);

        if (success) {
            const favorites = await getFavoriteIds('quiz');
            setFavoriteIds(favorites);
        }
    };

    const displayQuizzes = quizzes.filter(item => {
        const matchesFilter = selectedFilter === 'Favorites'
            ? favoriteIds.includes(item.id)
            : true;

        const matchesSearch = item.title
            ?.toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.logo}>
                    QuizPen
                </Text>

                <Text style={styles.header}>
                    Your Quizzes
                </Text>

                <Text style={styles.subTxt}>
                    View and manage your saved quizzes
                </Text>

                <SearchInput
                    type="Search quiz ..."
                    value={search}
                    onChangeText={setSearch}
                />

                <View style={styles.filterContainer}>
                    {['All', 'Favorites'].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter && styles.activeFilter
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.activeFilterText
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {displayQuizzes.length > 0 ? (
                    displayQuizzes.map(item => {
                        const originalIndex = quizzes.findIndex(
                            q => q.id === item.id
                        );

                        return (
                            <Display
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                length={item.quiz ? item.quiz.length : 0}
                                name="Items"

                                isFavorite={favoriteIds.includes(item.id)}

                                onFavorite={() => handleFavorite(item.id)}

                                onPress={() =>
                                    router.push({
                                        pathname: '/screens/quizscreen/[id]',
                                        params: { id: String(originalIndex) }
                                    })
                                }

                                onEdit={() =>
                                    router.push({
                                        pathname: '/screens/editquiz',
                                        params: { id: item.id }
                                    })
                                }

                                onDelete={async () => {
                                    Alert.alert(
                                        'Delete Quiz',
                                        'Are you sure you want to delete this quiz?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Delete',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    await deleteQuiz(originalIndex);
                                                    await loadData();
                                                },
                                            },
                                        ]
                                    );
                                }}
                            />
                        );
                    })
                ) : (
                    <Text style={styles.emptyText}>
                        {selectedFilter === 'Favorites'
                            ? 'You have no favorite quizzes yet.'
                            : search
                                ? 'No matching quizzes found.'
                                : 'No quizzes found.'}
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#125643'
    },

    container: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFBA00',
        marginBottom: 5
    },

    subTxt: {
        fontSize: 15,
        color: '#ACE2B6',
        marginBottom: 15
    },

    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
        marginBottom: 15,
    },

    filterButton: {
        paddingVertical: 9,
        paddingHorizontal: 22,
        borderRadius: 20,
        backgroundColor: '#ACE2B6',
    },

    activeFilter: {
        backgroundColor: '#FFBA00',
    },

    filterText: {
        color: '#125643',
        fontWeight: '600',
    },

    activeFilterText: {
        color: '#125643',
    },

    emptyText: {
        color: '#F8F8F8',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 35,
    },
});
