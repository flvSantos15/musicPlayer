import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Modal, 
  Dimensions, 
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const OptionModal = ({ 
  visible, 
  currentItem, 
  onClose, 
  onPlayPress, 
  onPlayListPress 
}) => {
  const { filename } = currentItem;
  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent visible={visible}>
        <View style={styles.modal}>
          <Text numberOfLines={2} style={styles.title}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity onPress={onPlayPress}>
              <Text style={styles.option}>
                <AntDesign name="playcircleo" size={20} color="#bc0b27" />
                {' '}
                Play
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayListPress}>
              <Text style={styles.option}>
                <MaterialIcons name="playlist-add" size={20} color="#bc0b27" />
                {' '}
                Add to Playlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 30,
    width: width - 100,
    backgroundColor: '#000059',
    borderColor: '#fff',
    borderWidth: 0.5,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    zIndex: 9,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
    letterSpacing: 1,
    // lineHeight: 25
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }

})

export default OptionModal;
