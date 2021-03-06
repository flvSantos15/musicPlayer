import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
// import { Audio } from 'expo-av'
import { play, pause, resume, playNext, selectAudio } from '../misc/audioController'
// import { storeAudioForNextOpening } from '../misc/helper'
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
  
  handleAudioPress = async audio => {
    await selectAudio(audio, this.context)

    // const {
    //   playbackObj, 
    //   soundObj, 
    //   currentAudio, 
    //   updateState,
    //   audioFiles,
    // } = this.context

    // //playing audio for the first time
    // if (soundObj === null) {
    //   const playbackObj = new Audio.Sound()
    //   const status = await play(playbackObj, audio.uri)
    //   const index = audioFiles.indexOf(audio)
    //   updateState(
    //     this.context, {
    //     currentAudio: audio,
    //     playbackObj: playbackObj,
    //     soundObj: status,
    //     isPlaying: true,
    //     currentAudioIndex: index,
    //   })
    //   playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate)
    //   return storeAudioForNextOpening(audio, index)
    // }

    // //pause the audio
    // if(soundObj.isLoaded 
    //   && soundObj.isPlaying
    //   && currentAudio.id === audio.id) {
    //   const status = await pause(playbackObj)
    //   return updateState(
    //     this.context, {
    //       soundObj: status,
    //       isPlaying: false
    //     })
    // }

    // //resume the audio
    // if(soundObj.isLoaded 
    //   && !soundObj.isPlaying 
    //   && currentAudio.id === audio.id){
    //     const status = await resume(playbackObj)
    //     return updateState(
    //       this.context, {
    //         soundObj: status,
    //         isPlaying: true
    //       })
    // }

    // //select another audio
    // if(soundObj.isLoaded && currentAudio.id !== audio.id){
    //   const status = await playNext(playbackObj, audio.uri)
    //   const index = audioFiles.indexOf(audio)
    //   updateState(
    //     this.context, {
    //       currentAudio: audio,
    //       soundObj: status,
    //       isPlaying: true,
    //       currentAudioIndex: index,
    //     }
    //   )
    //   return storeAudioForNextOpening(audio, index)
    // }
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

  navigateToPlaylist = () => {
    this.context.updateState(this.context, {
      addToPlayList: this.currentItem
    })
    this.props.navigation.navigate('PlayList')
    this.setState({ ...this.state, optionModalVisible: false })
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
                // onPlayPress={() => alert('playing')}
                // onPlayListPress={() => {
                //   this.context.updateState(this.context, {
                //     addToPlayList: this.currentItem
                //   })
                //   this.props.navigation.navigate('PlayList')
                //   this.setState({ ...this.state, optionModalVisible: false })
                // }}
                options={[{
                  title: 'Add to playlist', 
                  onPress: this.navigateToPlaylist
                }]}
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
