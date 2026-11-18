
import Ionicons from '@expo/vector-icons/Ionicons';
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

import BackButton from '../../../components/ui/BackButton';
import { getQuiz } from '../../../storage/quiz';

const TIMER_DURATION = 15;

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
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>
                        Loading quiz...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const question = quizData.quiz[current];

    // Quiz result
    if (finished) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.result}>
                    <Text style={styles.logo}>
                        QuizPen
                    </Text>

                    <Ionicons
                        name="trophy-outline"
                        size={75}
                        color="#FFBA00"
                        style={styles.resultIcon}
                    />

                    <Text style={styles.resultTitle}>
                        Quiz Completed!
                    </Text>

                    <Text style={styles.score}>
                        {score} / {quizData.quiz.length}
                    </Text>

                    <Text style={styles.resultText}>
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.logo}>
                    QuizPen
                </Text>

                {/* Header */}
                <View style={styles.titleRow}>
                    <BackButton />

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {showSettings ? 'Quiz Settings' : quizData.title}
                        </Text>

                        {!showSettings && (
                            <Text style={styles.description}>
                                {quizData.desc}
                            </Text>
                        )}
                    </View>

                    {!showSettings && (
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={() => setShowSettings(true)}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#F8F8F8"
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {showSettings ? (
                    /* SETTINGS */
                    <View style={styles.settingsCard}>
                        <Text style={styles.settingsTitle}>
                            Customize Your Quiz
                        </Text>

                        <Text style={styles.settingsDescription}>
                            Adjust your quiz preferences before starting.
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
                                Shuffle Questions
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
                                Chronological Order
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
                                    false: '#ACE2B6',
                                    true: '#125643'
                                }}
                                thumbColor="#FFBA00"
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
                                    false: '#ACE2B6',
                                    true: '#125643'
                                }}
                                thumbColor="#FFBA00"
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
                                <Ionicons
                                    name="timer-outline"
                                    size={18}
                                    color={secondsLeft <= 5 ? '#FF8585' : '#ACE2B6'}
                                />
                                {' '}Time Left: {secondsLeft}s
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
    safeArea: {
        flex: 1,
        backgroundColor: '#125643'
    },

    container: {
        flex: 1
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        flexGrow: 1
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20
    },

    // Header
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },

    titleContainer: {
        flex: 1,
        marginLeft: 12
    },

    title: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#FFBA00'
    },

    description: {
        fontSize: 14,
        color: '#ACE2B6',
        marginTop: 4
    },

    settingsButton: {
        padding: 8,
        marginLeft: 8
    },

    progress: {
        color: '#ACE2B6',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10
    },

    timer: {
        color: '#ACE2B6',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },

    timerWarning: {
        color: '#FF8585'
    },

    card: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 15,
        marginTop: 5
    },

    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#125643'
    },

    option: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#125643',
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#FFFFFF'
    },

    optionText: {
        fontSize: 16,
        color: '#125643'
    },

    selected: {
        backgroundColor: '#ACE2B6'
    },

    correct: {
        backgroundColor: '#ACE2B6',
        borderColor: '#125643',
        borderWidth: 2
    },

    wrong: {
        backgroundColor: '#F3AAAA',
        borderColor: '#C62828',
        borderWidth: 2
    },

    feedback: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 15,
        color: '#125643'
    },

    button: {
        backgroundColor: '#FFBA00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15
    },

    buttonText: {
        color: '#125643',
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

    resultIcon: {
        marginBottom: 15
    },

    resultTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFBA00',
        textAlign: 'center'
    },

    score: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#F8F8F8',
        marginVertical: 15
    },

    resultText: {
        color: '#ACE2B6',
        fontSize: 18
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText: {
        color: '#F8F8F8',
        fontSize: 18
    },

    settingsCard: {
        backgroundColor: '#F8F8F8',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20
    },

    settingsTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 10
    },

    settingsDescription: {
        fontSize: 14,
        color: '#55756A',
        marginBottom: 20
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#125643',
        marginTop: 12,
        marginBottom: 10
    },

    settingOption: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#EFEFEF'
    },

    settingSelected: {
        backgroundColor: '#ACE2B6',
    },

    settingText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 5
    },

    settingDescription: {
        fontSize: 13,
        color: '#55756A'
    },

    switchOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#EFEFEF'
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
        color: '#125643',
        fontWeight: 'bold',
        fontSize: 15
    }
});
