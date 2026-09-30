import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Display from '../../components/ui/Display';
import UserInput from '../../components/ui/UserInput';

import { getFlashcard } from '../../storage/flashcard';
import { getQuiz } from '../../storage/quiz';

export default function Home() {
    const router = useRouter();

    const [flashcards, setFlashcards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const loadFlashcards = async () => {
            const flashcardData = await getFlashcard();
            const quizData = await getQuiz();

            setFlashcards(flashcardData || []);
            setQuizzes(quizData || []);
        };

        loadFlashcards();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.content}
            >

                {/* Header */}
                <Text style={styles.logo}>
                    QuizPen
                </Text>

                <Text style={styles.welcome}>
                    Ready to study?
                </Text>

                {/* Search */}
                <UserInput type="Search ..." />

                {/* Continue Studying */}
                <Text style={styles.sectionTitle}>
                    Continue Studying
                </Text>

                {/* Recent Flashcards */}
                <Text style={styles.sectionTitle}>
                    Recent Flashcards
                </Text>

                {flashcards.map((item, index) => (
                    <Display
                        key={index}
                        title={item.title}
                        desc={item.desc}
                        length={item.flash?.length || 0}
                        name="Cards"
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
                    .slice(-3)
                    .reverse()
                    .map((item, index) => (
                        <Display
                            key={index}
                            title={item.title}
                            desc={item.desc}
                            length={item.quiz?.length || 0}
                            name="Questions"
                            onPress={() =>
                                router.push({
                                    pathname: '/screens/quizscreens/[id]',
                                    params: { id: index }
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
        backgroundColor: '#3e0945',
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    logo: {
        fontSize: 32,
        fontWeight: '800',
        color: '#a997ce',
        marginTop: 20,
    },

    welcome: {
        fontSize: 18,
        color: '#e9e4f1',
        marginTop: 4,
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#e9e4f1',
        marginTop: 25,
        marginBottom: 10,
    },

});