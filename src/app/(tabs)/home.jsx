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