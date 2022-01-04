import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av'
import { play, pause, resume, playNext } from '../misc/audioController'
export class Audiolist extends Component {
  static contextType = AudioContext

  constructor(props) {
    super(props)
    this.state = {
      optionModalVisible: false,
    }

    this.currentItem = {

    }
  }

  layoutProvider = new LayoutProvider(
    (index) => 'audio',
    (type, dim) => {
      switch (type) {
        case 'audio':
          dim.width = Dimensions.get('window').width
          dim.height = 70
          break
        default:
          dim.width = 0
          dim.height = 0
      }

    })

  handleAudioPress = async audio => {
    const {playbackObj, soundObj, currentAudio, updateState} = this.context
    //playing audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      return updateState(
        this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status
      })
    }

    //pause the audio
    if(soundObj.isLoaded 
      && soundObj.isPlaying
      && currentAudio.id === audio.id) {
      const status = await pause(playbackObj)
      return updateState(
        this.context, {soundObj: status})
    }

    //resume the audio
    if(soundObj.isLoaded 
      && !soundObj.isPlaying 
      && currentAudio.id === audio.id){
        const status = await resume(playbackObj)
        return updateState(
          this.context, {soundObj: status})
    }

    //select another audio
    if(soundObj.isLoaded && currentAudio.id !== audio.id){
      const status = await playNext(playbackObj, audio.uri)
      updateState(
        this.context, {
          currentAudio: audio,
          soundObj: status
        }
      )
    }
  }
  

  rowRenderer = (type, item) => {
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item
          this.setState({ ...this.state, optionModalVisible: true })
        }}
      />
    )
  }

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
                onPlayPress={() => alert('Playing')}
                onPlayListPress={() => alert('PlayList')}
                currentItem={this.currentItem}
                onClose={() => {
                  this.setState({ ...this.state, optionModalVisible: false })
                }}
                visible={this.state.optionModalVisible}
              />
            </Screen>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 30,
    backgroundColor: '#000039',
  },
  textNameFile: {
    color: '#f0f7da',
    // color: '#002939',
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  }
})

export default Audiolist;
