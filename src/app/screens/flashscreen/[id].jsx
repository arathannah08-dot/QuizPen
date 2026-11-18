
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../components/ui/BackButton";
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
    const { id } = useLocalSearchParams();

    const [flashcard, setFlashcard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const [showSettings, setShowSettings] = useState(false);
    const [shuffleEnabled, setShuffleEnabled] = useState(false);

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

    const question = typeof currentCard === "string"
        ? currentCard
        : currentCard?.description ||
          currentCard?.question ||
          "";

    const answer = typeof currentCard === "object"
        ? currentCard?.answer || ""
        : "";

    // Flip flashcard
    const flipCard = () => {
        setShowAnswer(previous => !previous);
    };

    // Next flashcard
    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(previous => previous + 1);
            setShowAnswer(false);
        }
    };

    // Previous flashcard
    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(previous => previous - 1);
            setShowAnswer(false);
        }
    };

    // Apply flashcard settings
    const applySettings = () => {
        const originalCards = Array.isArray(flashcard?.flash)
            ? flashcard.flash
            : [];

        const updatedCards = shuffleEnabled
            ? shuffleArray(originalCards)
            : [...originalCards];

        setCards(orderedCards);
        setCurrentIndex(0);
        setShowAnswer(false);
        setShowSettings(false);
    };

    // Loading screen
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                        Loading flashcards...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    // Flashcard not found
    if (!flashcard) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>
                        Flashcard not found
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    // No flashcards available
    if (cards.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageTitle}>
                        {flashcard.title}
                    </Text>

                    <Text style={styles.messageText}>
                        No flashcards available in this set.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.header}>QuizPen</Text>

                {/* Title Row */}
                <View style={styles.titleRow}>

                    {!showSettings && <BackButton />}

                    <Text style={styles.title}>
                        {showSettings
                            ? "Flashcard Settings"
                            : flashcard.title}
                    </Text>

                    {!showSettings && (
                        <Pressable
                            style={styles.settingsButton}
                            onPress={() => setShowSettings(true)}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#F8F8F8"
                            />
                        </Pressable>
                    )}
                </View>

                {/* Description */}
                <Text style={styles.description}>
                    {showSettings
                        ? "Customize your experience"
                        : flashcard.desc}
                </Text>

                {showSettings ? (

                    /* SETTINGS */
                    <View style={styles.settingsContent}>

                        <Text style={styles.sectionTitle}>
                            Question Preference
                        </Text>

                        <Text style={styles.settingsDescription}>
                            Choose how you'd like your cards to be displayed.
                        </Text>

                        {/* Shuffle */}
                        <Pressable
                            style={styles.settingOption}
                            onPress={() => setCardOrder("shuffle")}
                        >
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.settingText}>
                                    Shuffle Flashcards
                                </Text>

                                <Text style={styles.optionDescription}>
                                    Display flashcards in random order.
                                </Text>
                            </View>

                            {cardOrder === "shuffle" && (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color="#FFBA00"
                                />
                            )}
                        </Pressable>

                        {/* Chronological */}
                        <Pressable
                            style={styles.settingOption}
                            onPress={() => setCardOrder("chronological")}
                        >
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.settingText}>
                                    Chronological Order
                                </Text>

                                <Text style={styles.optionDescription}>
                                    Follow the original flashcard order.
                                </Text>
                            </View>

                            {cardOrder === "chronological" && (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color="#FFBA00"
                                />
                            )}
                        </Pressable>

                        {/* Settings Buttons */}
                        <View style={styles.settingsButtons}>

                            <Pressable
                                style={styles.applyButton}
                                onPress={applySettings}
                            >
                                <Text style={styles.applyButtonText}>
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
                    </View>

                ) : (

                    /* FLASHCARD DISPLAY */
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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#125643',
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 30,
    },

    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    messageTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFBA00',
        textAlign: 'center',
        marginBottom: 12,
    },

    messageText: {
        fontSize: 15,
        color: '#ACE2B6',
        textAlign: 'center',
        marginBottom: 20,
    },

    header: {
        fontSize: 36,
        fontWeight: '800',
        color: '#F8F8F8',
        marginTop: 10,
        marginBottom: 20,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },

    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: '800',
        color: '#FFBA00',
    },

    settingsButton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    description: {
        fontSize: 14,
        color: '#ACE2B6',
        marginLeft: 46,
        marginTop: 3,
        marginBottom: 25,
    },

    // Flashcard styles
    counter: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#ACE2B6',
        fontSize: 14,
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#F8F8F8',
        borderRadius: 20,
        padding: 25,
        minHeight: 280,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    label: {
        fontSize: 14,
        fontWeight: '800',
        color: '#B46617',
        marginBottom: 25,
        letterSpacing: 1,
    },

    cardText: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#125643',
    },

    hint: {
        fontSize: 12,
        color: '#B46617',
        marginTop: 25,
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        marginTop: 25,
        marginBottom: 25,
    },

    navButton: {
        flex: 1,
        backgroundColor: '#FFBA00',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },

    buttonText: {
        color: '#125643',
        fontWeight: '800',
        fontSize: 15,
    },

    disabled: {
        backgroundColor: '#ACE2B6',
        opacity: 0.6,
    },

    // Settings styles
    settingsContent: {
        flex: 1,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#F8F8F8',
        marginBottom: 12,
    },

    settingsDescription: {
        fontSize: 14,
        color: '#ACE2B6',
        marginBottom: 15,
    },

    settingOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 18,
        borderRadius: 15,
        marginBottom: 18,
    },

    optionTextContainer: {
        flex: 1,
    },

    settingText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#222222',
        marginBottom: 5,
    },

    settingDescription: {
        fontSize: 13,
        color: '#555555',
    },

    settingsButtons: {
        marginTop: 'auto',
        paddingTop: 25,
    },

    applyButton: {
        backgroundColor: '#FFBA00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },

    applyButtonText: {
        color: '#F8F8F8',
        fontWeight: '800',
        fontSize: 15,
    },

    cancelButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    cancelText: {
        color: '#F8F8F8',
        fontWeight: '800',
        fontSize: 15,
    },
});
