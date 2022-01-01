import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

import Audiolist from '../screens/AudioList';
import Player from '../screens/Player';
import Playlist from '../screens/PlayList';

const Tab = createBottomTabNavigator()
const AppNavigator = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen 
        name={'AudioList'} 
        component={Audiolist} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='headset' size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name={'Player'} 
        component={Player}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name='compact-disc' size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name={'PlayList'} 
        component={Playlist}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='library-music' size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator;
