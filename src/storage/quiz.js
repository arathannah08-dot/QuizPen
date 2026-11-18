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


    } catch (error) {
        console.log('Error deleting quiz:', error);
        return false;
    }
};

// Save or update the current user's quiz result
export const saveQuizResult = async (quizId, score, totalQuestions) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem('quizResults');
        const results = data ? JSON.parse(data) : [];

        const percentage = totalQuestions > 0
            ? (score / totalQuestions) * 100
            : 0;

        const newResult = {
            userId: currentUser.id,
            quizId: quizId,
            score: score,
            totalQuestions: totalQuestions,
            percentage: percentage,
            status: percentage >= 80 ? 'Mastered' : 'Needs More Review',
            completedAt: new Date().toISOString()
        };

        // Check if this quiz already has a saved result
        const existingIndex = results.findIndex(
            item =>
                item.userId === currentUser.id &&
                item.quizId === quizId
        );

        if (existingIndex !== -1) {
            // Update the previous result
            results[existingIndex] = newResult;
        } else {
            // Save a new result
            results.push(newResult);
        }

        await AsyncStorage.setItem(
            'quizResults',
            JSON.stringify(results)
        );

        return true;

    } catch (error) {
        console.log('Error saving quiz result:', error);
        return false;
    }
};

// Get the current user's quiz results
export const getQuizResults = async () => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const data = await AsyncStorage.getItem('quizResults');
        const results = data ? JSON.parse(data) : [];

        return results.filter(
            item => item.userId === currentUser.id
        );

    } catch (error) {
        console.log('Error getting quiz results:', error);
        return [];
    }
    
};


// update a quiz belonging to the current user
export const updateQuiz = async (index, updatedQuiz) => {
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

        const target = userQuizzes[index];

        if (!target) {
            return false;
        }

        const actualIndex = quizzes.findIndex(
            item => item.id === target.id &&
                    item.userId === currentUser.id
        );

        if (actualIndex === -1) {
            return false;
        }

        quizzes[actualIndex] = {
            ...updatedQuiz,
            id: target.id,
            userId: currentUser.id
        };

        await AsyncStorage.setItem(
            'quizzes',
            JSON.stringify(quizzes)
        );

        return true;

    } catch (error) {
        console.log('Error updating quiz:', error);
        return false;
    }
};

