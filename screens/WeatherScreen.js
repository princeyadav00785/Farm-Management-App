import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WeatherHome from './WeatherHome';
import Details from './Details';

const stack = createNativeStackNavigator();
const WeatherScreen = () => {
  return (
    <NavigationContainer independent={true}>
        <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name="Home" component={WeatherHome}/>
        <stack.Screen name="Details" component={Details} />
        </stack.Navigator>
    </NavigationContainer>
  )
}

export default WeatherScreen