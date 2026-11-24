
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

import {
    deleteFlashcard,
    getFlashcard
} from '../../storage/flashcard';

import {
    Favorite,
    getFavoriteIds
} from '../../storage/favorites';

export default function Flashcards() {
    const router = useRouter();

    const [flashcards, setFlashcards] = useState([]);
    const [search, setSearch] = useState('');
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');

    const loadData = useCallback(async () => {
        const data = await getFlashcard();
        const favorites = await getFavoriteIds('flashcard');

        setFlashcards(data || []);
        setFavoriteIds(favorites || []);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const handleFavorite = async (itemId) => {
        const success = await Favorite('flashcard', itemId);

        if (success) {
            const favorites = await getFavoriteIds('flashcard');
            setFavoriteIds(favorites);
        }
    };

    const displayFlashcards = selectedFilter === 'Favorites'
        ? flashcards.filter(item => favoriteIds.includes(item.id))
        : flashcards;

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

                {/* Page Title */}
                <Text style={styles.header}>
                    Your Flashcards
                </Text>

                <Text style={styles.subtitle}>
                    Check out your flashcards
                </Text>

                {/* Filters */}
                <View style={styles.filterContainer}>

                    {['All', 'Favorites'].map(filter => (
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
                                {filter === 'Favorites' ? 'Favorite' : filter}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </View>

                {/* Flashcard List */}
                {displayFlashcards.length > 0 ? (
                    displayFlashcards.map(item => {
                        const index = flashcards.findIndex(
                            flashcard => flashcard.id === item.id
                        );

                        return (
                            <Display
                                key={item.id}
                                title={item.title}
                                desc={item.desc}
                                length={item.flash ? item.flash.length : 0}
                                name="Cards"

                                isFavorite={favoriteIds.includes(item.id)}

                                onFavorite={() => handleFavorite(item.id)}

                                onPress={() =>
                                    router.push({
                                        pathname: '/screens/flashscreen/[id]',
                                        params: { id: index }
                                    })
                                }

                                onEdit={() =>
                                    router.push({
                                        pathname: '/screens/editflash',
                                        params: { id: index }
                                    })
                                }

                                onDelete={async () => {
                                    Alert.alert(
                                        'Delete Flashcard',
                                        'Are you sure you want to delete this flashcard?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Delete',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    await deleteFlashcard(index);
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
                            ? 'You have no favorite flashcards yet.'
                            : 'No flashcards found.'}
                    </Text>
                )}

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

    searchContainer: {
        marginBottom: 18,
    },

    header: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFBA00',
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 14,
        color: '#ACE2B6',
        marginBottom: 18,
    },

    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 2,
        marginBottom: 8,
    },

    filterButton: {
        minWidth: 90,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 22,
        borderRadius: 20,
        backgroundColor: '#ACE2B6',
    },

    activeFilter: {
        backgroundColor: '#F8F8F8',
    },

    filterText: {
        color: '#125643',
        fontSize: 15,
        fontWeight: '700',
    },

    activeFilterText: {
        color: '#125643',
    },

    emptyText: {
        color: '#ACE2B6',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 35,
    },

});
