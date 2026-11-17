
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Switch,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActButton from "../../../components/ui/ActButton";
import { getFlashcard } from "../../../storage/flashcard";

const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export default function Flashscreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const [showSettings, setShowSettings] = useState(false);
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                const data = await getFlashcard();
                const selected = data?.[Number(id)];

                setFlashcard(selected || null);
                setCards(Array.isArray(selected?.flash) ? selected.flash : []);
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

    const applySettings = () => {
        const originalCards = Array.isArray(flashcard?.flash)
            ? flashcard.flash
            : [];

        const updatedCards = shuffleEnabled
            ? shuffleArray(originalCards)
            : [...originalCards];

        setCards(updatedCards);
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
            <View style={styles.topBar}>
                <Text style={styles.header}>Flashcard Set</Text>

                <Pressable
                    style={styles.settingsButton}
                    onPress={() => setShowSettings(true)}
                >
                    <Text style={styles.settingsButtonText}>
                        ⚙ Settings
                    </Text>
                </Pressable>
            </View>

            {showSettings ? (
                <View style={styles.settingsCard}>
                    <Text style={styles.settingsTitle}>
                        Flashcard Settings
                    </Text>

                    <Text style={styles.settingsDescription}>
                        Customize how your flashcards are displayed.
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Flashcard Preferences
                    </Text>

                    <View style={styles.switchOption}>
                        <View style={styles.switchInfo}>
                            <Text style={styles.settingText}>
                                Shuffle Flashcards
                            </Text>

                            <Text style={styles.settingDescription}>
                                Display flashcards in random order.
                            </Text>
                        </View>

                        <Switch
                            value={shuffleEnabled}
                            onValueChange={setShuffleEnabled}
                            trackColor={{
                                false: "#CCCCCC",
                                true: "#FF4F87"
                            }}
                            thumbColor="#FFFFFF"
                        />
                    </View>

                    <Pressable
                        style={styles.applyButton}
                        onPress={applySettings}
                    >
                        <Text style={styles.buttonText}>
                            Apply Settings
                        </Text>
                    </Pressable>

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
                <>
                    <Text style={styles.title}>{flashcard.title}</Text>
                    <Text style={styles.description}>
                        {flashcard.desc}
                    </Text>

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

                    <ActButton
                        name="Go Back"
                        onPress={() => router.back()}
                    />
                </>
            )}
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
        marginBottom: 20,
    },

    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },

    settingsButton: {
        backgroundColor: '#FF4F87',
        padding: 10,
        borderRadius: 10,
    },

    settingsButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
        borderWidth: 1,
        borderColor: '#EEEEEE',
        elevation: 3,
    },

    settingsTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },

    settingsDescription: {
        fontSize: 14,
        color: '#777',
        marginBottom: 25,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#FF4F87',
    },

    switchOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 25,
    },

    switchInfo: {
        flex: 1,
        marginRight: 10,
    },

    settingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    settingDescription: {
        fontSize: 13,
        color: '#777',
        marginTop: 5,
    },

    applyButton: {
        backgroundColor: '#FF4F87',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    cancelButton: {
        padding: 15,
        alignItems: 'center',
        marginTop: 5,
    },

    cancelText: {
        color: '#FF4F87',
        fontWeight: 'bold',
    },
});
