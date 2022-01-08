import React from 'react';
import {
  View, 
  StyleSheet, 
  Modal, 
  FlatList, 
  Text, 
  Dimensions
} from 'react-native';
import AudioListItem from '../components/AudioListItem'

const PlayListDetail = ({visible, playList}) => {
  return (
    <Modal 
      visible={visible} 
      animationType='slide' 
      transparent
      // onRequestClose={onClose}
    >
        {/* <View style={styles.container}>
          <Text style={styles.title}>{playList.title}</Text>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={playList.audios}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => 
            <View style={{marginBottom: 8}}>
              <AudioListItem
                title={item.filename}
                duration={item.duration}
              
              />
            </View>}
          />
        </View> */}
        <View style={[
          StyleSheet.absoluteFillObject,
          styles.modalBg]}
        />
      
    </Modal>
  );
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    height: height - 150,
    width: width - 15,
    backgroundColor: '#fff',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    zIndex: 9,
    paddingTop: 16,
  },
  modalBg: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  listContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000180',
  },
})

export default PlayListDetail;
