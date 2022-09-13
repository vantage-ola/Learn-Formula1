import React, {useState} from "react";
import { View, Text} from 'react-native';

import {Tabs, TabScreen} from 'react-native-paper-tabs';

import Header from "./header";
import TeamScreen from "./team";
import CircuitScreen from "./circuit";
import DriverScreen from "./driver";
import PickYear from "../../data/year";

function HomeScreen() {

    return (

    <View style={{flex: 1}}>

        <Header/>
      {/* Tabs, contains swipeable rendered data*/}  
      <Tabs mode="scrollable">
        
      <TabScreen label="Drivers">
            <DriverScreen/>
        </TabScreen>

        <TabScreen label="Teams">
            <TeamScreen/>
        </TabScreen>

        <TabScreen label="Circuits" >
            <CircuitScreen/>
        </TabScreen>

        <TabScreen label="Schedule">
            <Text>Schedule</Text>
        </TabScreen>
        

      </Tabs>
    </View>
    )
}


export default HomeScreen;