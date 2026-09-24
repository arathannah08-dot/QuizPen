import { StyleSheet, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../../components/ui/UserInput'; 
import { useRouter } from 'expo-router'; 

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>QuizPen</Text>
      <Text>Ready to study?</Text>
      
      <UserInput type="Search ..."/>

      <Text>Continue Studying</Text>

      
      <Text>Recent Flashacards</Text>
    </SafeAreaView>
  );
}