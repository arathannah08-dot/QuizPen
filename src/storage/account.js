import AsyncStorage from '@react-native-async-storage/async-storage';

<<<<<<< HEAD

=======
>>>>>>> 2f859a3 (Update features)
export const saveAccount = async (account) => {
    try {
        await AsyncStorage.setItem('account', JSON.stringify(account));
    } catch (error) {
        console.log('Error saving account:', error);
    }
};

<<<<<<< HEAD

=======
>>>>>>> 2f859a3 (Update features)
export const getAccount = async () => {
    try {
        const data = await AsyncStorage.getItem('account');

<<<<<<< HEAD

=======
>>>>>>> 2f859a3 (Update features)
        if (data) {
            return JSON.parse(data);
        }

<<<<<<< HEAD

=======
>>>>>>> 2f859a3 (Update features)
        return null;
    } catch (error) {
        console.log('Error getting account:', error);
        return null;
    }
<<<<<<< HEAD
};
=======
};
>>>>>>> 2f859a3 (Update features)
