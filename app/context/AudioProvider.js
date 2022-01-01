import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library'

export class AudioProvider extends Component {
  constructor(props){
    super(props)
  }

  getPermission = () => {
    Alert.alert('Permission Required', 'This app needs to read audio files!', [{
      text: 'I am ready',
      onPress: () => this.permissionAllert()
    }, {
      text: 'cancel',
      onPress: () => this.permissionAllert()
    }])
  }

  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    if(permission.granted){
      // we want to get all audio files
    }
    if(!permission.granted && permission.canAskAgain){
      const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
      if(status === 'denied' && canAskAgain){
        //we're gonna display alert that user must allow this permission to work this app
        this.permissionAllert()
      }
      if(status === 'granted'){
        //we wnat to get all audio files
      }
      if(!status === 'denied' && !canAskAgain){
        //we wanna display an error to user
      }
    }
  }

  componentDidMount(){
    getPermission()
  }

  render(){
    return(
      <View>
        <Text></Text>
      </View>
    )
  }
}

export default AudioProvider;