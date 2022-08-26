import React, {useEffect, useState} from "react";
import axios from "axios";
import { Text, View, FlatList, StyleSheet} from 'react-native';

import { Button, Title, Paragraph, Card, ActivityIndicator } from "react-native-paper";
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import { Appbar, FAB } from 'react-native-paper';

function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [circuits, setCircuits] = useState([]);
    const [limit, setLimit] = useState(15);
 
    useEffect(() => fetchData(), []);
    //console.log(circuits)
    const fetchData = () => {
        const BASE_API_URL = 'http://ergast.com/api/f1/'

        const driverUrl = `${BASE_API_URL}drivers.json?limit=`+limit
        const teamUrl = `${BASE_API_URL}constructors.json?limit=`+limit
        const circuitUrl = `${BASE_API_URL}circuits.json?limit=`+limit

        const getDriver = axios.get(driverUrl)
        const getTeam = axios.get(teamUrl)
        const getCircuit = axios.get(circuitUrl)

        axios.all([getDriver, getTeam, getCircuit]).then(
            axios.spread((... allData) => {
                const driverData = allData[0].data
                const teamData = allData[1].data
                const circuitData = allData[2].data

                setLimit(limit + 30)

                setDrivers(driverData.MRData.DriverTable)
                setTeams(teamData.MRData.ConstructorTable)
                setCircuits(circuitData.MRData.CircuitTable)
            })
        )
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))

    }
    
    return (
    <View style={{flex: 1}}>
        <Appbar.Header>
            
            <Appbar.Content titleStyle={{fontWeight: "bold", fontSize: 25 }} title="{} Season" />
            <Appbar.Action label='Select year' icon="dots-vertical"onPress={() => {}} />
        </Appbar.Header>
      <Tabs
        // defaultIndex={0} // default = 0
        // uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
        
      >
        
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
        <Button onPress={fetchData}>Load More</Button>  
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
        <Button onPress={fetchData}>Load More</Button>
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
      <Button onPress={fetchData}>Load More</Button>
           </View>
        </TabScreen>
      </Tabs>
      </View>
    )
}


export default HomeScreen;