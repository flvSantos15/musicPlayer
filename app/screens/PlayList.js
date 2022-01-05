import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import PlayListInputModal from '../components/PlayListInputModal';

const Playlist = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.playListBanner}>
        <Text style={styles.favAudio}>My Favorite</Text>
        <Text style={styles.audioCount}>0 Songs</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{marginTop: 15}}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.playListBtn}> + Add New Playlist</Text>
      </TouchableOpacity>

      <PlayListInputModal 
        visible={modalVisible} 
        onClose={() => {setModalVisible(false)}}
        // onSubmit={}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#001259'
  },
  playListBanner: {
    padding: 5,
    // backgroundColor: 'rgba(204, 204, 204, 0.3)',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  audioCount: {
    marginTop: 3,
    opacity: 0.5,
    fontSize: 14,
  },
  playListBtn: {
    color: '#fff',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
  }
})

export default Playlist;
