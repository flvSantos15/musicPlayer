import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
} from 'react-native';
import PlayListInputModal from '../components/PlayListInputModal';
import { AudioContext } from '../context/AudioProvider';
import PlayListDetail from '../components/PlayListDetail'

let selectedPlayList = {}
const Playlist = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [showPlayList, setShowPlayList] = useState(false)

  const context = useContext(AudioContext)
  const { playList, addToPlayList, updateState } = context

  const createPlayList = async playListName => {
    //vou no storage e pego o q tem la
    const result = await AsyncStorage.getItem('playlist')
    //se tiver algo
    if(result !== null){
      //crio um array vazio
      const audios = []
      //se addToPlayList estiver vazio
      //pq é o valor dele no provider
      if(addToPlayList){
        //vou add no array
        audios.push(addToPlayList)
      }
      //crio uma nv list
      //com valores q preciso
      const newList = {
        id: Date.now(),
        title: playListName,
        audios: audios
      }
      //crio um array de objects
      //um array com as playlists
      //faço um spread pra adicionar
      //sem alterar as listas anteriores
      const updatedList = [
        ...playList, newList ]

      updateState(context, {
        addToPlayList: null, playList: updatedList })

      await AsyncStorage.setItem('playlist', JSON.stringify(updatedList))
    }
    setModalVisible(false)
  }

  const renderPlayList = async () => {
    const result = await AsyncStorage.getItem('playlist')
    if(result === null){
      const defaultPlayList = {
        id: Date.now(),
        title: 'My Favorite',
        audios: []
      }
      const newPlayList = [
        ...playList, defaultPlayList,]

      updateState(context, {
        playList: [...newPlayList]})

      return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlayList]))
    }
    updateState(context, 
      {playList: JSON.parse(result)})
  }

  useEffect(() => {
    if(!playList.length){
      renderPlayList()
    }
  }, [])

  const handleBannerPress = async playList => {
    //update playlist if there's any selected audio
    if(addToPlayList){
      const result = await AsyncStorage.getItem('playlist')
      let oldList = []
      let updatedList = []
      let sameAudio = false

      if(result !== null){
        oldList = JSON.parse(result)
        
        updatedList = oldList.filter(list => {
          if(list.id === playList.id){
            // check if that same audio is already inside our list or not
            for(let audio of list.audios){
              if(audio.id === addToPlayList.id){
                //alert with message
                sameAudio = true
                return
              }
            }
            //update the playlist if there's any selected audio
            list.audios = [...list.audios, addToPlayList]
          }
          return list
        })
      }
      if(sameAudio){
        Alert.alert('Audio encontrado!', 
        `${addToPlayList.filename} já foi adicionado na lista!`)
        sameAudio = false
        return updateState(context, {addToPlayList: null})
      }
      updateState(context, {addToPlayList: null, 
        playList: [...updatedList]})
      return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]))
    }
    //if there's no selected audio then open the list
    selectedPlayList = playList

    setShowPlayList(true)
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        

        {playList.length 
          ? playList.map(item => (
            <TouchableOpacity 
              key={item.id.toString()} 
              style={styles.playListBanner}
              onPress={() => handleBannerPress(item)}
            >
              <Text>{item.title}</Text>
              <Text style={styles.audioCount}>
                {item.audios.length > 1 
                ? `${item.audios.length} Songs` 
                : `${item.audios.length} Song`}
              </Text>
            </TouchableOpacity>
            )) 
          : null}

        <TouchableOpacity 
          style={{marginTop: 15}}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.playListBtn}> + Add New Playlist</Text>
        </TouchableOpacity>

        <PlayListInputModal 
          visible={modalVisible} 
          onClose={() => {setModalVisible(false)}}
          onSubmit={createPlayList}
        />
      </ScrollView>
      <PlayListDetail
        visible={showPlayList}
        playList={selectedPlayList}
        onClose={() => setShowPlayList(false)}
      />
    </>
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
    marginBottom: 20,
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
