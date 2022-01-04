import React, { Component } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av'
export class Audiolist extends Component {
  static contextType = AudioContext

  constructor(props) {
    super(props)
    this.state = {
      optionModalVisible: false,
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
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

  handleAudioPress = async (audio) => {
    //playing audio for the first time
    if (this.state.soundObj === null) {
      const playbackObj = new Audio.Sound()
      const status = await playbackObj.loadAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      )
      return this.setState({
        ...this.state,
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status
      })
    }
    //pause the audio
    if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
      const status = await this.state.playbackObj
      .setStatusAsync({shouldPlay: false})
      
      return this.setState({
        ...this.state,
        soundObj: status
      })
    }


    //resume the audio
    if(this.state.soundObj.isLoaded 
      && !this.state.soundObj.isPlaying 
      && this.state.currentAudio.id === audio.id){
        const status = await this.state.playbackObj.playAsync()
        
        alert(audio.id)
        return this.setState({
          ...this.state,
          soundObj: status
        })
    }

    if(this.state.soundObj.isLoaded 
      && !this.state.soundObj.isPlaying
      && this.state.currentAudio.id !== audio.id ){
        const playbackObj = new Audio.Sound()
        const status = await playbackObj.loadAsync(
          {uri: audio.uri},
          {shouldPlay: true}
        )
        
        return this.setState({
          ...this.state,
          currentAudio: audio,
          playbackObj: playbackObj,
          soundObj: status
        })
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
