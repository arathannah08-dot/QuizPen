import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveAccount = async (account) => {
    try {
        await AsyncStorage.setItem('account', JSON.stringify(account));
    } catch (error) {
        console.log('Error saving account:', error);
    }
};


export const getAccount = async () => {
    try {
        const data = await AsyncStorage.getItem('account');


        if (data) {
            return JSON.parse(data);
        }


        return null;
    } catch (error) {
        console.log('Error getting account:', error);
        return null;
    }
};
