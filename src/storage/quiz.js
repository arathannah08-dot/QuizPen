import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveQuiz = async (quiz) => {
    try {
        const data = await AsyncStorage.getItem('quizzes');

        const quizzes = data ? JSON.parse(data) : [];
        
        quizzes.push(quiz);

        await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes))

    } catch (error) {
        console.log('Error saving quiz:', error);
    }
};

export const getQuiz = async () => {
    try {
        const data = await AsyncStorage.getItem('quizzes');

        if (data) {
            return JSON.parse(data);
        }

        return null;

    } catch (error) {
        console.log('Error getting quiz:', error);
        return null;
    }
};

export const deleteQuiz = async (index) => {
    try {
        const data = await AsyncStorage.getItem('quizzes');
        const quizzes = data ? JSON.parse(data) : [];

        quizzes.splice(index, 1);

        await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes));
    } catch (error) {
        console.log('Error deleting quiz:', error);
    }
};