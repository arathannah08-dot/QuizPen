
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get all registered accounts
export const getAccounts = async () => {
    try {
        const data = await AsyncStorage.getItem('accounts');

        if (data) {
            return JSON.parse(data);
        }

        // Retrieve old saved account if available
        const oldAccount = await AsyncStorage.getItem('account');

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


// Save new account
export const saveAccount = async (account) => {
    try {
        const accounts = await getAccounts();

        const existingAccount = accounts.find(
            item =>
                item.email.toLowerCase() ===
                account.email.trim().toLowerCase()
        );

        if (existingAccount) {
            return false;
        }

        const newAccount = {
            ...account,
            email: account.email.trim().toLowerCase(),
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


// Find account using email
export const getAccountByEmail = async (email) => {
    const accounts = await getAccounts();

    return accounts.find(
        item =>
            item.email.toLowerCase() ===
            email.trim().toLowerCase()
    ) || null;
};


// Save current logged-in user
export const setCurrentUser = async (accountId) => {
    try {
        await AsyncStorage.setItem('currentUser', accountId);
    } catch (error) {
        console.log('Error setting current user:', error);
    }
};


// Get current logged-in user
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


// Logout current user
export const logoutAccount = async () => {
    try {
        await AsyncStorage.removeItem('currentUser');
    } catch (error) {
        console.log('Error logging out:', error);
    }
};


// Change password of currently logged-in account
export const changePassword = async (currentPassword, newPassword) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return false;
        }

        if (currentUser.password !== currentPassword) {
            return false;
        }

        const accounts = await getAccounts();

        const accountIndex = accounts.findIndex(
            item => item.id === currentUser.id
        );

        if (accountIndex === -1) {
            return false;
        }

        accounts[accountIndex].password = newPassword;

        await AsyncStorage.setItem(
            'accounts',
            JSON.stringify(accounts)
        );

        return true;

    } catch (error) {
        console.log('Error changing password:', error);
        return false;
    }
};


// Reset password using registered email
export const resetPasswordByEmail = async (email, newPassword) => {
    try {
        const accounts = await getAccounts();

        const accountIndex = accounts.findIndex(
            item =>
                item.email.toLowerCase() ===
                email.trim().toLowerCase()
        );

        // Check if account exists
        if (accountIndex === -1) {
            return false;
        }

        // Update password
        accounts[accountIndex].password = newPassword;

        await AsyncStorage.setItem(
            'accounts',
            JSON.stringify(accounts)
        );

        return true;

    } catch (error) {
        console.log('Error resetting password:', error);
        return false;
    }
};
