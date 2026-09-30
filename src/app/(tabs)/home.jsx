<<<<<<< Updated upstream
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
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
      <ScrollView>

        <Text style={styles.title}>QuizPen</Text>
        <Text>Ready to study?</Text>

        <UserInput type="Search ..." />

        <Text style={styles.sectionTitle}>Continue Studying</Text>

        <Text style={styles.sectionTitle}>Recent Flashcards</Text>

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

        <Text style={styles.sectionTitle}>Recent Quizzes</Text>

        {quizzes.slice(-3).reverse().map((item, index) => (
          <Display
            key={index}
            title={item.title}
            desc={item.desc}
            length={item.quiz.length}
            name="Questions"
            onPress={() =>
              router.push({
                pathname: '/screens/quizscreens/[id]',
                params: { id : index }
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
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
=======
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../../components/ui/UserInput';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.logo}>
                QuizPen
            </Text>

            <Text style={styles.welcome}>
                Ready to study?
            </Text>

            <UserInput type="Search ..." />

            <Text style={styles.sectionTitle}>
                Continue Studying
            </Text>

            <Text style={styles.sectionTitle}>
                Recent Flashcards
            </Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6FC',
        paddingHorizontal: 20,
    },

    logo: {
        fontSize: 32,
        fontWeight: '800',
        color: '#6C4AB6',
        marginTop: 20,
    },

    welcome: {
        fontSize: 18,
        color: '#817B8D',
        marginTop: 4,
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#292333',
        marginTop: 25,
        marginBottom: 10,
    },
});
>>>>>>> Stashed changes
