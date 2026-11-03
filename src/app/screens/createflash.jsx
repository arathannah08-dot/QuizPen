import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';
import Add from '../../components/ui/Add';
import AddSign from '../../components/ui/AddSign';
import UserInput from '../../components/ui/UserInput';
import { saveFlashcard } from '../../storage/flashcard';

export default function CreateFlash() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // Each flashcard has its own description and answer
  const [flash, setFlash] = useState([
    { description: '', answer: '' }
  ]);

  // Add another flashcard
  const addFlash = () => {
    setFlash([
      ...flash,
      { description: '', answer: '' }
    ]);
  };

  // Update the description or answer of a specific card
  const updateFlash = (index, field, text) => {
    const updatedFlash = [...flash];

    updatedFlash[index] = {
      ...updatedFlash[index],
      [field]: text
    };

    setFlash(updatedFlash);
  };

  // Save the flashcard set
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a flashcard title.');
      return;
    }

    const hasEmptyCard = flash.some(
      item => !item.description.trim() || !item.answer.trim()
    );

    if (hasEmptyCard) {
      Alert.alert(
        'Incomplete Flashcard',
        'Please enter both the Description and Answer for every flashcard.'
      );
      return;
    }

    const result = await saveFlashcard({
      title: title.trim(),
      desc: desc.trim(),
      flash: flash.map(item => ({
        description: item.description.trim(),
        answer: item.answer.trim()
      }))
    });

    if (result) {
      Alert.alert('Success', 'Your flashcards have been saved!', [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/flashcards')
        }
      ]);
    } else {
      Alert.alert(
        'Error',
        'Unable to save your flashcards. Please check if you are logged in.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <AddSign
            icon="arrow-back-outline"
            size={30}
            color="black"
            onPress={() => router.push('/(tabs)/create')}
          />

          <Text style={styles.headerTxt}>
            Create Flashcard
          </Text>
        </View>

        <Text style={styles.subTxt}>Add Title</Text>
        <UserInput
          type="Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.subTxt}>Add Description</Text>
        <UserInput
          type="Description"
          value={desc}
          onChangeText={setDesc}
        />

        {flash.map((item, index) => (
          <View style={styles.cards} key={index}>
            <Text style={styles.cardTitle}>
              Flashcard {index + 1}
            </Text>

            <Text style={styles.subTxt}>Description</Text>
            <Add
              add="Enter description or question"
              value={item.description}
              onChangeText={(text) =>
                updateFlash(index, 'description', text)
              }
            />

            <Text style={styles.subTxt}>Answer</Text>
            <Add
              add="Enter answer"
              value={item.answer}
              onChangeText={(text) =>
                updateFlash(index, 'answer', text)
              }
            />
          </View>
        ))}

        <AddSign
          style={styles.addSign}
          icon="add-circle"
          size={30}
          color="darkblue"
          onPress={addFlash}
        />

        <ActButton
          name="Save Flashcard Set"
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  container: {
    marginRight: 15,
    marginLeft: 15
  },

  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
    gap: 5
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  subTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  },

  addSign: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 15
  },

  cards: {
    marginBottom: 15
  }
});