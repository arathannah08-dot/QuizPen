import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import ActButton from '../components/ui/ActButton';
import AuthForm from '../components/ui/AuthForm';
import UserInput from '../components/ui/UserInput';
import { saveAccount } from '../storage/account';



export default function RegisterScreen() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthForm
        title= "Create Account"
        subtitle= "Start your journey with Quizpen!"
       >
        <UserInput
         type="Username"
         value={username}
         onChangeText={setUsername}
        />

        <UserInput
         type="Email"
         value={email}
         onChangeText={setEmail}
        />

        <UserInput
         type="Password"
         value={password}
         onChangeText={setPassword}
         isPassword={true}
        />

        <ActButton
         name="Sign Up"
         onPress={async () => {
            if (
                username.trim() === '' ||
                email.trim() === '' ||
                password.trim() === ''
            ) {
                alert('Please fill in all fields.');
                return;
            }

            await saveAccount({
                username: username.trim(),
                email: email.trim(),
                password: password.trim()
            });

            router.push('/');
         }}
        />

            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
                <Text>Log In</Text>
            </TouchableOpacity>
      </AuthForm>
    );
}
