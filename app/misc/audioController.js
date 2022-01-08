import { storeAudioForNextOpening } from '../misc/helper'
import { convertTime } from '../misc/helper'

//play audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(
      { uri },
      { shouldPlay: true,
        progressUpdateIntervalMillis: 1000
      }
    )
  } catch (error) {
    console.log('error inside play helper method', error.mensage)
  }
}

//pause audio
export const pause = async playbackObj => {
  try {
    return await playbackObj.setStatusAsync(
      { shouldPlay: false }
    )
  } catch (error) {
    console.log('error inside pause helper method', error.mensage)
  }
}

//resume audio
export const resume = async playbackObj => {
  try {
    return await playbackObj.playAsync()
  } catch (error) {
    console.log('error inside resume helper method', erro.message)
  }
}

//select another audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync()
    await playbackObj.unloadAsync()
    return await play(playbackObj, uri)
  } catch (error) {
    console.log('error inside playNext helper method', erro.message)
  }
}

export const selectAudio = async (audio, context) => {
  const {
    playbackObj,
    soundObj,
    currentAudio,
    updateState,
    audioFiles,
    onPlaybackStatusUpdate,
  } = context
  try {

    //playing audio for the first time
    if (soundObj === null) {
      const status = await play(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(
        context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      })
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
      return storeAudioForNextOpening(audio, index)
    }

    //pause the audio
    if (soundObj.isLoaded
      && soundObj.isPlaying
      && currentAudio.id === audio.id) {
      const status = await pause(playbackObj)
      return updateState(
        context, {
        soundObj: status,
        isPlaying: false
      })
    }

    //resume the audio
    if (soundObj.isLoaded
      && !soundObj.isPlaying
      && currentAudio.id === audio.id) {
      const status = await resume(playbackObj)
      return updateState(
        context, {
        soundObj: status,
        isPlaying: true
      })
    }

    //select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playbackObj, audio.uri)
      const index = audioFiles.indexOf(audio)
      updateState(
        context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      }
      )
      return storeAudioForNextOpening(audio, index)
    }
  } catch (error) {
    console.log('error inside selectAudio method', error.message)
  }
}

export const changeAudio = async (context, select) => {
  const {
    playbackObj,
    currentAudioIndex,
    totalAudioCount,
    audioFiles,
    updateState,
  } = context
  try {
    const { isLoaded } = await playbackObj.getStatusAsync()
    const isLastAudio =
      currentAudioIndex + 1 === totalAudioCount
    const isFirstAudio = 
      context.currentAudioIndex <= 0
    let audio
    let index
    let status

    //for next
    if (select === 'next') {
      audio = audioFiles[currentAudioIndex + 1]
      if (!isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1
        status = await play(playbackObj, audio.uri)
      }

      if (isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1
        status = await playNext(playbackObj, audio.uri)
      }

      if (isLastAudio) {
        index = 0
        audio = audioFiles[index]
        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri)
        } else {
          status = await play(playbackObj, audio.uri)
        }
      }
    }


    //for previous
    if (select === 'previous') {
      audio = audioFiles[currentAudioIndex - 1]
      if (!isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1
        status = await play(playbackObj, audio.uri)
      }

      if (isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1
        status = await playNext(playbackObj, audio.uri)
      }

      if (isFirstAudio) {
        index = totalAudioCount - 1
        audio = audioFiles[index]
        if (isLoaded) {
          status = await playNext(playbackObj, audio.uri)
        } else {
          status = await play(playbackObj, audio.uri)
        }
      }
    }




    updateState(
      context, {
      currentAudio: audio,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    }
    )
    storeAudioForNextOpening(audio, index)
  } catch (error) {
    console.log('error inside changeAudio method', error.message)
  }
}

export const renderCurrentTime = (context) => {
  const {playbackPosition} = context
  return convertTime(playbackPosition / 1000)
}

export const moveAudio = async (context, value) => {
  const {soundObj, isPlaying, playbackObj, updateState, playbackPosition} = context
  if (soundObj === null || !isPlaying) return

  try {
    const status = await playbackObj.setPositionAsync(
      Math.floor(soundObj.durationMillis * value)
    )
    
    await resume(playbackObj)
    
    updateState(context, {
      soundObj: status,
      playbackPosition: status.positionMillis
    })
  } catch (error) {
    console.log('error inside onSlidingComplete callback', error.message)
  }

}