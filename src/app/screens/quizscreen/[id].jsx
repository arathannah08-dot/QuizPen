
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getQuiz, saveQuizResult } from '../../../storage/quiz';

// Shuffle choices randomly
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i]
    ];
  }

  return shuffled;
};

// Automatically generate multiple choices
const generateChoices = (quiz) => {

  return quiz.map((item, index) => {

    // Get correct answers from OTHER questions only
    const wrongAnswers = quiz
      .filter((otherItem, otherIndex) =>
        otherIndex !== index
      )
      .map(otherItem => otherItem.answer);

    // Randomly select 3 incorrect answers
    const randomWrongAnswers = shuffleArray(
      wrongAnswers
    ).slice(0, 3);

    // Combine correct and incorrect answers
    const choices = shuffleArray([
      item.answer,
      ...randomWrongAnswers
    ]);

    return {
      question: item.question,
      options: choices,
      correctAnswer: choices.findIndex(
        answer => answer.toLowerCase() ===
          item.answer.toLowerCase()
      )
    };
  });
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [quizData, setQuizData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  // Load quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuiz();

        const savedQuiz = data[Number(id)];

        if (savedQuiz && savedQuiz.quiz) {

          // Generate choices automatically
          const generatedQuiz = generateChoices(
            savedQuiz.quiz
          );

          setQuizData({
            ...savedQuiz,
            quiz: generatedQuiz
          });

        } else {
          console.log('Quiz not found.');
        }

      } catch (error) {
        console.log('Error loading quiz:', error);
      }
    };

    loadQuiz();
  }, [id]);

  if (!quizData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading quiz...</Text>
      </SafeAreaView>
    );
  }

  const question = quizData.quiz[current];

  // Check selected answer
  const checkAnswer = () => {
    if (selected === null) return;

    if (selected === question.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setAnswered(true);
  };

  // Go to next question
  const nextQuestion = async () => {
      if (current + 1 < quizData.quiz.length) {
          setCurrent(current + 1);
          setSelected(null);
          setAnswered(false);
      } else {
          const saved = await saveQuizResult(
              quizData.id,
              score,
              quizData.quiz.length
          );

          if (!saved) {
              console.log('Unable to save quiz result.');
          }

          setFinished(true);
      }
  };

  // Quiz result
  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.result}>

      <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
          <Text style={styles.title}>
            Quiz Completed!
          </Text>

          <Text style={styles.score}>
            {score} / {quizData.quiz.length}
          </Text>

          <Text style={styles.text}>
            Your Final Score
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>
              Back to Quizzes
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          {quizData.title}
        </Text>

        <Text style={styles.progress}>
          Question {current + 1} of {quizData.quiz.length}
        </Text>

        <View style={styles.card}>

          <Text style={styles.question}>
            {question.question}
          </Text>

          {question.options.map((option, index) => {

            const isCorrect =
              answered &&
              index === question.correctAnswer;

            const isWrong =
              answered &&
              selected === index &&
              index !== question.correctAnswer;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,

                  selected === index && !answered &&
                    styles.selected,

                  isCorrect && styles.correct,

                  isWrong && styles.wrong
                ]}
                disabled={answered}
                onPress={() => setSelected(index)}
              >
                <Text style={styles.optionText}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}

          {answered && (
            <Text style={styles.feedback}>
              {selected === question.correctAnswer
                ? 'Correct Answer!'
                : `Incorrect! Correct answer: ${question.options[question.correctAnswer]}`}
            </Text>
          )}

          {!answered ? (
            <TouchableOpacity
              style={[
                styles.button,
                selected === null && styles.disabled
              ]}
              disabled={selected === null}
              onPress={checkAnswer}
            >
              <Text style={styles.buttonText}>
                Check Answer
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={nextQuestion}
            >
              <Text style={styles.buttonText}>
                {current + 1 === quizData.quiz.length
                  ? 'See Results'
                  : 'Next Question'}
              </Text>
            </TouchableOpacity>
          )}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e0945'
  },

  content: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e9e4f1',
    textAlign: 'center',
    marginBottom: 15
  },

  progress: {
    color: '#e9e4f1',
    textAlign: 'center',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#e9e4f1',
    padding: 20,
    borderRadius: 15
  },

  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3e0945'
  },

  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#3e0945',
    borderRadius: 10,
    marginBottom: 12
  },

  optionText: {
    fontSize: 16,
    color: '#3e0945'
  },

  selected: {
    backgroundColor: '#d5c2e3'
  },

  correct: {
    backgroundColor: '#a5e6ad',
    borderColor: 'green'
  },

  wrong: {
    backgroundColor: '#f3aaaa',
    borderColor: 'red'
  },

  feedback: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
    color: '#3e0945'
  },

  button: {
    backgroundColor: '#3e0945',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },

  disabled: {
    opacity: 0.4
  },

  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  score: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#e9e4f1',
    marginVertical: 15
  },

  text: {
    color: '#e9e4f1',
    fontSize: 18
  },

  backButton: {
  alignSelf: 'flex-start',
  marginBottom: 20,
  paddingVertical: 8,
  paddingHorizontal: 12
},

backButtonText: {
  color: '#e9e4f1',
  fontSize: 18,
  fontWeight: 'bold'
},
});
