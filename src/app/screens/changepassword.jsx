
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../components/ui/BackButton';
import { changePassword } from '../../storage/account';

export default function ChangePassword() {
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Show or hide password states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async () => {
        if (
            currentPassword.trim() === '' ||
            newPassword.trim() === '' ||
            confirmPassword.trim() === ''
        ) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }

        if (currentPassword === newPassword) {
            Alert.alert(
                'Error',
                'Your new password must be different from your current password.'
            );
            return;
        }

        const success = await changePassword(
            currentPassword,
            newPassword
        );

        if (!success) {
            Alert.alert(
                'Error',
                'Your current password is incorrect or the password could not be updated.'
            );
            return;
        }

        Alert.alert(
            'Success',
            'Password changed successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => router.replace('/screens/settings'),
                },
            ]
        );

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.logo}>QuizPen</Text>

                <View style={styles.titleRow}>
                    <BackButton />
                    <Text style={styles.title}>Change Password</Text>
                </View>

                <Text style={styles.subtitle}>
                    Update your account password.
                </Text>

                {/* Current Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Current Password</Text>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter current password"
                            placeholderTextColor="#9B94A8"
                            secureTextEntry={!showCurrentPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                            }
                        >
                            <Ionicons
                                name={showCurrentPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#125643"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* New Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>New Password</Text>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter new password"
                            placeholderTextColor="#9B94A8"
                            secureTextEntry={!showNewPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Ionicons
                                name={showNewPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#125643"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Confirm New Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirm New Password</Text>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm new password"
                            placeholderTextColor="#9B94A8"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            <Ionicons
                                name={showConfirmPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#125643"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={handleChangePassword}
                >
                    <Text style={styles.updateButtonText}>
                        Update Password
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125643',
        paddingHorizontal: 20,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },

    title: {
        color: '#FFBA00',
        fontSize: 28,
        fontWeight: '800',
    },

    subtitle: {
        color: '#ACE2B6',
        marginTop: 8,
        marginBottom: 30,
        fontSize: 14,
        lineHeight: 21,
    },

    inputGroup: {
        marginBottom: 20,
    },

    label: {
        color: '#F8F8F8',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 9,
    },

    passwordContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ACE2B6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },

    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 14,
        color: '#125643',
    },

    updateButton: {
        backgroundColor: '#FFBA00',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
    },

    updateButtonText: {
        color: '#125643',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
