import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av'
import { play, pause, resume, playNext } from '../misc/audioController'
import { storeAudioForNextOpening } from '../misc/helper'
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

    }
  )

  // onPlaybackStatusUpdate = async playbackStatus => {
  //   if(playbackStatus.isLoaded && playbackStatus.isPlaying){
  //     this.context.updateState(this.context, {
  //       playbackPosition: playbackStatus.positionMillis,
  //       playbackDuration: playbackStatus.durationMillis,
  //     })
  //   }
  //   /*
  //     Object {
  //       "androidImplementation": "SimpleExoPlayer",
  //       "didJustFinish": false,
  //       "durationMillis": 294948,
  //       "isBuffering": false,
  //       "isLoaded": true,
  //       "isLooping": false,
  //       "isMuted": false,
  //       "isPlaying": false,
  //       "playableDurationMillis": 68284,
  //       "positionMillis": 2091,
  //       "progressUpdateIntervalMillis": 500,
  //       "rate": 1,
  //       "shouldCorrectPitch": false,
  //       "shouldPlay": false,
  //       "uri": "/storage/emulated/0/Music/Tokyo Ghoul - Glassy Sky [東京喰種 -トーキョーグール-]_256k.mp3",
  //       "volume": 1,
  //     }
  //   */
    
  //   if(playbackStatus.didJustFinish){
  //     const nextAudioIndex = this.context.currentAudioIndex + 1
  //     //there's no next audio to play
  //     if(nextAudioIndex >= this.context.totalAudioCount){
  //       //parar o audio
  //       this.context.playbackObj.unloadAsync()
  //       //atualizo o status
  //       this.context.updateState(
  //         this.context, {
  //           soundObj: null,
  //           currentAudio: this.context.audioFiles[0],
  //           isPlaying: false,
  //           currentAudioIndex: 0,
  //           playbackPosition: null,
  //           playbackDuration: null,
  //         })
  //       return await storeAudioForNextOpening(this.context.audioFiles[0], 0)
  //     }
  //     //otherwise we wnat to select the next audio
  //     const audio = this.context.audioFiles[nextAudioIndex]
  //     const status = await playNext(this.context.playbackObj, audio.uri)
  //     this.context.updateState(
  //       this.context, {
  //         soundObj: status,
  //         currentAudio: audio,
  //         isPlaying: true,
  //         currentAudioIndex: nextAudioIndex,
  //       })
  //     await storeAudioForNextOpening(audio, nextAudioIndex)
  //   }
  // }
  
  handleAudioPress = async audio => {
    const {
      playbackObj, 
      soundObj, 
      currentAudio, 
      updateState,
      audioFiles,
    } = this.context

    //playing audio for the first time
    if (soundObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await play(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(
        this.context, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      })
      playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
      return storeAudioForNextOpening(audio, index)
    }

    //pause the audio
    if(soundObj.isLoaded 
      && soundObj.isPlaying
      && currentAudio.id === audio.id) {
      const status = await pause(playbackObj)
      return updateState(
        this.context, {
          soundObj: status,
          isPlaying: false
        })
    }

    //resume the audio
    if(soundObj.isLoaded 
      && !soundObj.isPlaying 
      && currentAudio.id === audio.id){
        const status = await resume(playbackObj)
        return updateState(
          this.context, {
            soundObj: status,
            isPlaying: true
          })
    }

    //select another audio
    if(soundObj.isLoaded && currentAudio.id !== audio.id){
      const status = await playNext(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(
        this.context, {
          currentAudio: audio,
          soundObj: status,
          isPlaying: true,
          currentAudioIndex: index,
        }
      )
      return storeAudioForNextOpening(audio, index)
    }
  }
  

  componentDidMount(){
    this.context.loadPreviousAudio()
  }

  rowRenderer = (type, item, index, extendedState) => {
    return (
      <AudioListItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
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
        {({ dataProvider, isPlaying }) => {
          if(!dataProvider._data.length)return null
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{isPlaying}}
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

export default Audiolist;
