import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Audiolist from '../screens/AudioList';
import Player from '../screens/Player';
import Playlist from '../screens/PlayList';
import PlayListDetail from '../screens/PlayListDetail'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const PlayListScreen = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PlayList" component={Playlist}/>
      <Stack.Screen name="PlayListDetail" component={PlayListDetail}/>
    </Stack.Navigator>
  )
}

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
        name={'PlayListNav'} 
        component={PlayListScreen}
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
