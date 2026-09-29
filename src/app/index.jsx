import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../components/ui/ActButton';
import UserInput from '../components/ui/UserInput';
import { getAccount } from '../storage/account';


export default function HomeScreen() {
  const router = useRouter();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <ScrollView
          contentContainerStyle={{ flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
        >

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
       isPassword
      />


      <TouchableOpacity>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>


      <ActButton
  name="Login"
  onPress={async () => {
    const trimmedEmail = email.trim();

    if (trimmedEmail === '' || password === '') {
      Alert.alert('Please fill in all fields.');
      return;
    }

    const account = await getAccount();

    console.log('Saved account:', account);
    console.log('Login email:', trimmedEmail);
    console.log('Login password:', password);

    if (
      account &&
      account.email === trimmedEmail &&
      account.password === password
    ) {
      router.push('/home');
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

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
