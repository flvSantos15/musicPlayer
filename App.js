import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigation'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar 
        barStyle='light-content'
        translucent={true}
        backgroundColor={'#000039'}
      />
    </>
  );
}
