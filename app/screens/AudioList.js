import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import { AudioContext } from '../context/AudioProvider';

export class Audiolist extends Component{
  static contextType = AudioContext 
  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.context.audioFiles.map(
              item => <Text key={item.id} style={styles.textNameFile}>
                        {item.filename}
                      </Text>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100vh',
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
