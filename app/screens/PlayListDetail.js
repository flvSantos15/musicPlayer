import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions
} from 'react-native';
import AudioListItem from '../components/AudioListItem'
import { selectAudio } from '../misc/audioController'
import { AudioContext } from '../context/AudioProvider';

const PlayListDetail = props => {
  const context = useContext(AudioContext)
  const playList = props.route.params
  // console.log(props.route.params)
  
  const playAudio = async audio => {
    await selectAudio(audio, context, {
      activePlayList: playList,
      isPlayListRunning: true
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{playList.title}</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={playList.audios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={{ marginBottom: 8 }}>
            <AudioListItem
              title={item.filename}
              duration={item.duration}
              isPlaying={context.isPlaying}
              activeListItem={item.id === context.currentAudio.id}
              onAudioPress={() => playAudio(item)}
            />
          </View>}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: height - 70,
    backgroundColor: '#001259',
    paddingTop: 16,
  },
  listContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default PlayListDetail;
