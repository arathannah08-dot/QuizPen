import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFlashcard = async (flashcard) => {
    try {
        const data = await AsyncStorage.getItem('flashcards');

        const flashcards = data ? JSON.parse(data) : [];

        flashcards.push(flashcard);

        await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
    
    } catch (error) {
        console.log('Error saving flashcard:', error);
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