import { ScrollView, StyleSheet, View, Text} from 'react-native';
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
      <ScrollView style={styles.container}>
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

        <Text style={styles.subTxt}>
          Add Title
        </Text>
        <UserInput 
         type="Title"
         value={title}
         onChangeText={setTitle}/>

        <Text style={styles.subTxt}>
          Add Description
        </Text>
        <UserInput 
         type="Description"
         value={desc}
         onChangeText={setDesc}/>

        <AddSign 
         style={styles.addSign}
         icon="add-circle"
         size={30}
         color="darkblue"
         onPress={addQuiz}
        />
        
        {quiz.map((item, index) => (
          <View
           style={styles.cards} 
           key={index}>
            
            <Text style={styles.subTxt}>
              Add Question
            </Text>
            <Add 
             add="Question"
             value={item.question}
             onChangeText={(text) => {
              const updatedQuiz = [...quiz];
              updatedQuiz[index].question = text;
              setQuiz(updatedQuiz);
             }}
            />

            <Text style={styles.subTxt}>
              Add Answer
            </Text>
            <Add 
             add="Answer"
             value={item.answer}
             onChangeText={(text) => {
              const updatedQuiz = [...quiz];
              updatedQuiz[index].answer = text;
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

          setTitle('');
          setDesc('');
          setQuiz([
            {
              question: '',
              answer: ''
            }
          ]);

          router.push('/(tabs)/quizzes');
         }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create ({
  container: {
    marginRight: 15,
    marginLeft: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
    gap: 5
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },

  addSign: {
    alignSelf: 'flex-end',
    marginTop: 15
  },

  cards: {
    marginBottom: 20
  }
})