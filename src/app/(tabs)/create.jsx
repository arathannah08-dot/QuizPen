import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton'; 
import { useRouter } from 'expo-router'; 

export default function Create() {
  const router = useRouter();
  return (
    <SafeAreaView>
        <Text>Create</Text>
        <Text>What would you like to create?</Text>

        <ActButton 
         name="Flashcard"
         onPress={() => router.push('/(tabs)/createflash')}
        />
        <ActButton 
         name="Quiz"
         onPress={() => router.push('/(tabs)/createquiz')}
        />
    </SafeAreaView>
  );
}