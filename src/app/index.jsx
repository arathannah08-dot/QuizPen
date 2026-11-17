
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
  setCurrentUser
} from '../storage/account';

export default function HomeScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

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

        return '';
    };

    const handleEmailChange = (value) => {
        setEmail(value);

        if (touched.email) {
            setErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }));
        }

        // Clear old account errors when email changes
        setErrors(prev => ({
            ...prev,
            email: validateEmail(value)
        }));
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

    const checkAccount = async () => {
        const emailError = validateEmail(email);

        if (emailError) {
            setErrors(prev => ({
                ...prev,
                email: emailError
            }));
            return null;
        }

        const account = await getAccountByEmail(email.trim());

        if (!account) {
            setErrors(prev => ({
                ...prev,
                email: 'Account does not exist. Please sign up first.'
            }));

            return null;
        }

        setErrors(prev => ({
            ...prev,
            email: ''
        }));

        return account;
    };

    const checkPassword = async () => {
        if (!password) {
            setErrors(prev => ({
                ...prev,
                password: 'Password is required.'
            }));
            return;
        }

        const account = await checkAccount();

        if (!account) return;

        if (account.password !== password) {
            setErrors(prev => ({
                ...prev,
                password: 'Incorrect password.'
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                password: ''
            }));
        }
    };

    const handleLogin = async () => {
        setTouched({
            email: true,
            password: true
        });

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError
            });
            return;
        }

        try {
            const account = await getAccountByEmail(email.trim());

            if (!account) {
                setErrors({
                    email: 'Account does not exist. Please sign up first.',
                    password: ''
                });
                return;
            }

            if (account.password !== password) {
                setErrors({
                    email: '',
                    password: 'Incorrect password.'
                });
                return;
            }

            await setCurrentUser(account.id);

            router.replace('/home');

        } catch (error) {
            console.log('Login error:', error);

            setErrors({
                email: 'Unable to verify account. Please try again.',
                password: ''
            });
        }
    };

    return (
        <AuthForm
            title="QuizPen"
            subtitle="Log in to get back to your learning journey!"
        >

            <UserInput
                type="Email"
                value={email}
                onChangeText={handleEmailChange}
                error={touched.email ? errors.email : ''}
                onBlur={() => {
                    setTouched(prev => ({ ...prev, email: true }));
                    checkAccount();
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
                    checkPassword();
                }}
            />

            <TouchableOpacity>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <ActButton
                name="Login"
                onPress={handleLogin}
            />

            <Text>Don't have an account yet?</Text>

            <ActButton
                name="Sign Up"
                variant="outline"
                onPress={() => router.push('/register')}
            />

        </AuthForm>
    );
}
