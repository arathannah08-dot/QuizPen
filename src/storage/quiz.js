import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "./account";

export const saveQuiz = async (quiz) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem('quizzes');
        const quizzes = data ? JSON.parse(data) : [];
        const newQuiz = {
            ...quiz,
            id: Date.now().toString(),
            userId: currentUser.id
        };

        quizzes.push(newQuiz);

        await AsyncStorage.setItem(
            'quizzes',
            JSON.stringify(quizzes)
        );

        return true;

    } catch (error) {
        console.log('Error saving quiz:', error);
        return false;
    }
};

export const getQuiz = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        const data = await AsyncStorage.getItem('quizzes');
        const quizzes = data ? JSON.parse(data) : [];

        return quizzes.filter(
            item => item.userId === currentUser.id
        );

    } catch (error) {
        console.log('Error getting quiz:', error);
        return [];
    }
};

export const deleteQuiz = async (index) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem('quizzes');
        const quizzes = data ? JSON.parse(data) : [];

        const userQuizzes = quizzes.filter(
            item => item.userId === currentUser.id
        );

        const targetQuiz = userQuizzes[index];

        if (!targetQuiz) {
            return false;
        }

        const updatedQuizzes = quizzes.filter(
            item => !(
                item.id === targetQuiz.id &&
                item.userId === currentUser.id
            )
        );

        await AsyncStorage.setItem(
            'quizzes',
            JSON.stringify(updatedQuizzes)
        );

        return true;

        await AsyncStorage.setItem(
            'quizzes',
            JSON.stringify(quizzes)
        );

        return true;

    } catch (error) {
        console.log('Error deleting quiz:', error);
        return false;
    }
};
