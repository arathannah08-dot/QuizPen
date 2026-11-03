import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../../components/ui/ActButton';
import { getFlashcard } from '../../../storage/flashcard';

export default function Flashscreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [flashcard, setFlashcard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const loadFlashcards = async () => {
      const data = await getFlashcard();

      if (data) {
        setFlashcard(data[Number(id)] || null);
      }
    };

    loadFlashcards();
  }, [id]);

  if (!flashcard) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading flashcard...</Text>
      </SafeAreaView>
    );
  }

  const cards = Array.isArray(flashcard.flash)
    ? flashcard.flash
    : [];

  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No flashcards available.</Text>
        <ActButton
          name="Go Back"
          onPress={() => router.push('/(tabs)/flashcards')}
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
      <Text style={styles.title}>{flashcard.title}</Text>
      <Text style={styles.description}>{flashcard.desc}</Text>

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
        onPress={() => router.push('/(tabs)/flashcards')}
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