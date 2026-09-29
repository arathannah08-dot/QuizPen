import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, ScrollView, Text} from 'react-native';
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

          <Text style={styles.subTxt}>
            Add Title
          </Text>
          <UserInput
          type="Title"
          value={title}
          onChangeText={setTitle}
          />


          <Text style={styles.subTxt}>
            Add Description
          </Text>
          <UserInput
          type="Description"
          value={desc}
          onChangeText={setDesc}
          />


          <AddSign
           style={styles.addSign}
           icon="add-circle"
           size={30}
           color="darkblue"
           onPress={addFlash}
          />

          {flash.map((item, index) => (
            <View
             style={styles.cards} 
             key={index}>
            
            <Text style={styles.subTxt}>
              Add Flashcard
            </Text>

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
            </View>
          ))}


          <ActButton
          name="Save Flashcard Set"
          onPress={async() => {
            await saveFlashcard({
              title: title,
              desc: desc,
              flash: flash
            });

            setTitle('');
            setDesc('');
            setFlash(['']);

            router.push('/(tabs)/flashcards');
          }}
          />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles= StyleSheet.create ({
  container: {
    marginRight: 15,
    marginLeft: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
    gap: 5
  },

  headerTxt: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
  },

  addSign: {
    alignSelf: 'flex-end',
    marginTop: 15
  },

  cards: {
    marginBottom: 20
  }
})
