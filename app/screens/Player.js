import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Player = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: '#f0f7da'}}>Player</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000039'
  }
})

export default Player;
