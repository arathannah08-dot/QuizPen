import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 
import UserInput from '../components/ui/UserInput'; 
import ActButton from '../components/ui/ActButton'; 

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Text>QuizPen</Text>
      <Text>Log in to get back to your learning journey!</Text>
      
      <UserInput type="Email"/>
      <UserInput type="Password"/>

      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <ActButton 
      name="Login"
      onPress={() => router.push('/home')}
      />

      <Text>Don't have an account yet?</Text>
      <ActButton 
       name="Sign Up" variant="outline"
       onPress={() => router.push('/register')}
       />
    </SafeAreaView>
  );
}