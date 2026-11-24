
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Add from '../../components/ui/Add';
import AddSign from '../../components/ui/AddSign';
import BackButton from '../../components/ui/BackButton';
import UserInput from '../../components/ui/UserInput';
import { getFlashcard, updateFlashcard } from '../../storage/flashcard';

export default function EditFlash() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [flash, setFlash] = useState([]);

    // Load the selected flashcard set
    useEffect(() => {
        const loadFlashcard = async () => {
            const data = await getFlashcard();

            const index = data.findIndex(
                item => item.id === String(id)
            );

            if (index !== -1) {
                const flashcard = data[index];

                setTitle(flashcard.title || '');
                setDesc(flashcard.desc || '');
                setFlash(flashcard.flash || []);
            } else {
                Alert.alert('Error', 'ERROR FROM ADD1.');
                router.back();
            }
        };

        loadFlashcard();
    }, [id]);

    // Add another card
    const addFlash = () => {
        setFlash([
            ...flash,
            { description: '', answer: '' }
        ]);
    };

    // Update a card's description or answer
    const updateFlash = (index, field, text) => {
        const updatedFlash = [...flash];

        updatedFlash[index] = {
            ...updatedFlash[index],
            [field]: text
        };

        setFlash(updatedFlash);
    };

    // Save the edited flashcard set
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

        const data = await getFlashcard();

        const index = data.findIndex(
            item => item.id === String(id)
        );

        if (index === -1) {
            Alert.alert('Error', 'Flashcard not found');
            return;
        }

        const updatedFlashcard = {
            ...data[index],
            title: title.trim(),
            desc: desc.trim(),
            flash: flash.map(item => ({
                description: item.description.trim(),
                answer: item.answer.trim()
            }))
        };

        const result = await updateFlashcard(index, updatedFlashcard);

        if (result) {
            Alert.alert('Saved', 'Flashcard updated successfully.', [
                {
                    text: 'OK',
                    onPress: () => router.back()
                }
            ]);
        } else {
            Alert.alert('Error', 'Unable to update flashcard.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.logo}>QuizPen</Text>

                    <View style={styles.header}>
                        <BackButton />
                        <Text style={styles.headerTxt}>
                            Edit Flashcard
                        </Text>
                    </View>

                    <Text style={styles.subTxt}>Edit Title</Text>
                    <UserInput
                        type="Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.subTxt}>Edit Description</Text>
                    <UserInput
                        type="Description"
                        value={desc}
                        onChangeText={setDesc}
                    />

                    <Text style={styles.sectionTitle}>
                        Your Flashcards
                    </Text>

                    <AddSign
                        style={styles.addSign}
                        icon="add-circle"
                        size={38}
                        color="#FFBA00"
                        onPress={addFlash}
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

                    <Pressable
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>
                            Save Changes
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#125643'
    },

    container: {
        flex: 1,
        paddingHorizontal: 20
    },

    content: {
        paddingBottom: 30
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 15
    },

    headerTxt: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFBA00'
    },

    subTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 5
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFBA00',
        marginTop: 20
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 5
    },

    addSign: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 5
    },

    cards: {
        marginTop: 15,
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#F8F8F8',
        borderRadius: 15
    },

    saveButton: {
        backgroundColor: '#FFBA00',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5
    },

    saveButtonText: {
        color: '#125643',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
