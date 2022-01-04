import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';

const Playlist = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: '#f0f7da'}}>Play List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#001259'
  }
})

export default Playlist;
