import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home';

import DriverResult from '../../data/results';
import PickYear from '../../data/year';
import TeamInfo from '../../data/teamInfo';
import RaceResults  from '../../data/driver';

const {Navigator, Screen} = createStackNavigator();
export default function Route(props) {
  return (
    <NavigationContainer>
         <Navigator
          {...props}
          screenOptions={{headerShown: false}}
          initialRouteName="HomeScreen">
   <Screen name="HomeScreen" component={HomeScreen} />
   <Screen name="DriverResult" component={DriverResult} options={({route})=> ({driverId: route.params.driverId, givenName: route.params.givenName, familyName: route.params.familyName})}/>
   <Screen name="PickYear" component={PickYear} />
   <Screen name="TeamInfo" component={TeamInfo} options={({route})=> ({constructorId: route.params.constructorId, teamName: route.params.teamName})}/>
   <Screen name="RaceResults" component={RaceResults} options={({route})=> ({race: route.params.race, givenName: route.params.givenName, familyName: route.params.familyName}) }/>

</Navigator>
      </NavigationContainer>
  )
}