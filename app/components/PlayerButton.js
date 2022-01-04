import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons'

const PlayerButton = ({iconType, size, otherProps, iconColor, onPress}) => {
  const getIconName = (type) => {
    switch (type) {
      case 'PLAY':
        return 'pause'
      case 'PAUSE':
        return 'play'
      case 'NEXT':
        return 'fast-forward'
      case 'PREV':
        return 'fast-backward'
    }
  }
  return (
    <FontAwesome5 
      onPress={onPress} 
      name={getIconName(iconType)} 
      size={size} 
      color='#fff' 
      {...otherProps} 
      {...iconColor} 
    />
  );
}

const styles = StyleSheet.create({})

export default PlayerButton;
