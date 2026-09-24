import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveFlashcard = async (flashcard) => {
    try {
        await AsyncStorage.setItem('flashcard', JSON.stringify(flashcard));
    } catch (error) {
        console.log('Error saving flashcard:', error);
    }
};


export const getFlashcard = async () => {
    try {
        const data = await AsyncStorage.getItem('flashcard');


        if (data) {
            return JSON.parse(data);
        }


        return null;
    } catch (error) {
        console.log('Error getting flashcard:', error);
        return null;
    }
};
