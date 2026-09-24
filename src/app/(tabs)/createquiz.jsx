import { ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';
import UserInput from '../../components/ui/UserInput';
import AddSign from '../../components/ui/AddSign';
import Add from '../../components/ui/Add';  
import { useRouter } from 'expo-router';
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

  const addQuiz = () => {
    setQuiz([...quiz,
      {
        question: '',
        answer: '',
      }
    ]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Create Quiz</Text>

        <Text>Add Title</Text>
        <UserInput 
         type="Title"
         value={title}
         onChangeText={setTitle}/>

        <Text>Add Description</Text>
        <UserInput 
         type="Description"
         value={desc}
         onChangeText={setDesc}/>

        <AddSign 
         icon="add-circle"
         size={30}
         color="darkblue"
         onPress={addQuiz}
        />
        
        {quiz.map((item, index) => (
          <View key={index}>
            
            <Text>Add Question</Text>
            <Add 
             add="Question"
             value={item.question}
             onChangeText={(text) => {
              const updatedQuiz = [...quiz];
              updatedQuiz[index] = text;
              setQuiz(updatedQuiz);
             }}
            />

            <Text>Add Answer</Text>
            <Add 
             add="Answer"
             value={item.answer}
             onChangeText={(text) => {
              const updatedQuiz = [...quiz];
              updatedQuiz[index] = text;
              setQuiz(updatedQuiz);
             }}
            />

          </View>
        ))}

        <ActButton 
         name="Save Quiz Set"
         onPress={async() => {
          await saveQuiz({
            title: title,
            desc: desc,
            quiz: quiz
          });

          router.push('/(tabs)/quizzes');
         }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}