import React, {  useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import {Appbar, Card , IconButton, Text, List} from "react-native-paper";
import Flag from "./flag";

import axios from "axios";
import { BASE_API_URL } from "../config";

import { useNavigation } from "@react-navigation/native";

function DriverResult({route}) {

    const [result, setResult ] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { driverId, givenName, familyName } = route.params;

    const navigation = useNavigation()
    useEffect(() => fetchData(), []);

    const fetchData =() => {
        const DriverResult = `${BASE_API_URL}2022/drivers/${driverId}/results.json`
        const getDriverResult = axios.get(DriverResult)
        axios.all([getDriverResult]).then(
            axios.spread((... allData) => {
                const driverResult = allData[0].data

                setLoading(false);
                setResult(driverResult.MRData.RaceTable)

                if (error) setError(null)

            })

        )
        .catch((e) => {
            setLoading(false);
            setError("Connect to the Internet !");
        });
        }
    if (error) return <Text>ERROR: {error}</Text>;

    return (
        
        <View style={{flex: 1}} >
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content title={`${givenName} ${familyName}`} />
            </Appbar.Header>
            {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} 
            style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
            <FlatList
            data={result.Races}
            keyExtractor={({driverId }, item) => item} 
            renderItem={({item}) => (
            <TouchableOpacity onPress={() => {navigation.navigate('RaceResults', {race: item.Results, givenName: givenName, familyName: familyName, result: item})}}>
                <Card mode="outlined">
                  <Card.Title 
                  title={item.raceName}
                  titleStyle={{fontWeight: "bold"}}
                  left={(props) => <Flag {...props} country={item.Circuit.Location.country}/>}
                  right={(props) => <IconButton {...props} icon="chevron-right" />}

                  />
                </Card>
            </TouchableOpacity>

            )}
            />
            </View>
    )}
    </View>
    )
    
}


export default DriverResult;