import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="screens/quizscreen/[id]" />
            <Stack.Screen name="screens/flashscreen/[id]" />
        </Stack>
    );
}