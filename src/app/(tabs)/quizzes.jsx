import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { use, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../../components/ui/UserInput'; 
import { useRouter } from 'expo-router'; 
import { getQuiz } from '../../storage/quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Quizzes() {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState ([]);

  useEffect (() => {
    const loadQuizzes = async () => {
      const data = await getQuiz();
      setQuizzes(data);
    };

    loadQuizzes();
  }, []);

  return (
    <SafeAreaView>
      <Text>Flashcards</Text>
      
      <UserInput type="Search quiz ..."/>

      {quizzes.map((item, index) => (
        <TouchableOpacity key={index}>
          <Text>{item.title}</Text>
          <Text>{item.desc}</Text>
        </TouchableOpacity>
      ))}

    </SafeAreaView>
  );
}