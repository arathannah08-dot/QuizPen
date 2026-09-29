import Ionicons from '@expo/vector-icons/Ionicons';
import { Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useState } from 'react';

export default function Display ({title, index,desc, length, name, onPress, onDelete}) {

    const [showDetails, setShowDetails] = useState(false);

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

            <Text style={{color: 'lightgrey'}}>
                {length} {name}
            </Text>

            <View style={styles.options}>
                <TouchableOpacity>
                    <Ionicons 
                     size={20}name ='create-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons 
                     size={20}
                     name ='trash-outline'/>
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
    padding: 10,
    marginTop: 12,
    borderColor: 'lightgrey',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: 'white'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  options: {
    marginRight: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  detail: {
    flexDirection: 'row',
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
})