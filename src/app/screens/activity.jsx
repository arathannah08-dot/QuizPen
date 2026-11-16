
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFlashcard } from '../../storage/flashcard';

export default function Activity() {
  const router = useRouter();

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load the current user's flashcard activities
  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadActivities = async () => {
        setLoading(true);

        try {
          const data = await getFlashcard();

          if (active) {
            // Newest flashcard sets first
            setFlashcards(Array.isArray(data) ? [...data].reverse() : []);
          }
        } catch (error) {
          console.log('Error loading activities:', error);
        } finally {
          if (active) setLoading(false);
        }
      };

      loadActivities();

      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={styles.back}
          onPress={() => router.replace('/(tabs)/profile')}
        >
          ‹ Back
        </Text>

        <Text style={styles.title}>Activity History</Text>
        <Text style={styles.subtitle}>
          Keep track of your recent activities.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#e9e4f1" />
          ) : flashcards.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>No activities yet</Text>
              <Text style={styles.emptyText}>
                Your created flashcard sets will appear here.
              </Text>
            </View>
          ) : (
            flashcards.map((item, index) => (
              <View style={styles.activityCard} key={item.id || index}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityType}>
                    Flashcard Set Created
                  </Text>
                  <Text style={styles.activityIcon}>✦</Text>
                </View>

                <Text style={styles.cardTitle}>
                  {item.title || 'Untitled Flashcard Set'}
                </Text>

                <Text style={styles.cardDescription}>
                  {item.desc || 'No description provided.'}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardCount}>
                    {Array.isArray(item.flash) ? item.flash.length : 0} Flashcards
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e0945',
    padding: 20,
  },
  back: {
    color: '#c9aece',
    fontSize: 16,
    marginBottom: 25,
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
  section: {
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#e9e4f1',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  activityCard: {
    backgroundColor: '#6b1376',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityType: {
    color: '#d8b9df',
    fontSize: 13,
    fontWeight: '600',
  },
  activityIcon: {
    color: '#e9e4f1',
    fontSize: 20,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#e0d3e5',
    fontSize: 14,
    marginTop: 6,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#92539b',
    marginTop: 15,
    paddingTop: 12,
  },
  cardCount: {
    color: '#e9e4f1',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyBox: {
    backgroundColor: '#6b1376',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#d8c8df',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
