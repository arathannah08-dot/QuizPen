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
    onEdit
}) {
    const [showDetails, setShowDetails] = useState(false);


    return (
        <TouchableOpacity
            style={styles.box}
            onPress={onPress}
        >

            {/* Title and Details Icon */}
            <View style={styles.detail}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={() => setShowDetails(true)}
                >
                    <Ionicons
                        size={20}
                        name="alert-circle-outline"
                        color="#6C4AB6"
                    />
                </TouchableOpacity>
            </View>

            {/* Card Count */}
            <Text style={styles.cardInfo}>
                {length} {name}
            </Text>

            {/* Edit and Delete Buttons */}
            <View style={styles.options}>

                <TouchableOpacity onPress={onEdit}>
                    <Ionicons
                        size={20}
                        name="create-outline"
                        color="#6C4AB6"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <Ionicons
                        size={20}
                        name="trash-outline"
                        color="#6C4AB6"
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

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    box: {
        padding: 16,
        marginTop: 12,
        borderColor: '#E1D9EF',
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',

        shadowColor: '#6C4AB6',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#292333',
        marginBottom: 5,
        marginRight: 10,
    },

    cardInfo: {
        color: '#817B8D',
        fontSize: 14,
        marginTop: 2,
    },

    options: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 15,
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(41, 35, 51, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBox: {
        width: '88%',
        padding: 22,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',

        shadowColor: '#6C4AB6',
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
        color: '#292333',
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
        color: '#6C4AB6',
        fontWeight: '600',
        marginBottom: 20,
    },

    closeBttn: {
        alignSelf: 'flex-end',
        backgroundColor: '#EEE8FA',
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 10,
    },

    closeTxt: {
        fontSize: 15,
        fontWeight: '700',
        color: '#6C4AB6',
    },

});