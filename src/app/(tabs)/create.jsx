import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';

export default function Create() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>
                Create
            </Text>

            <Text style={styles.subtitle}>
                What would you like to create?
            </Text>

            <ActButton
                name="Flashcard"
                onPress={() => router.push('/screens//createflash')}
            />

            <ActButton
                name="Quiz"
                onPress={() => router.push('/screens/createquiz')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e0945',
        paddingHorizontal: 20,
    },

    header: {
        fontSize: 32,
        fontWeight: '800',
        color: '#e9e4f1',
        marginTop: 25,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#9c94ae',
        marginBottom: 15,
    },
});
