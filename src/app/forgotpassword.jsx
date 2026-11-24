
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import ActButton from '../components/ui/ActButton';
import AuthForm from '../components/ui/AuthForm';
import UserInput from '../components/ui/UserInput';

import {
    getAccountByEmail,
    resetPasswordByEmail
} from '../storage/account';

export default function ForgotPassword() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [success, setSuccess] = useState(false);

    // Validate email
    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'Email is required.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return 'Please enter a valid email address.';
        }

        return '';
    };

    // Validate new password
    const validatePassword = (value) => {
        if (!value) {
            return 'New password is required.';
        }

        if (value.length < 8) {
            return 'Password must contain at least 8 characters.';
        }

        return '';
    };

    // Validate confirmation password
    const validateConfirmPassword = (value) => {
        if (!value) {
            return 'Please confirm your password.';
        }

        if (value !== newPassword) {
            return 'Passwords do not match.';
        }

        return '';
    };


    // Email input
    const handleEmailChange = (value) => {
        setEmail(value);

        if (touched.email) {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }));
        }
    };


    // New password input
    const handlePasswordChange = (value) => {
        setNewPassword(value);

        if (touched.newPassword) {
            setErrors(prev => ({
                ...prev,
                newPassword: validatePassword(value)
            }));
        }

        if (touched.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(confirmPassword)
            }));
        }
    };


    // Confirm password input
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);

        if (touched.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: value === newPassword
                    ? ''
                    : 'Passwords do not match.'
            }));
        }
    };


    // Check whether email is registered
    const checkEmail = async () => {
        setTouched(prev => ({
            ...prev,
            email: true
        }));

        const emailError = validateEmail(email);

        if (emailError) {
            setErrors(prev => ({
                ...prev,
                email: emailError
            }));
            return;
        }

        const account = await getAccountByEmail(email.trim());

        if (!account) {
            setErrors(prev => ({
                ...prev,
                email: 'No account found with this email address.'
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                email: ''
            }));
        }
    };


    // Reset password
    const handleResetPassword = async () => {
        setTouched({
            email: true,
            newPassword: true,
            confirmPassword: true
        });

        const newErrors = {
            email: validateEmail(email),
            newPassword: validatePassword(newPassword),
            confirmPassword: validateConfirmPassword(confirmPassword)
        };

        setErrors(newErrors);

        if (
            newErrors.email ||
            newErrors.newPassword ||
            newErrors.confirmPassword
        ) {
            return;
        }

        try {
            // Check registered account
            const account = await getAccountByEmail(email.trim());

            if (!account) {
                setErrors(prev => ({
                    ...prev,
                    email: 'No account found with this email address.'
                }));
                return;
            }

            // Update password
            const updated = await resetPasswordByEmail(
                email.trim(),
                newPassword
            );

            if (updated) {
                setSuccess(true);
            } else {
                setErrors({
                    email: 'Unable to reset password. Please try again.'
                });
            }

        } catch (error) {
            console.log('Password reset error:', error);

            setErrors({
                email: 'Something went wrong. Please try again.'
            });
        }
    };


    return (
        <AuthForm
            title="Forgot Password"
            subtitle="Reset your password and get back to learning!"
        >

            {!success ? (
                <>
                    <UserInput
                        type="Email"
                        value={email}
                        onChangeText={handleEmailChange}
                        error={touched.email ? errors.email : ''}
                        onBlur={checkEmail}
                    />

                    <UserInput
                        type="New Password"
                        value={newPassword}
                        onChangeText={handlePasswordChange}
                        isPassword={true}
                        error={touched.newPassword ? errors.newPassword : ''}
                        onBlur={() => {
                            setTouched(prev => ({
                                ...prev,
                                newPassword: true
                            }));

                            setErrors(prev => ({
                                ...prev,
                                newPassword: validatePassword(newPassword)
                            }));
                        }}
                    />

                    <UserInput
                        type="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        isPassword={true}
                        error={touched.confirmPassword ? errors.confirmPassword : ''}
                        onBlur={() => {
                            setTouched(prev => ({
                                ...prev,
                                confirmPassword: true
                            }));

                            setErrors(prev => ({
                                ...prev,
                                confirmPassword: validateConfirmPassword(confirmPassword)
                            }));
                        }}
                    />

                    <ActButton
                        name="Reset Password"
                        onPress={handleResetPassword}
                    />

                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                        style={styles.backButton}
                    >
                        <Text style={styles.backText}>
                            Back to Login
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.successContainer}>
                    <Text style={styles.successTitle}>
                        Password Reset Successful!
                    </Text>

                    <Text style={styles.successMessage}>
                        Your password has been updated.
                        You can now log in using your new password.
                    </Text>

                    <ActButton
                        name="Back to Login"
                        onPress={() => router.replace('/')}
                    />
                </View>
            )}

        </AuthForm>
    );
}


const styles = StyleSheet.create({
    backButton: {
        alignItems: 'center',
        marginTop: 18,
    },

    backText: {
        color: '#6C4AB6',
        fontSize: 14,
        fontWeight: '600',
    },

    successContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    successTitle: {
        color: '#6C4AB6',
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12,
    },

    successMessage: {
        color: '#9B94A8',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 25,
    },
});
