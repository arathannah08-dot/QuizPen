import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import ActButton from '../components/ui/ActButton';
import AuthForm from '../components/ui/AuthForm';
import UserInput from '../components/ui/UserInput';
import { getAccount } from '../storage/account';

export default function HomeScreen() {
  const router = useRouter();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <AuthForm
    title="QuizPen"
    subtitle="Log in to get back to your learning journey!"
    >
     
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
  </AuthForm>


  );
}
