import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInput from '../../components/ui/UserInput'; 
import { useRouter } from 'expo-router'; 
import {getFlashcard} from "../../storage/flashcard";

export default function Flashcards() {
  const router = useRouter();

  const [flashcards, setFlashcards] = useState([]);

  useEffect (() => {
    const loadFlashcards = async () => {
      const data = await getFlashcard();
      setFlashcards(data);
    };

    loadFlashcards();
  }, []);

  return (
    <SafeAreaView>
      <Text>Flashcards</Text>
      
      <UserInput type="Search flashcard ..."/>

      {flashcards.map((item, index) => (
        <TouchableOpacity key={index}>
          <Text>{item.title}</Text>
          <Text>{item.desc}</Text>
        </TouchableOpacity>
      ))}

    </SafeAreaView>
  );
}