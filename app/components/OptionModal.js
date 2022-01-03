import React from 'react';
import { View, StyleSheet, Text, Modal, Dimensions } from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const OptionModal = ({ visible }) => {
  return (
    <View style={styles.container}>
      <Modal transparent visible={visible}>
        <View style={styles.modal}>
          <Text numberOfLines={2} style={styles.title}>Title of audio</Text>
          <View style={styles.optionContainer}>
            <Text style={styles.option}>
              <AntDesign name="playcircleo" size={20} color="#bc0b27" />
              {' '}
              Play
            </Text>
            <Text style={styles.option}>
              <MaterialIcons name="playlist-add" size={20} color="#bc0b27" />
              {' '}
              Add to Playlist
            </Text>
          </View>
        </View>
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
    backgroundColor: '#000049',
    borderColor: '#fff',
    borderWidth: 1,
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
})

export default OptionModal;
