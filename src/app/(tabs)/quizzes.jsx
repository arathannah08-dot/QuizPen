import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../../components/ui/UserInput'; 
import { useRouter } from 'expo-router'; 

export default function Quizzes() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>QuizPen</Text>
      <Text>Flashcards</Text>
      
      <UserInput type="Search quiz ..."/>

    </SafeAreaView>
  );
}