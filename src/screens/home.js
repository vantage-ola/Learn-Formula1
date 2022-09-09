import React, {useState} from "react";
import { View} from 'react-native';

import {Tabs, TabScreen} from 'react-native-paper-tabs';

import Header from "./header";
import TeamScreen from "./team";
import CircuitScreen from "./circuit";
import DriverScreen from "./driver";

function HomeScreen() {

    return (

    <View style={{flex: 1}}>

        <Header/>
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