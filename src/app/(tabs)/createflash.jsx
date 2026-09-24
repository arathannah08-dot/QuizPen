import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';
import UserInput from '../../components/ui/UserInput';
import AddSign from '../../components/ui/AddSign';
import Add from '../../components/ui/Add';  
import { useRouter } from 'expo-router'; 

export default function CreateFlash() {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text>QuizPen</Text>
        <Text>Create Flashcard</Text>

        <Text>Add Title</Text>
        <UserInput type="Title"/>
        <Text>Add Description</Text>
        <UserInput type="Description"/>

        <AddSign 
         icon="add-circle"
         size={30}
         color="darkblue"
         onPress={() => console.log("Add pressed")}
        />
        <Text>Add Flashcard</Text>
        <Add add="Flashcard"/>

        <ActButton 
         name="Save Flashcard Set"
         onPress={() => router.push('/(tabs)/flashcards')}
        />

    </SafeAreaView>
  );
}