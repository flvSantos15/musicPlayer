import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <StatusBar status={true} color='#000039'/> */}
    </NavigationContainer>
  );
}
