import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveAccount = async (account) => {
    try {
        const accounts = await getAccounts();
    

    //check if email is alr registered
    const existingAccount = accounts.find(
        item => item.email.toLowerCase() === account.email.toLowerCase()
    );

    if (existingAccount) {
        return false;
    }

    const newAccount = {
        ...account,
        id: Date.now().toString()
    };

    accounts.push(newAccount);

    await AsyncStorage.setItem(
        'accounts',
        JSON.stringify(accounts)
    );

    return true;

} catch (error) {
    console.log('Error saving account:', error);
    return false;
}
};


//retrieve all accounts
export const getAccounts = async () => {
    try {
        const data = await AsyncStorage.getItem('accounts');


        if (data) {
            return JSON.parse(data);
        }

        //migrate the prev saved acc
        if (oldAccount) {
            const account = JSON.parse(oldAccount);

            account.id = account.id || Date.now().toString();

            const accounts = [account];

            await AsyncStorage.setItem(
                'accounts',
                JSON.stringify(accounts)
            );

            await AsyncStorage.removeItem('account');

            return accounts;
        }

        return [];

    } catch (error) {
        console.log('Error getting accounts:', error);
        return [];
    }
};

// find an acc using its email
export const getAccountByEmail = async (email) => {
    const accounts = await getAccounts();

    return accounts.find(
        item => item.email.toLowerCase() === email.toLowerCase()
    ) || null;
};

// save the currently logged-in account ID
export const setCurrentUser = async (accountId) => {
    try {
        await AsyncStorage.setItem('currentUser', accountId);
    } catch (error) {
        console.log('Error setting current user:', error);
    }
};

// get the currently logged-in account
export const getCurrentUser = async () => {
    try {
        const accountId = await AsyncStorage.getItem('currentUser');

        if (!accountId) {
            return null;
        }

        const accounts = await getAccounts();

        return accounts.find(
            item => item.id === accountId
        ) || null;

    } catch (error) {
        console.log('Error getting current user:', error);
        return null;
    }
};

// log out the current account
export const logoutAccount = async () => {
    try {
        await AsyncStorage.removeItem('currentUser');
    } catch (error) {
        console.log('Error logging out:', error);
    }
};