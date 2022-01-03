import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native'

import { Entypo, Ionicons } from '@expo/vector-icons';
import color from '../misc/color'

const getThumbnailText = filename => filename[0]

const convertTime = minutes => {
  if(minutes){
    const hrs = minutes/60
    const minute = hrs.toString().split('.')[0]
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2))
    const sec = Math.ceil((60 * percent) / 100)

    if(parseInt(minute) < 10 && sec < 10){
      return `0${minute}:0${sec}`
    }

    if(parseInt(minute) < 10){
      return `0${minute}:${sec}`
    }

    if(sec < 10){
      return `${minute}:0${sec}`
    }

    return `${minute}:${sec}`
  }
}

const AudioListItem = ({title, duration, onOptionPress}) => {
  return(
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>
              {/* {getThumbnailText(title)} */}
              <Ionicons name="musical-notes" size={24} color="black" />
            </Text>
          </View>

          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.titleContainerText}>
              {title}
            </Text>
            <Text style={styles.timeText}>
              {convertTime(duration)}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Entypo 
            onPress={onOptionPress}
            name="dots-three-vertical" 
            size={20}
            color='#fff' />
        </View>
      </View>
      <View style={styles.separated}/>
    </>
  )
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width - 30,
    backgroundColor: '#000189',
    borderRadius: 6,
    padding: 4,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    flexBasis: 30,
    backgroundColor: '#000185',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
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
    width: width - 180,
    paddingLeft: 10,
  },
  titleContainerText: {
    fontSize: 16,
    color: '#fff',
  },
  separated: {
    width: width - 50,
    backgroundColor: '#333',
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10
  },
  timeText: {
    fontSize: 14,
    color: '#ddd',
  }
})

export default AudioListItem