
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../components/ui/BackButton';
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
            try {
                const data = await getFlashcard();
                const flashcard = data[Number(id)];

                if (flashcard) {
                    setTitle(flashcard.title || '');
                    setDesc(flashcard.desc || '');
                    setFlash(
                        Array.isArray(flashcard.flash)
                            ? flashcard.flash.map(item => ({
                                ...item,
                                description: item.description || '',
                                answer: item.answer || '',
                            }))
                            : []
                    );
                }
            } catch (error) {
                console.log('Error loading flashcard:', error);
                Alert.alert('Error', 'Unable to load flashcard.');
            }
        };

        loadFlashcard();
    }, [id]);

    // Update a specific flashcard's definition or answer
    const updateFlash = (index, field, text) => {
        const updatedFlash = [...flash];

        updatedFlash[index] = {
            ...updatedFlash[index],
            [field]: text,
        };

        setFlash(updatedFlash);
    };

    // Save the updated flashcard set
    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Missing Title', 'Please enter a flashcard title.');
            return;
        }

        if (
            flash.some(
                item =>
                    !item.description.trim() ||
                    !item.answer.trim()
            )
        ) {
            Alert.alert(
                'Incomplete Flashcard',
                'Please enter both the Definition and Answer for every flashcard.'
            );
            return;
        }

        try {
            const data = await getFlashcard();
            const flashcard = data[Number(id)];

            /*if (!flashcard) {
                Alert.alert('Error', 'Flashcard not found.');
                return;
            }*/
            if (!flashcard) {
                Alert.alert('Error', 'Flashcard not found');
                return;
            }
            const updatedFlashcard = {
                ...flashcard,
                title: title.trim(),
                desc: desc.trim(),
                flash: flash.map(item => ({
                    ...item,
                    description: item.description.trim(),
                    answer: item.answer.trim(),
                })),
            };

            const success = await updateFlashcard(
                Number(id),
                updatedFlashcard
            );

            if (success === false) {
                Alert.alert('Error', 'Unable to update flashcard.');
                return;
            }

            Alert.alert('Saved', 'Flashcard updated successfully.', [
                {
                    text: 'OK',
                    onPress: () => router.back(),
                },
            ]);

        } catch (error) {
            console.log('Error updating flashcard:', error);
            Alert.alert('Error', 'Something went wrong while saving.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.logo}>QuizPen</Text>

                <View style={styles.titleRow}>
                    <BackButton />
                    <Text style={styles.header}>Edit Flashcard</Text>
                </View>

                {/* Flashcard Set Information */}
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter title"
                    placeholderTextColor="#9B94A8"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.description]}
                    value={desc}
                    onChangeText={setDesc}
                    placeholder="Enter description"
                    placeholderTextColor="#9B94A8"
                    multiline
                />

                {/* Individual Flashcards */}
                <Text style={styles.sectionTitle}>
                    Your Flashcards
                </Text>

                {flash.map((item, index) => (
                    <View style={styles.card} key={index}>
                        <Text style={styles.cardTitle}>
                            Flashcard {index + 1}
                        </Text>

                        <Text style={styles.cardLabel}>
                            Definition
                        </Text>

                        <TextInput
                            style={[styles.input, styles.cardInput]}
                            value={item.description}
                            onChangeText={(text) =>
                                updateFlash(index, 'description', text)
                            }
                            placeholder="Enter definition or question"
                            placeholderTextColor="#9B94A8"
                            multiline
                        />

                        <Text style={styles.cardLabel}>
                            Answer
                        </Text>

                        <TextInput
                            style={[styles.input, styles.cardInput]}
                            value={item.answer}
                            onChangeText={(text) =>
                                updateFlash(index, 'answer', text)
                            }
                            placeholder="Enter answer"
                            placeholderTextColor="#9B94A8"
                            multiline
                        />
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125643',
        paddingHorizontal: 20,
    },

    logo: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 25,
    },

    header: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFBA00',
    },

    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F8F8F8',
        marginBottom: 8,
    },

    input: {
        backgroundColor: '#F8F8F8',
        color: '#125643',
        borderWidth: 1,
        borderColor: '#ACE2B6',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        fontSize: 14,
    },

    description: {
        height: 100,
        textAlignVertical: 'top',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFBA00',
        marginTop: 5,
        marginBottom: 15,
    },

    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 12,
    },

    cardLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#125643',
        marginBottom: 8,
    },

    cardInput: {
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
        minHeight: 90,
        marginBottom: 15,
    },

    saveButton: {
        backgroundColor: '#FFBA00',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 30,
    },

    saveText: {
        color: '#125643',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
