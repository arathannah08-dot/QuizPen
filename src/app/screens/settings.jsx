
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../components/ui/BackButton';

export default function Settings() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.logo}>QuizPen</Text>

            <View style={styles.titleRow}>
                <BackButton />
                <Text style={styles.title}>Settings</Text>
            </View>

            <Text style={styles.subtitle}>
                Manage your account and app information.
            </Text>

            {/* ACCOUNT SECTION */}
            <Text style={styles.sectionTitle}>ACCOUNT</Text>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/screens/changepassword')}
                >
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>
                            Change Password
                        </Text>
                        <Text style={styles.menuSubtitle}>
                            Update your password
                        </Text>
                    </View>

                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>

            {/* ABOUT SECTION */}
            <Text style={styles.sectionTitle}>ABOUT</Text>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/screens/about')}
                >
                    <View style={styles.menuTextContainer}>
                        <Text style={styles.menuTitle}>
                            About QuizPen
                        </Text>
                        <Text style={styles.menuSubtitle}>
                            Learn more about the app
                        </Text>
                    </View>

                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>

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
        fontSize: 14,
        lineHeight: 21,
    },

    sectionTitle: {
        color: '#FFBA00',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
    },

    menuContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        paddingHorizontal: 15,
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
    },

    menuTextContainer: {
        flex: 1,
    },

    menuTitle: {
        color: '#125643',
        fontSize: 15,
        fontWeight: '700',
    },

    menuSubtitle: {
        color: '#527466',
        fontSize: 12,
        marginTop: 5,
    },

    arrow: {
        color: '#B46617',
        fontSize: 25,
    },
});
