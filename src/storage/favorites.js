import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from './account';

const FAVORITES_KEY = 'favorites';

export const getFavoriteIds = async (itemType) => {
    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
            return [];
        }

        const data = await AsyncStorage.getItem(FAVORITES_KEY);
        const favorites = data ? JSON.parse(data) : [];

        return favorites
            .filter(item => item.userId === currentUser.id && item.type === itemType)
            .map(item => item.itemId);
    } catch (error) {
        console.log('Error retrieving favorites:', error);
        return [];
    }
};

export const Favorite = async (itemType, itemId) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        const data = await AsyncStorage.getItem(FAVORITES_KEY);
        const favorites = data ? JSON.parse(data) : [];

        const existingIndex = favorites.findIndex(
            item => item.userId === currentUser.id && item.type === itemType && item.itemId === itemId
        );

        if (existingIndex !== -1) {
            favorites.splice(existingIndex, 1);
        } else {
            favorites.push({
                userId: currentUser.id,
                type: itemType,
                itemId: itemId
            });
        }

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

        return true;

    } catch (error) {
        console.log('Error toggling favorite:', error);
        return false;
    }
};