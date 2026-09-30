import Ionicons from '@expo/vector-icons/Ionicons';
<<<<<<< Updated upstream
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Display ({title, index,desc, length, name, onPress, onDelete, onEdit}) {

    const [showDetails, setShowDetails] = useState(false);
=======
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
>>>>>>> Stashed changes

    return (
        <TouchableOpacity
            style={styles.box}
            onPress={onPress}
        >
            <View style={styles.detail}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <TouchableOpacity onPress={() => setShowDetails(true)}>
                    <Ionicons size={20} name='alert-circle-outline'/>
                </TouchableOpacity>
            </View>

            <Text style={styles.cardInfo}>
                {length} {name}
            </Text>

            <View style={styles.options}>
                <TouchableOpacity onPress={onEdit}>
                    <Ionicons 
                     size={20}
                     name="create-outline"
                     color="#6C4AB6"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons 
                     size={20}
                     name="trash-outline"
                     color="#6C4AB6"/>
                </TouchableOpacity>
            </View>
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
                         onPress={() => setShowDetails(false)}>
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

const styles = StyleSheet. create ({
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

  title: {
    fontSize: 18,
        fontWeight: '700',
        color: '#292333',
        marginBottom: 5,
  },

  options: {
    marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
  },

  detail: {
    flexDirection: 'row',
<<<<<<< Updated upstream
    alignItems: 'baseline',
    gap: 5
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalBox: {
    width: '88%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white'
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  modalDesc: {
    fontSize: 16,
    marginBottom: 10
  },

  modalLength: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 20
  },

  closeBttn: {
    alignSelf: 'flex-end'
  },

  closeTxt: {
    fontSize: 16,
    fontWeight: 'bold'
  }
=======
        alignItems: 'center',
        justifyContent: 'space-between',
  },

  cardInfo: {
    color: '#817B8D',
    fontSize: 14,
    marginTop: 2,
},
>>>>>>> Stashed changes
})