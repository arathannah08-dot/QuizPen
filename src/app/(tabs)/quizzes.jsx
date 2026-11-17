import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Display from '../../components/ui/Display';
import SearchInput from '../../components/ui/SearchInput';
import { Favorite, getFavoriteIds } from '../../storage/favorites';
import { deleteQuiz, getQuiz } from '../../storage/quiz';

export default function Quizzes() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All');

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

    const handleFavorite = async (index) => {
        const success = await Favorite('quiz', itemId);

        if (success) {
            const favorites = await getFavoriteIds('quiz');
            setFavoriteIds(favorites);
        }   
    };

    const displayQuizzes = selectedFilter === 'Favorites'
        ? quizzes.filter(item => favoriteIds.includes(item.id))
        : quizzes;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.header}>
                Quizzes
            </Text>

            <SearchInput type="Search quiz ..." />


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
                    const originalIndex = quizzes.findIndex(q => q.id === item.id); 

            
                return (
                <Display
                    key={item.id}
                    title={item.title}
                    desc={item.desc}
                    length={item.quiz ? item.quiz.length : 0}
                    name="Items"

            onPress={() =>
                router.push({
                    pathname: '/screens/quizscreen/[id]',
                    params: { id: String(index) }
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
            <Text style={styles.emptyText} >
                {selectedFilter === 'Favorites'
                    ? 'You have no favorite quizzes yet.'
                    : 'No quizzes found.'}
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
