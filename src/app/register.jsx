import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 
import UserInput from '../components/ui/UserInput'; 
import ActButton from '../components/ui/ActButton'; 

export default function RegisterScreen() {
    const router = useRouter();
    return (
        <SafeAreaView>
        <Text>Create Account</Text>
        <Text>Start your journey with Quizpen!</Text>
        
        <UserInput type="Username"/>
        <UserInput type="Email"/>
        <UserInput type="Password"/>

        <ActButton name="Sign Up"/>

        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
            <Text>Log In</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}