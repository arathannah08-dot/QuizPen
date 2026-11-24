
import Ionicons from '@expo/vector-icons/Ionicons';

import { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Display({
    title,
    index,
    desc,
    length,
    name,
    onPress,
    onDelete,
    onEdit,
    isFavorite,
    onFavorite
}) {
    const [showDetails, setShowDetails] = useState(false);

    // Default icons depending on item type
    const isFlashcard = name === 'Cards';

    const itemIcon = isFlashcard
        ? 'albums-outline'
        : 'calculator-outline';

    const iconBackground = isFlashcard
        ? '#B46617'
        : '#FFBA00';

    return (
        <View style={styles.box}>

            {/* Card Icon and Information */}
            <View style={styles.cardContent}>

                {/* Default Icon */}
                <View style={[
                    styles.iconBox,
                    { backgroundColor: iconBackground }
                ]}>
                    <Ionicons
                        size={34}
                        name={itemIcon}
                        color="#FFFFFF"
                    />
                </View>

                {/* Title and Details */}
                <View style={styles.cardDetails}>

                    <View style={styles.detail}>
                        <Text style={styles.title}>
                            {title}
                        </Text>

                        <TouchableOpacity
                            onPress={() => setShowDetails(true)}
                        >
                            <Ionicons
                                size={19}
                                name="information-circle-outline"
                                color="#125643"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Card Count */}
                    <Text style={styles.cardInfo}>
                        {length} {name}
                    </Text>

                </View>

            </View>

            {/* Favorite, Edit and Delete Buttons */}
            <View style={styles.options}>

                <TouchableOpacity onPress={onFavorite}>
                    <Ionicons
                        size={22}
                        name={isFavorite ? "star" : "star-outline"}
                        color={isFavorite ? "#FFBA00" : "#125643"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onEdit}>
                    <Ionicons
                        size={20}
                        name="create-outline"
                        color="#125643"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Ionicons
                        size={20}
                        name="trash-outline"
                        color="#B46617"
                    />
                </TouchableOpacity>

            </View>

            {/* Details Modal */}
            <Modal
                visible={showDetails}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalBackground}>

                    <View style={styles.modalBox}>

                        <Text style={styles.modalTitle}>
                            {title}
                        </Text>

                        <Text style={styles.modalDesc}>
                            {desc}
                        </Text>

                        <Text style={styles.modalLength}>
                            {length} {name}
                        </Text>

                        <TouchableOpacity
                            style={styles.closeBttn}
                            onPress={() => setShowDetails(false)}
                        >
                            <Text style={styles.closeTxt}>
                                Close
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    box: {
        padding: 14,
        marginTop: 12,
        borderColor: '#E5E5E5',
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: '#F8F8F8',

        shadowColor: '#125643',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },

    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    iconBox: {
        width: 58,
        height: 58,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardDetails: {
        flex: 1,
        justifyContent: 'center',
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#125643',
        marginRight: 8,
    },

    cardInfo: {
        color: '#817B8D',
        fontSize: 14,
        marginTop: 5,
    },

    options: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 18,
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(18, 86, 67, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBox: {
        width: '88%',
        padding: 22,
        borderRadius: 18,
        backgroundColor: '#F8F8F8',

        shadowColor: '#125643',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#125643',
        marginBottom: 10,
    },

    modalDesc: {
        fontSize: 16,
        color: '#817B8D',
        lineHeight: 23,
        marginBottom: 12,
    },

    modalLength: {
        fontSize: 14,
        color: '#B46617',
        fontWeight: '600',
        marginBottom: 20,
    },

    closeBttn: {
        alignSelf: 'flex-end',
        backgroundColor: '#ACE2B6',
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 10,
    },

    closeTxt: {
        fontSize: 15,
        fontWeight: '700',
        color: '#125643',
    },

});
