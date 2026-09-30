import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActButton from '../../components/ui/ActButton';
import ActButton2 from '../../components/ui/ActButton2';

export default function Profile() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>
                My Account
            </Text>

            <View style={styles.statsBox}>
                <Text style={styles.stat}>
                    Sets
                </Text>

                <Text style={styles.stat}>
                    Quizzes
                </Text>
            </View>

            <View style={styles.options}>
                <ActButton2 name="Performance" />
                <ActButton2 name="Activity History" />
                <ActButton2 name="Settings" />
            </View>

            <ActButton
                name="Logout"
                onPress={() => router.push('/')}
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
        marginBottom: 20,
    },

    statsBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#6b1376',
        borderRadius: 16,
        paddingVertical: 25,
        borderWidth: 1,
        borderColor: '#9c94ae',
    },

    stat: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ccc8d5',
    },

    options: {
        marginTop: 20,
    },
});
