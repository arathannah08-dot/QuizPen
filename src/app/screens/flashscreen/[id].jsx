import { Text, View} from "react-native";
import { useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFlashcard } from "../../../storage/flashcard";
import ActButton from "../../../components/ui/ActButton";
 

export default function Flashscreen () {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    
    const [flashcard, setFlashcard] = useState(null);

    useEffect (() => {
        const loadFlashcards = async () => {
            const data = await getFlashcard();

            if (data) {
                const selectFlashcard = data[Number(id)];
                setFlashcard(selectFlashcard);
            }
        };

        loadFlashcards();
    }, []);

    return (
        <SafeAreaView>
            <Text>Flashcard Set</Text>
            
            {flashcard && (
                <View>
                    <Text>{flashcard.title}</Text>
                    <Text>{flashcard.desc}</Text>
                    <Text>{flashcard.flash.length}</Text>
            
            
                    {flashcard.flash.map((item, index) => (
                         <View key={index}>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
            
            )}
            <ActButton 
            name="Go Back"
            onPress={() => router.push('/(tabs)/flashcards')}
            />
        </SafeAreaView>
    );
}