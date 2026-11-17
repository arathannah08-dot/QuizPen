
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';

import ActButton from '../components/ui/ActButton';
import AuthForm from '../components/ui/AuthForm';
import UserInput from '../components/ui/UserInput';

import {
    getAccountByEmail,
    saveAccount
} from '../storage/account';

export default function RegisterScreen() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateUsername = (value) => {
        if (!value.trim()) {
            return 'Username is required.';
        }

        if (value.trim().length < 3) {
            return 'Username must contain at least 3 characters.';
        }

        if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) {
            return 'Only letters, numbers, and underscores are allowed.';
        }

        return '';
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'Email is required.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return 'Please enter a valid email address.';
        }

        return '';
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'Password is required.';
        }

        if (value.length < 8) {
            return 'Password must contain at least 8 characters.';
        }

        return '';
    };

    const handleUsernameChange = (value) => {
        setUsername(value);

        if (touched.username) {
            setErrors(prev => ({
                ...prev,
                username: validateUsername(value)
            }));
        }
    };

    const handleEmailChange = (value) => {
        setEmail(value);

        if (touched.email) {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }));
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);

        if (touched.password) {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value)
            }));
        }
    };

    const checkDuplicateEmail = async () => {
        const emailError = validateEmail(email);

        if (emailError) {
            setErrors(prev => ({ ...prev, email: emailError }));
            return;
        }

        const account = await getAccountByEmail(email.trim());

        if (account) {
            setErrors(prev => ({
                ...prev,
                email: 'This email is already registered.'
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                email: ''
            }));
        }
    };

    const handleRegister = async () => {
        setTouched({
            username: true,
            email: true,
            password: true
        });

        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        const newErrors = {
            username: usernameError,
            email: emailError,
            password: passwordError
        };

        setErrors(newErrors);

        if (usernameError || emailError || passwordError) {
            return;
        }

        try {
            const existingAccount = await getAccountByEmail(email.trim());

            if (existingAccount) {
                setErrors(prev => ({
                    ...prev,
                    email: 'This email is already registered.'
                }));
                return;
            }

            const success = await saveAccount({
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password: password
            });

            if (!success) {
                setErrors(prev => ({
                    ...prev,
                    email: 'This email is already registered.'
                }));
                return;
            }

            if (typeof window !== 'undefined') {
                window.alert('Account created successfully!');
            }

            router.replace('/');

        } catch (error) {
            console.log('Registration error:', error);
            if (typeof window !== 'undefined') {
                window.alert('Unable to create account. Please try again.');
            }
        }
    };

    return (
        <AuthForm
            title="Create Account"
            subtitle="Start your journey with Quizpen!"
        >

            <UserInput
                type="Username"
                value={username}
                onChangeText={handleUsernameChange}
                error={touched.username ? errors.username : ''}
                onBlur={() => {
                    setTouched(prev => ({ ...prev, username: true }));
                    setErrors(prev => ({
                        ...prev,
                        username: validateUsername(username)
                    }));
                }}
            />

            <UserInput
                type="Email"
                value={email}
                onChangeText={handleEmailChange}
                error={touched.email ? errors.email : ''}
                onBlur={() => {
                    setTouched(prev => ({ ...prev, email: true }));
                    checkDuplicateEmail();
                }}
            />

            <UserInput
                type="Password"
                value={password}
                onChangeText={handlePasswordChange}
                isPassword={true}
                error={touched.password ? errors.password : ''}
                onBlur={() => {
                    setTouched(prev => ({ ...prev, password: true }));
                    setErrors(prev => ({
                        ...prev,
                        password: validatePassword(password)
                    }));
                }}
            />

            <ActButton
                name="Sign Up"
                onPress={handleRegister}
            />

            <Text>Already have an account?</Text>

            <TouchableOpacity onPress={() => router.push('/')}>
                <Text>Log In</Text>
            </TouchableOpacity>

        </AuthForm>
    );
}
