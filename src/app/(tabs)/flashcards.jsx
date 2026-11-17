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

    const handleFavorite = async (index) => {
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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >

            <Text style={styles.header}>
                Flashcards
            </Text>

            <View>
                <SearchInput type="Search flashcard ..." />
            </View>

            <View styles={styles.filterContainer}>

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
                            styles.filterButton,
                            selectedFilter === filter && styles.activeFilterText
                        ]}
                    >
                        {filter}
                    </Text>
                </TouchableOpacity>
                ))}
            </View>

            {displayFlashcards.length > 0 ? (
                displayFlashcards.map(item => {
                    const index = flashcards.findIndex(flashcard => flashcard.id === item.id);

                    return (
                        
                <Display
                    key={index}
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
                                            await deleteFlashcard(originalIndex);
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
            <Text style={styles.emptyText} >
                {selectedFilter === 'Favorites'
                    ? 'You have no favorite flashcards yet.'
                    : 'No flashcards found.'}
            </Text>
        )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#3e0945',
    },

    content: {
        paddingHorizontal: 15,
        paddingBottom: 30,
    },

    header: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#e9e4f1',
        marginTop: 25,
        marginBottom: 15,
    },
    
        filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        marginBottom: 5,
    },

    filterButton: {
        paddingVertical: 9,
        paddingHorizontal: 22,
        borderRadius: 20,
        backgroundColor: '#6C4AB6',
    },

    activeFilter: {
        backgroundColor: '#E9E4F1',
    },

    filterText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },

    activeFilterText: {
        color: '#3e0945',
    },

    emptyText: {
        color: '#e9e4f1',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 35,
    },

});