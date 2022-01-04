import React from 'react';
import {View, StyleSheet, Text, StatusBar, Dimensions} from 'react-native';
import Screen from '../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider';

const Player = () => {
  const {width} = Dimensions.get('window')
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>
          1 / 99
        </Text>

        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons name="music-circle" size={300} color='#f6f6f6' />
        </View>

        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>Audio File Name</Text>
          <Slider
            style={{
              width: width,
              height: 40,
              alignSelf: 'center',
            }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor='#eeb117'
            maximumTrackTintColor='#fff'            
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#001259'
  },
  audioCount: {
    textAlign: 'right',
    padding: 15,
    color: '#fff',
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 16,
    color: '#fff',
    padding: 15,
  }
})

export default Player;
