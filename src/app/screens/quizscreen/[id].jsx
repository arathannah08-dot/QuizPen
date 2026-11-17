
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getQuiz, saveQuizResult } from '../../../storage/quiz';

const TIMER_DURATION = 15;

// Shuffle array
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

// Generate multiple choices
const generateChoices = (quiz, shuffleChoices) => {
  return quiz.map((item, index) => {

    const wrongAnswers = quiz
      .filter((otherItem, otherIndex) => otherIndex !== index)
      .map(otherItem => otherItem.answer);

    const selectedWrongAnswers = shuffleArray(
      wrongAnswers
    ).slice(0, 3);

    const choices = [
      item.answer,
      ...selectedWrongAnswers
    ];

    const finalChoices = shuffleChoices
      ? shuffleArray(choices)
      : choices;

    return {
      question: item.question,
      options: finalChoices,
      correctAnswer: finalChoices.findIndex(
        answer =>
          answer.toLowerCase() === item.answer.toLowerCase()
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

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const [questionOrder, setQuestionOrder] = useState('chronological');
  const [shuffleChoices, setShuffleChoices] = useState(true);
  const [timerEnabled, setTimerEnabled] = useState(false);

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);

  // Load quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuiz();
        const savedQuiz = data[Number(id)];

        if (savedQuiz && savedQuiz.quiz) {
          const generatedQuiz = generateChoices(
            savedQuiz.quiz,
            true
          );

          setQuizData({
            ...savedQuiz,
            sourceQuiz: savedQuiz.quiz,
            originalQuiz: generatedQuiz,
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

  // Timer countdown
  useEffect(() => {
    if (
      !timerEnabled ||
      !quizData ||
      answered ||
      finished ||
      showSettings
    ) {
      return;
    }

    if (secondsLeft <= 0) {
      setAnswered(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [
    secondsLeft,
    timerEnabled,
    quizData,
    answered,
    finished,
    showSettings
  ]);

  // Apply settings
  const applySettings = () => {
    if (!quizData) return;

    const generatedQuiz = generateChoices(
      quizData.sourceQuiz,
      shuffleChoices
    );

    const orderedQuiz =
      questionOrder === 'shuffle'
        ? shuffleArray(generatedQuiz)
        : [...generatedQuiz];

    setQuizData({
      ...quizData,
      originalQuiz: generatedQuiz,
      quiz: orderedQuiz
    });

    // Reset quiz
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setSecondsLeft(TIMER_DURATION);

    setShowSettings(false);
  };

  // Check answer
  const checkAnswer = () => {
    if (selected === null || answered) return;

    if (selected === question.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setAnswered(true);
  };


  // Next question
  const nextQuestion = () => {
    if (current + 1 < quizData.quiz.length) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
      setSecondsLeft(TIMER_DURATION);
    } else {
      setFinished(true);
    }
  };

  if (!quizData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading quiz...</Text>
      </SafeAreaView>
    );
  }

  const question = quizData.quiz[current];

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

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowSettings(!showSettings)}
          >
            <Text style={styles.settingsButtonText}>
              ⚙ Settings
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>
          {quizData.title}
        </Text>

        {showSettings ? (

          /* SETTINGS */
          <View style={styles.settingsCard}>

            <Text style={styles.settingsTitle}>
              Quiz Settings
            </Text>

            <Text style={styles.settingsDescription}>
              Customize your quiz experience.
            </Text>

            {/* Question Order */}
            <Text style={styles.sectionTitle}>
              Question Preferences
            </Text>

            <TouchableOpacity
              style={[
                styles.settingOption,
                questionOrder === 'shuffle' && styles.settingSelected
              ]}
              onPress={() => setQuestionOrder('shuffle')}
            >
              <Text style={styles.settingText}>
                🔀 Shuffle Questions
              </Text>
              <Text style={styles.settingDescription}>
                Display questions in random order.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.settingOption,
                questionOrder === 'chronological' && styles.settingSelected
              ]}
              onPress={() => setQuestionOrder('chronological')}
            >
              <Text style={styles.settingText}>
                🔢 Chronological Order
              </Text>
              <Text style={styles.settingDescription}>
                Follow the original question order.
              </Text>
            </TouchableOpacity>

            {/* Shuffle Choices */}
            <Text style={styles.sectionTitle}>
              Answer Preferences
            </Text>

            <View style={styles.switchOption}>
              <View style={styles.switchInfo}>
                <Text style={styles.settingText}>
                  Shuffle Choices
                </Text>
                <Text style={styles.settingDescription}>
                  Randomize multiple-choice answers.
                </Text>
              </View>

              <Switch
                value={shuffleChoices}
                onValueChange={setShuffleChoices}
                trackColor={{
                  false: '#b9a9c5',
                  true: '#9b65bd'
                }}
                thumbColor="#ffffff"
              />
            </View>

            {/* Timer */}
            <Text style={styles.sectionTitle}>
              Time Preferences
            </Text>

            <View style={styles.switchOption}>
              <View style={styles.switchInfo}>
                <Text style={styles.settingText}>
                  Timer
                </Text>
                <Text style={styles.settingDescription}>
                  Enable a 15-second limit for each question.
                </Text>
              </View>

              <Switch
                value={timerEnabled}
                onValueChange={setTimerEnabled}
                trackColor={{
                  false: '#b9a9c5',
                  true: '#9b65bd'
                }}
                thumbColor="#ffffff"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={applySettings}
            >
              <Text style={styles.buttonText}>
                Apply Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSettings(false)}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          /* QUIZ */
          <>
            <Text style={styles.progress}>
              Question {current + 1} of {quizData.quiz.length}
            </Text>

            {timerEnabled && (
              <Text style={[
                styles.timer,
                secondsLeft <= 5 && styles.timerWarning
              ]}>
                ⏱ Time Left: {secondsLeft}s
              </Text>
            )}

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
                  {secondsLeft === 0 && timerEnabled
                    ? `Time's up! Correct answer: ${question.options[question.correctAnswer]}`
                    : selected === question.correctAnswer
                      ? 'Correct Answer!'
                      : `Incorrect! Correct answer: ${question.options[question.correctAnswer]}`
                  }
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
          </>
        )}

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

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginBottom: 10
  },

  timer: {
    color: '#e9e4f1',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },

  timerWarning: {
    color: '#ff8585'
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

  settingsButton: {
    padding: 10,
    marginBottom: 20
  },

  settingsButtonText: {
    color: '#e9e4f1',
    fontSize: 16,
    fontWeight: 'bold'
  },

  settingsCard: {
    backgroundColor: '#e9e4f1',
    padding: 20,
    borderRadius: 15
  },

  settingsTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#3e0945',
    marginBottom: 10
  },

  settingsDescription: {
    fontSize: 14,
    color: '#6b5570',
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3e0945',
    marginTop: 12,
    marginBottom: 10
  },

  settingOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#3e0945',
    borderRadius: 10,
    marginBottom: 12
  },

  settingSelected: {
    backgroundColor: '#d5c2e3',
    borderWidth: 2
  },

  settingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3e0945',
    marginBottom: 5
  },

  settingDescription: {
    fontSize: 13,
    color: '#6b5570'
  },

  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#3e0945',
    borderRadius: 10,
    marginBottom: 12
  },

  switchInfo: {
    flex: 1,
    paddingRight: 10
  },

  cancelButton: {
    alignItems: 'center',
    padding: 12,
    marginTop: 5
  },

  cancelText: {
    color: '#3e0945',
    fontWeight: 'bold',
    fontSize: 15
  }
});
