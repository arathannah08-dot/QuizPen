import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getFlashcard, updateFlashcard } from '../../storage/flashcard';

export default function EditFlash() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const loadFlashcard = async () => {
      const data = await getFlashcard();
      const flashcard = data[Number(id)];

      if (flashcard) {
        setTitle(flashcard.title);
        setDesc(flashcard.desc);
      }
    };

    loadFlashcard();
  }, [id]);

const handleSave = async () => {
  const data = await getFlashcard();
  const flashcard = data[Number(id)];

  if (!flashcard) {
    Alert.alert('Error', 'Flashcard not found.');
    return;
  }

  const updatedFlashcard = {
    ...flashcard,
    title: title.trim(),
    desc: desc.trim(),
  };

  await updateFlashcard(Number(id), updatedFlashcard);

  Alert.alert('Saved', 'Flashcard updated successfully.', [
    {
      text: 'OK',
      onPress: () => router.back(),
    },
  ]);
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Flashcard</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.description]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Enter description"
        multiline
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  description: {
    height: 100,
    textAlignVertical: 'top',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  backButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },

  saveButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ff4f87',
  },

  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});