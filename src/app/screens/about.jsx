
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.back}>‹ Back</Text>
      </TouchableOpacity>

      {/* PAGE TITLE */}
      <Text style={styles.title}>About QuizPen</Text>
      <Text style={styles.subtitle}>
        Learn more about our application.
      </Text>

      {/* APP INFORMATION */}
      <View style={styles.card}>
        <Text style={styles.appName}>QuizPen</Text>

        <Text style={styles.description}>
          QuizPen is a mobile application that allows users
          to create, organize, and study flashcards and quizzes.

          {"\n"}
          {"\n"}
          
          It helps make reviewing and learning easier and more
          convenient.

          {"\n"}
          {"\n"}

          By:
          Arat, Bacarro, Gomez, Heras, and Sabio
        </Text>
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
    marginTop: 8,
    fontSize: 14,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#6b1376',
    padding: 22,
    borderRadius: 15,
    marginBottom: 18,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: '#E2CFE5',
    fontSize: 14,
    lineHeight: 22,
  },

  footer: {
    color: '#c9aece',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});
