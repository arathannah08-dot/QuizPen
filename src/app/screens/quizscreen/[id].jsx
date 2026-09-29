import { Text, View} from "react-native";
import { useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router"; 
import { getQuiz } from "../../../storage/quiz";
import ActButton from "../../../components/ui/ActButton";

export default function Quizscreen () {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    
    const [quiz, setQuiz] = useState(null);

    useEffect (() => {
        const loadQuizzes = async () => {
            const data = await getQuiz();

            if (data) {
                const selectQuiz = data[Number(id)];
                setQuiz(selectQuiz);
            }
        };

        loadQuizzes();
    }, []);

    return (
        <SafeAreaView>
            <Text>Quiz</Text>
            
            {quiz && (
                <View>
                    <Text>{quiz.title}</Text>
                    <Text>{quiz.desc}</Text>
            
            
                    {quiz.quiz.map((item, index) => (
                         <View key={index}>
                            <Text>{item.question}</Text>
                            <Text>{item.answer}</Text>
                        </View>
                    ))}
                </View>
            
            )}
            <ActButton 
            name="Go Back"
            onPress={() => router.push('/(tabs)/quizzes')}
            />
        </SafeAreaView>
    );
}