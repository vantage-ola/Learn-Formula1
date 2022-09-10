import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import DriverResult from '../../data/results';

const {Navigator, Screen} = createStackNavigator();
export default function Route(props) {
  return (
    <NavigationContainer>
         <Navigator
          {...props}
          screenOptions={{headerShown: false}}
          initialRouteName="HomeScreen">
   <Screen name="HomeScreen" component={HomeScreen} />
   <Screen name="DriverResult" component={DriverResult} options={({route})=> ({driverId: route.params.driverId})}/>

</Navigator>
      </NavigationContainer>
  )
}