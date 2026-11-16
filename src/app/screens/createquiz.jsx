
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActButton from '../../components/ui/ActButton';
import Add from '../../components/ui/Add';
import AddSign from '../../components/ui/AddSign';
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

    // Check duplicate correct answers
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
              onPress: () =>
                router.replace('/quizzes')
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
      >

        <View style={styles.header}>
          <AddSign
            icon="arrow-back-outline"
            size={30}
            color="black"
            onPress={() => router.push('/(tabs)/create')}
          />

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
          color="darkblue"
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

        <ActButton 
         name="Save Quiz Set"
         onPress={handleSave}
        />

      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff'
  },

  container: {
    marginHorizontal: 15
  },

  content: {
    paddingBottom: 30
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 5
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  subTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },

  instruction: {
    fontSize: 13,
    color: '#666',
    marginTop: 15
  },

  addSign: {
    alignSelf: 'flex-end',
    marginTop: 15
  },

  cards: {
    marginBottom: 25,
    padding: 12,
    backgroundColor: '#f1e8f5',
    borderRadius: 12
  },

  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e0945'
  }
});
