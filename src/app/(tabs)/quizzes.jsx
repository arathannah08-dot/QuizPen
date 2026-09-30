import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Display from '../../components/ui/Display';
import SearchInput from '../../components/ui/SearchInput';
import { deleteQuiz, getQuiz } from '../../storage/quiz';

export default function Quizzes() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(
        useCallback(() => {
            const loadQuizzes = async () => {
                const data = await getQuiz();
                setQuizzes(data || []);
            };

            loadQuizzes();
        }, [])
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.header}>
                Quizzes
            </Text>

            <SearchInput type="Search quiz ..." />

            {quizzes.map((item, index) => (
                <Display
                    key={index}
                    title={item.title}
                    desc={item.desc}
                    length={item.quiz ? item.quiz.length : 0}
                    name="Items"

                    onPress={() =>
                        router.push({
                            pathname: '/screens/quizscreen/[id]',
                            params: { id: index }
                        })
                    }

                    onDelete={async () => {
                        await deleteQuiz(index);

                        const data = await getQuiz();

                        setQuizzes(data || []);
                    }}
                />
            ))}
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
});
