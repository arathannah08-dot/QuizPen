
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActButton from "../../../components/ui/ActButton";
import { getFlashcard } from "../../../storage/flashcard";

// Shuffle flashcards
const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }

    return shuffled;
};

export default function Flashscreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    // Settings
    const [showSettings, setShowSettings] = useState(false);
    const [cardOrder, setCardOrder] = useState("chronological");

    // Load flashcards
    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                const data = await getFlashcard();
                const selected = data?.[Number(id)];

                if (selected) {
                    const savedCards = Array.isArray(selected.flash)
                        ? selected.flash
                        : [];

                    setFlashcard(selected);
                    setOriginalCards(savedCards);
                    setCards(savedCards);
                } else {
                    setFlashcard(null);
                }

            } catch (error) {
                console.log("Error loading flashcards:", error);
                setFlashcard(null);
            } finally {
                setLoading(false);
            }
        };

        loadFlashcards();
    }, [id]);

    const currentCard = cards[currentIndex];

    // Support old and new saved formats
    const question = typeof currentCard === "string"
        ? currentCard
        : currentCard?.description ||
          currentCard?.question ||
          "";

    const answer = typeof currentCard === "object"
        ? currentCard?.answer || ""
        : "";

    // Flip card
    const flipCard = () => {
        setShowAnswer(previous => !previous);
    };

    // Next card
    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(previous => previous + 1);
            setShowAnswer(false);
        }
    };

    // Previous card
    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(previous => previous - 1);
            setShowAnswer(false);
        }
    };

    // Apply settings
    const applySettings = () => {
        const orderedCards = cardOrder === "shuffle"
            ? shuffleArray(originalCards)
            : [...originalCards];

        setCards(orderedCards);

        // Reset flashcard progress
        setCurrentIndex(0);
        setShowAnswer(false);
        setShowSettings(false);
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

            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.header}>Flashcard Set</Text>

                <Pressable
                    style={styles.settingsButton}
                    onPress={() => setShowSettings(!showSettings)}
                >
                    <Text style={styles.settingsButtonText}>
                        ⚙ Settings
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.title}>{flashcard.title}</Text>
            <Text style={styles.description}>{flashcard.desc}</Text>

            {showSettings ? (

                /* SETTINGS */
                <View style={styles.settingsCard}>

                    <Text style={styles.settingsTitle}>
                        Flashcard Settings
                    </Text>

                    <Text style={styles.settingsDescription}>
                        Choose how you want to study your flashcards.
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Card Preferences
                    </Text>

                    {/* Shuffle */}
                    <Pressable
                        style={[
                            styles.settingOption,
                            cardOrder === "shuffle" &&
                                styles.settingSelected
                        ]}
                        onPress={() => setCardOrder("shuffle")}
                    >
                        <Text style={styles.settingText}>
                            🔀 Shuffle Flashcards
                        </Text>

                        <Text style={styles.optionDescription}>
                            Display flashcards in random order.
                        </Text>
                    </Pressable>

                    {/* Chronological */}
                    <Pressable
                        style={[
                            styles.settingOption,
                            cardOrder === "chronological" &&
                                styles.settingSelected
                        ]}
                        onPress={() => setCardOrder("chronological")}
                    >
                        <Text style={styles.settingText}>
                            🔢 Chronological Order
                        </Text>

                        <Text style={styles.optionDescription}>
                            Follow the original flashcard order.
                        </Text>
                    </Pressable>

                    {/* Apply */}
                    <Pressable
                        style={styles.applyButton}
                        onPress={applySettings}
                    >
                        <Text style={styles.applyButtonText}>
                            Apply Settings
                        </Text>
                    </Pressable>

                    {/* Cancel */}
                    <Pressable
                        style={styles.cancelButton}
                        onPress={() => setShowSettings(false)}
                    >
                        <Text style={styles.cancelText}>
                            Cancel
                        </Text>
                    </Pressable>

                </View>

            ) : (

                /* FLASHCARDS */
                <>
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
                            Tap to {showAnswer
                                ? "see description"
                                : "reveal answer"}
                        </Text>
                    </Pressable>

                    {/* Navigation */}
                    <View style={styles.navigation}>

                        <Pressable
                            style={[
                                styles.navButton,
                                currentIndex === 0 && styles.disabled
                            ]}
                            onPress={previousCard}
                            disabled={currentIndex === 0}
                        >
                            <Text style={styles.buttonText}>
                                Previous
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.navButton,
                                currentIndex === cards.length - 1 &&
                                    styles.disabled
                            ]}
                            onPress={nextCard}
                            disabled={currentIndex === cards.length - 1}
                        >
                            <Text style={styles.buttonText}>
                                Next
                            </Text>
                        </Pressable>

                    </View>
                </>
            )}

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

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    settingsButton: {
        backgroundColor: '#FFE1EB',
        padding: 10,
        borderRadius: 10,
    },

    settingsButtonText: {
        color: '#FF4F87',
        fontWeight: 'bold',
        fontSize: 14,
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

    settingsCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },

    settingsTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },

    settingsDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },

    settingOption: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#FF4F87',
        borderRadius: 10,
        marginBottom: 12,
    },

    settingSelected: {
        backgroundColor: '#FFE1EB',
        borderWidth: 2,
    },

    settingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },

    optionDescription: {
        fontSize: 13,
        color: '#777',
    },

    applyButton: {
        backgroundColor: '#FF4F87',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },

    applyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    cancelButton: {
        alignItems: 'center',
        padding: 12,
        marginTop: 5,
    },

    cancelText: {
        color: '#FF4F87',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
