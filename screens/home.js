import React, {useState} from "react";
import { View, Platform} from 'react-native';

import { Button } from "react-native-paper";
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import { Appbar } from 'react-native-paper';

import TeamScreen from "./team";
import CircuitScreen from "./circuit";
import DriverScreen from "./driver";

function HomeScreen() {
    
    const [year, setYear ] = useState(2022) // year season
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'; // change icon based on platform

    return (

    <View style={{flex: 1}}>

        {/* Header, contains title, edit and side bar button */}
        <Appbar.Header>
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />            
            <Appbar.Content titleStyle={{fontWeight: "bold", fontSize: 25 }} title={`${year} Season`} />
            <Button color="white" >Edit</Button>
        </Appbar.Header>

      {/* Tabs, contains swipeable rendered data*/}  
      <Tabs>
        
      <TabScreen label="Drivers">
            <DriverScreen/>
        </TabScreen>

        <TabScreen label="Teams">
            <TeamScreen/>
        </TabScreen>

        <TabScreen label="Circuits" >
            <CircuitScreen/>
        </TabScreen>
        
      </Tabs>
    </View>
    )
}


export default HomeScreen;