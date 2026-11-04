import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../../components/ui/ActButton';
import { getQuiz } from '../../../storage/quiz';

export default function Flashscreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await getQuiz();

      if (data) {
        setQuiz(data[Number(id)] || null);
      }
    };

    loadQuizzes();
  }, [id]);

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading quiz...</Text>
      </SafeAreaView>
    );
  }

  const cards = Array.isArray(quiz.quiz)
    ? quiz.quiz
    : [];

  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No quiz questions available.</Text>
        <ActButton
          name="Go Back"
          onPress={() => router.push('/(tabs)/quizzes')}
        />
      </SafeAreaView>
    );
  }

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    setCurrentIndex((currentIndex + 1) % cards.length);
    setShowAnswer(false);
  };

  const previousCard = () => {
    setCurrentIndex(
      (currentIndex - 1 + cards.length) % cards.length
    );
    setShowAnswer(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{quiz.title}</Text>
      <Text style={styles.description}>{quiz.question}</Text>

      <Text style={styles.counter}>
        Card {currentIndex + 1} of {cards.length}
      </Text>

      <TouchableOpacity
        style={styles.flashcard}
        activeOpacity={0.8}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <Text style={styles.label}>
          {showAnswer ? 'ANSWER' : 'DESCRIPTION'}
        </Text>

        <Text style={styles.cardText}>
          {showAnswer
            ? currentCard.answer
            : currentCard.description || currentCard.question || ''}
        </Text>

        <Text style={styles.tapText}>
          Tap to {showAnswer ? 'see description' : 'reveal answer'}
        </Text>
      </TouchableOpacity>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={previousCard}
        >
          <Text style={styles.navText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={nextCard}
        >
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>

      <ActButton
        name="Go Back"
        onPress={() => router.push('/(tabs)/quizzes')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5
  },

  description: {
    fontSize: 15,
    marginBottom: 20
  },

  counter: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 15
  },

  flashcard: {
    minHeight: 250,
    backgroundColor: '#3e0945',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },

  label: {
    color: '#FF4F87',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20
  },

  cardText: {
    color: '#e9e4f1',
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  tapText: {
    color: '#c9bfd3',
    marginTop: 25,
    fontSize: 13
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20
  },

  navButton: {
    backgroundColor: '#FF4F87',
    padding: 12,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center'
  },

  navText: {
    color: 'white',
    fontWeight: 'bold'
  }
});