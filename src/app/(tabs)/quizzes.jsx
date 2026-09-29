import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { useEffect, useCallback, useState } from 'react';
import SearchInput from '../../components/ui/SearchInput'; 
import { useRouter } from 'expo-router'; 
import { getQuiz } from '../../storage/quiz';
import Display from '../../components/ui/Display';
import { deleteQuiz } from '../../storage/quiz';

export default function Quizzes() {
  const router = useRouter();

  const [quizzes, setQuizzes] = useState ([]);

  useEffect (
    useCallback (() => {
    const loadQuizzes = async () => {
      const data = await getQuiz();
      setQuizzes(data);
    };

    loadQuizzes();
  }, []));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Quizzes</Text>
      
      <SearchInput type="Search quiz ..."/>

      {quizzes.map((item, index) => (
        <Display
         key={index}
         title={item.title}
         desc={item.desc}
         length={item.quiz.length}
         name='Items'
         onPress={() => router.push({
          pathname: '/screens/quizscreen/[id]',
          params: {id: index}
         })}

         onDelete={ async() => {
          await deleteQuiz(index);
        
          const data = await getQuiz();
          setQuizzes(data || []);
        }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  container: {
    marginRight: 15,
    marginLeft: 15
  },

  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15
  }
})