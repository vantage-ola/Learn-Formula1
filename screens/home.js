import React, {useEffect, useState} from "react";
import axios from "axios";
import { Text, View, FlatList, StyleSheet, Platform} from 'react-native';

import { Button, Title, Paragraph, Card, ActivityIndicator } from "react-native-paper";
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import { Appbar} from 'react-native-paper';



function HomeScreen() {
    
    const [isLoading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [circuits, setCircuits] = useState([]);
    const [year, setYear ] = useState(2022) // year season

    useEffect(() => fetchData(), []);
    //console.log(circuits)
    // Function to return data from the api
    const fetchData = () => {
        const BASE_API_URL = 'http://ergast.com/api/f1/'

        const driverUrl = `${BASE_API_URL}${year}/drivers.json?`
        const teamUrl = `${BASE_API_URL}${year}/constructors.json`
        const circuitUrl = `${BASE_API_URL}${year}/circuits.json`

        const getDriver = axios.get(driverUrl)
        const getTeam = axios.get(teamUrl)
        const getCircuit = axios.get(circuitUrl)

        axios.all([getDriver, getTeam, getCircuit]).then(  // using axios to  handle returning data thrice
            axios.spread((... allData) => {                // so it loads all of them to 'state' all at once

                const driverData = allData[0].data
                const teamData = allData[1].data
                const circuitData = allData[2].data

                setDrivers(driverData.MRData.DriverTable)
                setTeams(teamData.MRData.ConstructorTable)
                setCircuits(circuitData.MRData.CircuitTable)
            })
        )
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }
    
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
        
        <TabScreen label="Teams">
            <View style={{  flex:1 }}>
            {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={teams.Constructors}
            keyExtractor={({ constructorId }, index) => constructorId}
            renderItem={({ item }) => (
                <Card mode="outlined">
                    <Card.Content>
                        <Title>{item.name}</Title>
                        <Paragraph>{item.nationality}</Paragraph>
                    </Card.Content>
                </Card>
            )}
          />
        </View>
      )}
            </View>
        </TabScreen>

        <TabScreen label="Circuits" >
          <View style={{ flex:1 }} >
          {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={circuits.Circuits}
            keyExtractor={({ circuitId }, index) => circuitId}
            renderItem={({ item }) => (
                <Card mode="outlined">
                    <Card.Content>
                        <Title>{item.circuitName}</Title>
                        <Paragraph>{item.Location.country}</Paragraph>
                    </Card.Content>
                </Card>
            )}
          />
        </View>
      )}
          </View>
        </TabScreen>

        <TabScreen label="Drivers">
           <View style={{flex:1 }}>
           {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={drivers.Drivers}
            keyExtractor={({ driverId }, index) => driverId}
            renderItem={({ item }) => (
                <Card mode="outlined">
                    <Card.Content>
                        <Title>{item.givenName} <Text>{item.permanentNumber} </Text> </Title>
                        <Paragraph>{item.familyName} | {item.nationality} | {item.dateOfBirth}</Paragraph>
                    </Card.Content>
                </Card>
            )}
          />
        </View>
      )}
           </View>
        </TabScreen>
      </Tabs>
    </View>
    )
}


export default HomeScreen;