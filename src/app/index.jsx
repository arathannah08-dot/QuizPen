import { StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 
import UserInput from '../components/ui/UserInput'; 
import ActButton from '../components/ui/ActButton'; 
import {getAccount} from '../storage/account';

export default function HomeScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <Text>QuizPen</Text>
      <Text>Log in to get back to your learning journey!</Text>
      
      <UserInput 
       type="Email"
       value={email}
       onChangeText={setEmail}
      />

      <UserInput 
       type="Password"
       value={password}
       onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <ActButton 
       name="Login"
       onPress={async() => {
        const account = await getAccount();

        if (account && account.email === email && account.password === password) {
          router.push('/home')
        } else {
          Alert.alert('Invalid email or password');
        }
       }}
      />

      <Text>Don't have an account yet?</Text>
      <ActButton 
       name="Sign Up" variant="outline"
       onPress={() => router.push('/register')}
       />
    </SafeAreaView>
  );
}