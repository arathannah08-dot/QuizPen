import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useRouter } from 'expo-router'; 
import ActButton from '../../components/ui/ActButton';
import ActButton2 from '../../components/ui/ActButton2';

export default function Flashcards() {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text>My Account</Text>

        <View>
            <Text>Sets</Text>
            <Text>Quizzes</Text>
        </View>

        <ActButton2 name="Performance"/>
        <ActButton2 name="Activity History"/>
        <ActButton2 name="Settings"/>

        <ActButton 
         name="Logout"
         onPress={() => router.push('/')}
        />


    </SafeAreaView>
  );
}