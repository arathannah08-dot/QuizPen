import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Display ({title, desc, length, name, onPress, onDelete}) {
    return (
        <TouchableOpacity
            style={styles.box}
            onPress={onPress}
        >
            <View style={styles.detail}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <TouchableOpacity>
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
  }
})