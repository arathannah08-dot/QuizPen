import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';
import UserInput from '../../components/ui/UserInput';
import AddSign from '../../components/ui/AddSign';
import Add from '../../components/ui/Add';  
import { useRouter } from 'expo-router'; 

export default function CreateQuiz() {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text>QuizPen</Text>
        <Text>Create Quiz</Text>

        <Text>Add Title</Text>
        <UserInput type="Title"/>
        <Text>Add Description</Text>
        <UserInput type="Description"/>

        <AddSign 
         icon="add-circle"
         size={30}
         color="darkblue"
         onPress={() => console.log("Add pressed")}
        />
        <Text>Add Question</Text>
        <Add add="Question"/>

        <Text>Add Answer</Text>
        <Add add="Answer"/>

        <ActButton 
         name="Save Quiz"
         onPress={() => router.push('/(tabs)/quizzes')}
        />

    </SafeAreaView>
  );
}