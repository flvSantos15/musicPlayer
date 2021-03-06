import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'

import { Entypo, Ionicons } from '@expo/vector-icons';
import color from '../misc/color'

const convertTime = minutes => {
  if (minutes) {
    const hrs = minutes / 60
    const minute = hrs.toString().split('.')[0]
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2))
    const sec = Math.ceil((60 * percent) / 100)

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`
    }

    if (sec < 10) {
      return `${minute}:0${sec}`
    }

    return `${minute}:${sec}`
  }
}

const renderPlayPauseIcon = isPlaying => {
  if(isPlaying) return <Entypo name='controller-paus' size={24} color='#bc0b17'/>
  return <Entypo name='controller-play' size={24} color='#bc0b17'/>
}

const AudioListItem = ({ 
  title,
  duration, 
  onOptionPress,
  onAudioPress,
  isPlaying,
  activeListItem,
}) => {

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onAudioPress} style={{flex: 1}}>
          <View style={styles.leftContainer}>
            <View style={[styles.thumbnail, {
              backgroundColor: activeListItem ?
              '#fff' : '#dedede'
            }]}>
              <Text style={styles.thumbnailText}>
                {activeListItem 
                ? renderPlayPauseIcon(isPlaying)
                : <Ionicons name="musical-notes" size={24} color='#bc0b17' />
                }
              </Text>
            </View>

            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={[styles.titleContainerText, {
                color: activeListItem ?
                '#eeb119' : '#fff'
              }]}>
                {title}
              </Text>
              <Text style={[styles.timeText, {
                color: activeListItem ?
                '#eeb119' : '#fff'
              }]}>
                {convertTime(duration)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.rightContainer}>
          <Entypo
            onPress={onOptionPress}
            name="dots-three-vertical"
            size={20}
            color='#bc0b17'
            style={{ padding: 10, }}
          />
        </View>
      </View>
      <View style={styles.separated} />
    </>
  )
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 30,
    backgroundColor: '#003989',
    borderRadius: 6,
    padding: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.FONT,
  },
  titleContainer: {
    width: width - 140,
    paddingLeft: 10,
  },
  titleContainerText: {
    fontSize: 16,
    color: '#fff',
  },
  separated: {
    width: width - 30,
    backgroundColor: '#f6f6f6',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 2
  },
  timeText: {
    fontSize: 14,
    color: '#ddd',
  }
})

export default AudioListItem