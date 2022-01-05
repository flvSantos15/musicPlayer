import React from 'react';
import {View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { AntDesign } from '@expo/vector-icons'

const PlayListInputModal = ({visible, onClose, onSubmit}) => {
  return (
    <Modal 
      visible={visible}
      animationType='fade'
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
          />
          <AntDesign 
            name='check' 
            size={24} 
            color='#fff'
            style={styles.submitIcon}
            onPress={onSubmit}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}/>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width - 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    paddingVertical: 5
  },
  submitIcon: {
    padding: 10,
    backgroundColor: '#92ef00',
    borderRadius: 50,
    marginTop: 15,
  },
  modalBG: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: -1,
  }
})

export default PlayListInputModal;
