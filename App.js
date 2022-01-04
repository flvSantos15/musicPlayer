import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation'
import { StatusBar } from 'react-native'
import AudioProvider from './app/context/AudioProvider';

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      
      <StatusBar 
        barStyle='dark-content'
        translucent={false}
        backgroundColor={'#fff'}
      />
    </AudioProvider>
  );
}
