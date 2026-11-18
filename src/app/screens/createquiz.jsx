
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Add from '../../components/ui/Add';
import AddSign from '../../components/ui/AddSign';
import BackButton from '../../components/ui/BackButton';
import UserInput from '../../components/ui/UserInput';
import { saveQuiz } from '../../storage/quiz';

export default function CreateQuiz() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [quiz, setQuiz] = useState([
        {
            question: '',
            answer: ''
        }
    ]);

    // Add another question
    const addQuiz = () => {
        setQuiz([
            ...quiz,
            {
                question: '',
                answer: ''
            }
        ]);
    };

    // Update question
    const updateQuestion = (index, text) => {
        const updatedQuiz = [...quiz];

        updatedQuiz[index] = {
            ...updatedQuiz[index],
            question: text
        };

        setQuiz(updatedQuiz);
    };

    // Update correct answer
    const updateAnswer = (index, text) => {
        const updatedQuiz = [...quiz];

        updatedQuiz[index] = {
            ...updatedQuiz[index],
            answer: text
        };

        setQuiz(updatedQuiz);
    };

    // Save quiz
    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Missing Title', 'Please enter a quiz title.');
            return;
        }

        if (quiz.length < 4) {
            Alert.alert(
                'Not Enough Questions',
                'Please add at least 4 questions.'
            );
            return;
        }

        const hasEmptyQuestion = quiz.some(
            item => !item.question.trim() || !item.answer.trim()
        );

        if (hasEmptyQuestion) {
            Alert.alert(
                'Incomplete Quiz',
                'Please complete every question and answer.'
            );
            return;
        }

        const answers = quiz.map(item =>
            item.answer.trim().toLowerCase()
        );

        if (new Set(answers).size !== answers.length) {
            Alert.alert(
                'Duplicate Answers',
                'Every question must have a different correct answer.'
            );
            return;
        }

        try {
            const result = await saveQuiz({
                title: title.trim(),
                desc: desc.trim(),
                quiz: quiz.map(item => ({
                    question: item.question.trim(),
                    answer: item.answer.trim()
                }))
            });

            if (result === true) {
                Alert.alert(
                    'Success',
                    'Your quiz has been saved!',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.replace('/quizzes')
                        }
                    ]
                );
            } else {
                Alert.alert('Error', 'Unable to save your quiz.');
            }
        } catch (error) {
            console.log('Save error:', error);
            Alert.alert('Error', 'Something went wrong while saving.');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <Text style={styles.logo}>QuizPen</Text>

                    <View style={styles.header}>
                        <BackButton />

                        <Text style={styles.headerTxt}>
                            Create Quiz
                        </Text>
                    </View>

                    <Text style={styles.subTxt}>Add Title</Text>

                    <UserInput
                        type="Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.subTxt}>Add Description</Text>

                    <UserInput
                        type="Description"
                        value={desc}
                        onChangeText={setDesc}
                    />

                    <Text style={styles.instruction}>
                        Add at least 4 questions with different correct answers.
                        The app will automatically generate 4 multiple-choice
                        options for each question.
                    </Text>

                    <AddSign
                        style={styles.addSign}
                        icon="add-circle"
                        size={30}
                        color="#FFBA00"
                        onPress={addQuiz}
                    />

                    {quiz.map((item, index) => (
                        <View style={styles.cards} key={index}>
                            <Text style={styles.questionTitle}>
                                Question {index + 1}
                            </Text>

                            <Text style={styles.subTxt}>
                                Add Question
                            </Text>

                            <Add
                                add="Question"
                                value={item.question}
                                onChangeText={(text) =>
                                    updateQuestion(index, text)
                                }
                            />

                            <Text style={styles.subTxt}>
                                Add Correct Answer
                            </Text>

                            <Add
                                add="Correct Answer"
                                value={item.answer}
                                onChangeText={(text) =>
                                    updateAnswer(index, text)
                                }
                            />
                        </View>
                    ))}

                    <Pressable
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>
                            Save Quiz Set
                        </Text>
                    </Pressable>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#125643'
    },

    container: {
        marginHorizontal: 15
    },

    content: {
        paddingBottom: 30
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 15,
        marginBottom: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10
    },

    headerTxt: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFBA00'
    },

    subTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ACE2B6',
        marginTop: 10,
        marginBottom: 5
    },

    instruction: {
        fontSize: 13,
        color: '#ACE2B6',
        marginTop: 15,
        lineHeight: 19
    },

    addSign: {
        alignSelf: 'flex-end',
        marginTop: 15,
        marginBottom: 10
    },

    cards: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderRadius: 15
    },

    questionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#125643'
    },

    saveButton: {
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },

    saveButtonText: {
        color: '#125643',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
