import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from './account';

//save a flashcard under the currently logged account
export const saveFlashcard = async (newFlashcard) => {
     try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            console.log('No logged-in user found.');
            return false;
        }

        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        const flashcardWithOwner = {
            ...newFlashcard,
            id: Date.now().toString(),
            userId: currentUser.id
        };

        flashcards.push(flashcardWithOwner);

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(flashcards)
        );

        return true;

    } catch (error) {
        console.log('Error saving flashcard:', error);
        return false;
    }
};

// update a flashcard belonging to the current user
export const updateFlashcard = async (index, updatedFlashcard) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        const userFlashcards = flashcards.filter(
            item => item.userId === currentUser.id
        );

        const target = userFlashcards[index];

        if (!target) {
            return false;
        }

        const actualIndex = flashcards.findIndex(
            item => item.id === target.id &&
                    item.userId === currentUser.id
        );

        if (actualIndex === -1) {
            return false;
        }

        flashcards[actualIndex] = {
            ...updatedFlashcard,
            id: target.id,
            userId: currentUser.id
        };

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(flashcards)
        );

        return true;

    } catch (error) {
        console.log('Error updating flashcard:', error);
        return false;
    }
};

// retrieve only flashcards belonging to the logged account
export const getFlashcard = async () => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        return flashcards.filter(
            item => item.userId === currentUser.id
        );

    } catch (error) {
        console.log('Error getting flashcard:', error);
        return [];
    }
};


// delete a flashcard belonging to the current user
export const deleteFlashcard = async (index) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        const userFlashcards = flashcards.filter(
            item => item.userId === currentUser.id
        );

        const target = userFlashcards[index];

        if (!target) {
            return false;
        }

        const updatedFlashcards = flashcards.filter(
            item => !(
                item.id === target.id &&
                item.userId === currentUser.id
            )
        );

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(updatedFlashcards)
        );

        return true;

    } catch (error) {
        console.log('Error deleting flashcard:', error);
        return false;
    }
};