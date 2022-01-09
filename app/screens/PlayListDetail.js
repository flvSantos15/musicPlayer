import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AudioListItem from '../components/AudioListItem'
import { selectAudio } from '../misc/audioController'
import { AudioContext } from '../context/AudioProvider';
import OptionModal from '../components/OptionModal'

const PlayListDetail = props => {
  const context = useContext(AudioContext)
  const playList = props.route.params

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [audios, setAudios] = useState(playList.audios)

  const playAudio = async audio => {
    await selectAudio(audio, context, {
      activePlayList: playList,
      isPlayListRunning: true
    })
  }

  const closeModal = () => {
    setSelectedItem({})
    setModalVisible(false)
  }
  const removeAudio = async () => {
    let isPlaying = context.isPlaying
    let isPlayListRunning = context.isPlayListRunning
    let soundObj = context.soundObj
    let playbackPosition = context.playbackPosition
    let activePlayList = context.activePlayList

    if(context.isPlayListRunning 
      && context.currentAudio.id
      === selectedItem.id){
        //stop
        await context.playbackObj.stopAsync()
        await context.playbackObj.unloadAsync()

        isPlaying = false
        isPlayListRunning = false
        soundObj = null
        playbackPosition = 0
        activePlayList = []
      }

    const newAudios = audios.filter(audio => audio.id !== selectedItem.id)
    
    const result = await AsyncStorage.getItem('playlist')
    
    if(result !== null){
      const oldPlayLists = JSON.parse(result)
      const updatedPlayLists = oldPlayLists.filter((item) => {
        if(item.id === playList.id){
          item.audios = newAudios
        }
        return item
      })
      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
      context.updateState(context, {
        playList: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj
      })
    }

    setAudios(newAudios)
    closeModal()
  }

  const removePlaylist = async () => {
    let isPlaying = context.isPlaying
    let isPlayListRunning = context.isPlayListRunning
    let soundObj = context.soundObj
    let playbackPosition = context.playbackPosition
    let activePlayList = context.activePlayList

    if(context.isPlayListRunning 
      && activePlayList.id === playList.id){
        //stop
        await context.playbackObj.stopAsync()
        await context.playbackObj.unloadAsync()

        isPlaying = false
        isPlayListRunning = false
        soundObj = null
        playbackPosition = 0
        activePlayList = []
      }
    
    const result = await AsyncStorage.getItem('playlist')
    
    if(result !== null){
      const oldPlayLists = JSON.parse(result)
      const updatedPlayLists = oldPlayLists.filter(item => item.id !== playList.id)

      AsyncStorage.setItem('playlist', JSON.stringify(updatedPlayLists))
      context.updateState(context, {
        playList: updatedPlayLists,
        isPlayListRunning,
        activePlayList,
        playbackPosition,
        isPlaying,
        soundObj
      })
    }

    props.navigation.goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
          <Text style={styles.title}>{playList.title}</Text>
          <TouchableOpacity onPress={removePlaylist}>
            <Text style={[styles.title, {color: '#ff0b19'}]}>Remove</Text>
          </TouchableOpacity>
        </View>
        {audios.length ? 
          <FlatList
          contentContainerStyle={styles.listContainer}
          data={audios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 8 }}>
              <AudioListItem
                title={item.filename}
                duration={item.duration}
                isPlaying={context.isPlaying}
                activeListItem={item.id === context.currentAudio.id}
                onAudioPress={() => playAudio(item)}
                onOptionPress={() => {
                  setSelectedItem(item)
                  setModalVisible(true)
                }}
              />
            </View>
          )}
        />
        : <View style={styles.container}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              color: '#cecece',
              paddingTop: 50,
            }}>Sem audios</Text>
          </View>}
      </View>
      <OptionModal
        visible={modalVisible}
        onClose={closeModal}
        options={[{
          title: 'Remove from playlist',
          onPress: removeAudio
        }]}
        currentItem={selectedItem}
      />
    </>
  );
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width,
    height: height - 70,
    backgroundColor: '#001259',
    paddingTop: 16,
  },
  listContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default PlayListDetail;
