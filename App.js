import React from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeScreen from "./scr/screens/home-screen"
import MovieDetailsScreen from './scr/screens/movie-details-screen';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='DetailScreen' component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>


  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
