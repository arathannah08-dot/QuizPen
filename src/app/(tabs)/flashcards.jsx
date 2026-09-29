import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Display from '../../components/ui/Display';
import SearchInput from '../../components/ui/SearchInput';
import { deleteFlashcard, getFlashcard } from "../../storage/flashcard";

export default function Flashcards() {
  const router = useRouter();

  const [flashcards, setFlashcards] = useState([]);

  useEffect (
    useCallback(() => {
    const loadFlashcards = async () => {
      const data = await getFlashcard();
      setFlashcards(data);
    };

    loadFlashcards();
  }, []));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Flashcards</Text>
      
      <View>
        <SearchInput type="Search flashcard ..."/>
      </View>

      {flashcards.map((item, index) => (
        <Display
          key={index}
          title={item.title}
          desc={item.desc}
          length={item.flash ? item.flash.length : 0}
          name='Cards'

          onPress={() => router.push({
            pathname: '/screens/flashscreen/[id]',
            params: {id: index}
          })
        }

        onEdit={() =>
          router.push({
            pathname: '/screens/editflash',
            params: { id: index }
          })
        }

          onDelete={async () => {
            Alert.alert(
              'Delete Flashcard',
              'Are you sure you want to delete this flashcard?',
              [
                {
                  text: 'cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteFlashcard(index);

                    const data = await getFlashcard();
                    setFlashcards(data || []);
                  },
                },
              ]
            );
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  container: {
    marginRight: 15,
    marginLeft: 15,
  },

  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15
  }
})