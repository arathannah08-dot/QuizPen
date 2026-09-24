import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../components/ui/ActButton';
import UserInput from '../components/ui/UserInput';
import { saveAccount } from '../storage/account';


export default function RegisterScreen() {
    const router = useRouter();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <SafeAreaView>
        <Text>Create Account</Text>
        <Text>Start your journey with Quizpen!</Text>
       
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
        />


        <ActButton
         name="Sign Up"
         onPress={async () => {
            await saveAccount({
                username: username,
                email: email,
                password: password
            });


            router.push('/');
         }}
        />


        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
            <Text>Log In</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}
