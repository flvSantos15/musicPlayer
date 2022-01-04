import React from 'react';
import {View, StyleSheet, Text, StatusBar, Dimensions} from 'react-native';
import Screen from '../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';

const {width} = Dimensions.get('window')
const Player = () => {
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

          <View style={styles.audioControllers}>
            <View>
              <PlayerButton size={25} iconType='PREV'/>
            </View>
            <View style={styles.audioButtons}>
              <PlayerButton 
                onPress={() => {alert('playing')}} 
                size={40} 
                iconType='PLAY'/>
            </View>
            <View>
              <PlayerButton size={25} iconType='NEXT'/>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  audioControllers: {
    width: width - 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 18,
  },
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
  },
  audioButtons: {
    padding: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c02932',
  }
})

export default Player;
