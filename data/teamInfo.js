import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../config"
import { FlatList, View , ActivityIndicator} from "react-native";
import { Card,Text, List, Appbar} from "react-native-paper";
import Flag from "./flag";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";

function TeamInfo({route}) {

    const [teamDriver, setTeamDriver] = useState([])
    const [teamDriverResult, setTeamDriverResult] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { constructorId, teamName } = route.params;
    const navigation = useNavigation()


    useEffect(() => fetchData(), []);
    
    const fetchData =() => {

        const teamInfo = `${BASE_API_URL}2022/constructors/${constructorId}/drivers.json`
        const driverInfo = `${BASE_API_URL}2022/constructors/${constructorId}/results.json`

        const getTeamData = axios.get(teamInfo)
        const getdriverInfo = axios.get(driverInfo)

        axios.all([getTeamData, getdriverInfo]).then(
            axios.spread((... allData) => {
                const teamD = allData[0].data
                const driverD  = allData[1].data

                setLoading(false);
                setTeamDriver(teamD.MRData.DriverTable)
                setTeamDriverResult(driverD.MRData.RaceTable)
                if (error) setError(null)

            })

        )
        .catch((e) => {
            setLoading(false);
            setError("Connect to the Internet !");
        });
        }
    if (error) return <Text>ERROR: {error}</Text>;
    console.log(teamDriverResult)
    return (
            <View style={{  flex:1 }}>
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content title={teamName} />
            </Appbar.Header>
            {isLoading ? <ActivityIndicator  animating={true} color={'#ff0100'} 
            style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <FlatList 
        data={teamDriverResult.Races}
        keyExtractor={(item)=> item.round}
        renderItem={({item}) => (
            <Card>
                                <List.Accordion title={`${item.raceName}`} 
                                subtitle={`${item.Circuit.Location.locality}, ${item.Circuit.Location.country}`}
                                left={(props) => <Flag{...props} country={item.Circuit.Location.country}/>}>
                {item.Results.map((s) => 
                                <List.AccordionGroup key={s.Driver.driverId} >
                                <List.Accordion title={`${s.Driver.givenName} ${s.Driver.familyName}`} 
                                id={s.Driver.driverId}
                                titleStyle={{fontWeight: "bold"}}
                                left={(props) => <Text {...props} style={{fontWeight: "bold", fontSize: 25, color:"#ff0100"}}>{s.Driver.permanentNumber} </Text>   }>
                                    <List.Item title={`Points: ${s.points} pts`}/>
                                    <List.Item title={`Position: ${s.position}`}/>
                                    <List.Item title={`Laps: ${s.laps}`}/>
                                    <List.Item title={`Status: ${s.status}`}/>
                                    <List.Item title={`Time: ${s.Time?.time}`} />
                                    <List.Item title={`Average Speed: ${s.FastestLap?.AverageSpeed.speed} ${s.FastestLap?.AverageSpeed.units}`}/>
                                    <List.Item title={`Fastest Time : ${s.FastestLap?.Time.time} on Lap ${s.FastestLap?.lap}`}/>
                                </List.Accordion>
                            </List.AccordionGroup>
                )}
                </List.Accordion>
            </Card>



        )}
        />
        </View>
      )}
            </View>

    )
}

export default TeamInfo;