import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Dimensions } from 'react-native';
import Screen from '../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import { AudioContext } from '../context/AudioProvider';
import { selectAudio, changeAudio, pause, resume, moveAudio, } from '../misc/audioController'
import { convertTime } from '../misc/helper';

const { width } = Dimensions.get('window')

const Player = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const context = useContext(AudioContext)
  const { playbackPosition, playbackDuration } = context

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration
    }
    return 0
  }

  useEffect(() => {
    context.loadPreviousAudio()
  }, [])

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio, context)
  }

  const handleNext = async () => {
    await changeAudio(context, 'next')
  }

  const handlePrevious = async () => {
    await changeAudio(context, 'previous')
  }

  const renderCurrentTime = () => {
    return convertTime(context.playbackPosition / 1000)
  }

  if (!context.currentAudio) return null

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>
          {`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}
        </Text>

        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={context.isPlaying ? '#eeb117' : '#ddd'} />
        </View>

        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {context.currentAudio.filename}
          </Text>

          <View style={styles.timeSeebBar}>
            <Text style={styles.timeText}>
              {
                currentPosition
                  ? currentPosition
                  : renderCurrentTime()
              }
            </Text>

            <Slider
              style={{
                width: width - 100,
                height: 40,
                alignSelf: 'center',
              }}
              minimumValue={0}
              maximumValue={1}
              value={calculateSeebBar()}
              minimumTrackTintColor='#eeb117'
              maximumTrackTintColor='#fff'
              onValueChange={value => {
                setCurrentPosition(
                  convertTime(value * context.currentAudio.duration)
                )
              }}
              onSlidingStart={
                async () => {
                  if (!context.isPlaying) return
                  try {
                    await pause(context.playbackObj)
                  } catch (err) {
                    console.log('error inside onSlidingStart callback', err.message)
                  }
                }
              }
              onSlidingComplete={async value => {
                await moveAudio(context, value)
                setCurrentPosition(0)
              }}
            />

            <Text style={styles.timeText}>
              {convertTime(context.currentAudio.duration)}
            </Text>
          </View>

          <View style={styles.audioControllers}>
            <View>
              <PlayerButton
                size={25}
                iconType='PREV'
                onPress={handlePrevious}
              />
            </View>
            <View style={styles.audioButtons}>
              <PlayerButton
                onPress={handlePlayPause}
                size={40}
                iconType={context.isPlaying ? 'PLAY' : 'PAUSE'} />
            </View>
            <View>
              <PlayerButton
                size={25}
                iconType='NEXT'
                onPress={handleNext}
              />
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
    paddingBottom: 10,
  },
  container: {
    flex: 1,
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
    padding: 10,
  },
  audioButtons: {
    paddingLeft: 4,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c02932',
  },
  audioPlayerContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: width,
  },
  timeSeebBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 40,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  timeText: {
    fontSize: 14,
    color: '#ddd',
  },
})

export default Player;
