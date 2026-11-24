
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
import UserInput from '../../components/ui/UserInput';
import { getQuiz, updateQuiz } from '../../storage/quiz';

export default function EditQuiz() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [quiz, setQuiz] = useState([]);

    // Load the selected quiz
    useEffect(() => {
        const loadQuiz = async () => {
            try {
                const data = await getQuiz();

                const index = data.findIndex(
                    item => item.id === String(id)
                );

                if (index !== -1) {
                    const selectedQuiz = data[index];

                    setTitle(selectedQuiz.title || '');
                    setDesc(selectedQuiz.desc || '');
                    setQuiz(selectedQuiz.quiz || []);
                } else {
                    Alert.alert('Error', 'Quiz not found.', [
                        {
                            text: 'OK',
                            onPress: () => router.back()
                        }
                    ]);
                }
            } catch (error) {
                console.log('Error loading quiz:', error);
                Alert.alert('Error', 'Unable to load quiz.');
            }
        };

        loadQuiz();
    }, [id]);

    // Add another question
    const addQuiz = () => {
        setQuiz([
            ...quiz,
            { question: '', answer: '' }
        ]);
    };

    // Update a question or answer
    const updateQuestion = (index, field, text) => {
        const updatedQuiz = [...quiz];

        updatedQuiz[index] = {
            ...updatedQuiz[index],
            [field]: text
        };

        setQuiz(updatedQuiz);
    };

    // Save the edited quiz
    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Missing Title', 'Please enter a quiz title.');
            return;
        }

        if (quiz.length < 4) {
            Alert.alert(
                'Not Enough Questions',
                'A quiz must have at least 4 questions.'
            );
            return;
        }

        const hasEmptyQuestion = quiz.some(
            item =>
                !item.question.trim() ||
                !item.answer.trim()
        );

        if (hasEmptyQuestion) {
            Alert.alert(
                'Incomplete Quiz',
                'Please fill in every question and answer.'
            );
            return;
        }

        // Check for duplicate answers
        const answers = quiz.map(
            item => item.answer.trim().toLowerCase()
        );

        const hasDuplicateAnswers =
            new Set(answers).size !== answers.length;

        if (hasDuplicateAnswers) {
            Alert.alert(
                'Duplicate Answers',
                'Each question must have a unique answer.'
            );
            return;
        }

        try {
            const data = await getQuiz();

            const index = data.findIndex(
                item => item.id === String(id)
            );

            if (index === -1) {
                Alert.alert('Error', 'Quiz not found.');
                return;
            }

            const updatedQuiz = {
                ...data[index],
                title: title.trim(),
                desc: desc.trim(),
                quiz: quiz.map(item => ({
                    question: item.question.trim(),
                    answer: item.answer.trim()
                }))
            };

            const result = await updateQuiz(index, updatedQuiz);

            if (result) {
                Alert.alert('Saved', 'Quiz updated successfully.', [
                    {
                        text: 'OK',
                        onPress: () => router.back()
                    }
                ]);
            } else {
                Alert.alert('Error', 'Unable to update quiz.');
            }
        } catch (error) {
            console.log('Error updating quiz:', error);
            Alert.alert('Error', 'Something went wrong while saving.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.logo}>QuizPen</Text>

                    <View style={styles.header}>
                        <BackButton />
                        <Text style={styles.headerTxt}>
                            Edit Quiz
                        </Text>
                    </View>

                    <Text style={styles.subTxt}>Edit Title</Text>
                    <UserInput
                        type="Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.subTxt}>Edit Description</Text>
                    <UserInput
                        type="Description"
                        value={desc}
                        onChangeText={setDesc}
                    />

                    <Text style={styles.sectionTitle}>
                        Your Questions
                    </Text>

                    <AddSign
                        style={styles.addSign}
                        icon="add-circle"
                        size={38}
                        color="#FFBA00"
                        onPress={addQuiz}
                    />

                    {quiz.map((item, index) => (
                        <View style={styles.cards} key={index}>
                            <Text style={styles.cardTitle}>
                                Question {index + 1}
                            </Text>

                            <Text style={styles.subTxt}>
                                Question
                            </Text>

                            <Add
                                add="Enter question"
                                value={item.question}
                                onChangeText={(text) =>
                                    updateQuestion(index, 'question', text)
                                }
                            />

                            <Text style={styles.subTxt}>
                                Answer
                            </Text>

                            <Add
                                add="Enter answer"
                                value={item.answer}
                                onChangeText={(text) =>
                                    updateQuestion(index, 'answer', text)
                                }
                            />
                        </View>
                    ))}

                    <Pressable
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>
                            Save Changes
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#125643'
    },

    container: {
        flex: 1,
        paddingHorizontal: 20
    },

    content: {
        paddingBottom: 30
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 15
    },

    headerTxt: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFBA00'
    },

    subTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 5
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFBA00',
        marginTop: 20
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 5
    },

    addSign: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 5
    },

    cards: {
        marginTop: 15,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderRadius: 15
    },

    saveButton: {
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5
    },

    saveButtonText: {
        color: '#125643',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
