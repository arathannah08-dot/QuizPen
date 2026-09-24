import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActButton from '../../components/ui/ActButton';
import Add from '../../components/ui/Add';
import AddSign from '../../components/ui/AddSign';
import UserInput from '../../components/ui/UserInput';
import { saveFlashcard } from '../../storage/flashcard';


export default function CreateFlash() {
  const router = useRouter();


  const [title, setTitle] = useState ('');
  const [desc, setDesc] = useState('');
  const [flash, setFlash] = useState(['']);


  const addFlash = () => {
    setFlash([...flash, '']);
  }


  return (
    <SafeAreaView>
        <Text>Create Flashcard</Text>


        <Text>Add Title</Text>
        <UserInput
         type="Title"
         value={title}
         onChangeText={setTitle}
        />


        <Text>Add Description</Text>
        <UserInput
         type="Description"
         value={desc}
         onChangeText={setDesc}
        />


        <AddSign
         icon="add-circle"
         size={30}
         color="darkblue"
         onPress={addFlash}
        />
       
        <Text>Add Flashcard</Text>


        {flash.map((item, index) => (
          <Add
           key={index}
           add="Flashcard"
           value={item}
           onChangeText={(text) => {
            const updatedFlash = [...flash];
            updatedFlash[index] = text;
            setFlash(updatedFlash);
           }}
          />
        ))}


        <ActButton
         name="Save Flashcard Set"
         onPress={async() => {
          await saveFlashcard({
            title: title,
            desc: desc,
            flash: flash
          });


          router.push('/(tabs)/flashcards');
         }}
        />


    </SafeAreaView>
  );
}
