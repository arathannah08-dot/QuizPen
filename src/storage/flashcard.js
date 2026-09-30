import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFlashcard = async (newFlashcard) => {
    try {
        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        flashcards.push(newFlashcard);

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(flashcards)
        );
    } catch (error) {
        console.log('Error saving flashcard:', error);
    }
};

export const updateFlashcard = async (index, updatedFlashcard) => {
    try {
        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        flashcards[index] = updatedFlashcard;

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(flashcards)
        );
    } catch (error) {
        console.log('Error updating flashcard:', error);
    }
};

export const getFlashcard = async () => {
    try {
        const data = await AsyncStorage.getItem('flashcards');

        if (data) {
            return JSON.parse(data);
        }

        return null;
    } catch (error) {
        console.log('Error getting flashcard:', error);
        return null;
    }
};

export const deleteFlashcard = async (index) => {
    try {
        const data = await AsyncStorage.getItem('flashcards');
        const flashcards = data ? JSON.parse(data) : [];

        flashcards.splice(index, 1);

        await AsyncStorage.setItem(
            'flashcards',
            JSON.stringify(flashcards)
        );
    } catch (error) {
        console.log('Error deleting flashcard:', error);
    }
};