
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActButton from "../../../components/ui/ActButton";
import { getFlashcard } from "../../../storage/flashcard";

export default function Flashscreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                const data = await getFlashcard();
                const selected = data?.[Number(id)];

                setFlashcard(selected || null);
            } catch (error) {
                console.log("Error loading flashcards:", error);
                setFlashcard(null);
            } finally {
                setLoading(false);
            }
        };

        loadFlashcards();
    }, [id]);

    // Get the flashcards safely
    const cards = Array.isArray(flashcard?.flash)
        ? flashcard.flash
        : [];

    const currentCard = cards[currentIndex];

    // Support both new and old saved formats
    const question = typeof currentCard === "string"
        ? currentCard
        : currentCard?.description ||
          currentCard?.question ||
          "";

    const answer = typeof currentCard === "object"
        ? currentCard?.answer || ""
        : "";

    const flipCard = () => {
        setShowAnswer(previous => !previous);
    };

    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(previous => previous + 1);
            setShowAnswer(false);
        }
    };

    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(previous => previous - 1);
            setShowAnswer(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading flashcards...</Text>
            </SafeAreaView>
        );
    }

    if (!flashcard) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Flashcard set not found.</Text>
                <ActButton
                    name="Go Back"
                    onPress={() => router.back()}
                />
            </SafeAreaView>
        );
    }

    if (cards.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>{flashcard.title}</Text>
                <Text>No flashcards available in this set.</Text>
                <ActButton
                    name="Go Back"
                    onPress={() => router.back()}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Flashcard Set</Text>

            <Text style={styles.title}>{flashcard.title}</Text>
            <Text style={styles.description}>{flashcard.desc}</Text>

            <Text style={styles.counter}>
                Card {currentIndex + 1} of {cards.length}
            </Text>

            <Pressable
                style={styles.card}
                onPress={flipCard}
            >
                <Text style={styles.label}>
                    {showAnswer ? "ANSWER" : "DESCRIPTION"}
                </Text>

                <Text style={styles.cardText}>
                    {showAnswer ? answer : question}
                </Text>

                <Text style={styles.hint}>
                    Tap to {showAnswer ? "see description" : "reveal answer"}
                </Text>
            </Pressable>

            <View style={styles.navigation}>
                <Pressable
                    style={[
                        styles.navButton,
                        currentIndex === 0 && styles.disabled
                    ]}
                    onPress={previousCard}
                    disabled={currentIndex === 0}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.navButton,
                        currentIndex === cards.length - 1 && styles.disabled
                    ]}
                    onPress={nextCard}
                    disabled={currentIndex === cards.length - 1}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>

            <ActButton
                name="Go Back"
                onPress={() => router.back()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    description: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
        marginBottom: 25,
    },

    counter: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#777',
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        minHeight: 250,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },

    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF4F87',
        marginBottom: 25,
    },

    cardText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },

    hint: {
        fontSize: 12,
        color: '#999',
        marginTop: 25,
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 20,
    },

    navButton: {
        backgroundColor: '#FF4F87',
        padding: 15,
        borderRadius: 10,
        minWidth: 110,
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    disabled: {
        backgroundColor: '#CCCCCC',
    },
});
