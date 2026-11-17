
import { useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.replace('/(tabs)/profile')}
        style={styles.backButton}
      >
        <Text style={styles.back}>‹ Back</Text>
      </TouchableOpacity>

      {/* PAGE TITLE */}
      <Text style={styles.title}>Settings</Text>
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
            <Text style={styles.menuTitle}>Change Password</Text>
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
            <Text style={styles.menuTitle}>About QuizPen</Text>
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
    backgroundColor: '#3e0945',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  back: {
    color: '#c9aece',
    fontSize: 16,
  },
  title: {
    color: '#e9e4f1',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc8d5',
    marginTop: 12,
    fontSize: 14,
  },
  sectionTitle: {
    color: '#c9aece',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#6b1376',
    borderRadius: 12,
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
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: '#E2CFE5',
    fontSize: 12,
    marginTop: 5,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 25,
  },
});
