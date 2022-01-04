//play audio
export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(
      { uri },
      { shouldPlay: true }
    )
  }catch(error) {
    console.log('error inside play helper method', error.mensage)
  }
}

//pause audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync(
      {shouldPlay: false}
    )
  }catch(error) {
    console.log('error inside pause helper method', error.mensage)
  }
}

//resume audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.playAsync()
  }catch(error) {
    console.log('error inside resume helper method', erro.message)
  }
}

//select another audio
export const playAnother = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync(
      {uri},
      {shouldPlay: true}
    )
  }catch(error) {
    console.log('error inside playAnother helper method', erro.message)
  }
}