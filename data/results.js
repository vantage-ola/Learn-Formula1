import React, {  useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import {Appbar, Card , IconButton, Text, List} from "react-native-paper";
import Flag from "./flag";

import axios from "axios";
import { BASE_API_URL } from "../config";

import { useNavigation } from "@react-navigation/native";

import gold from "../assets/gold-medal.png";
import silver from '../assets/silver-medal.png';
import bronze from '../assets/bronze-medal.png';

function DriverResult({route}) {

    const [result, setResult ] = useState([]);
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')
    const [third, setThird] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { driverId, givenName, familyName } = route.params;

    const navigation = useNavigation()
    useEffect(() => fetchData(), []);

    const fetchData =() => {
        const DriverResult = `${BASE_API_URL}2022/drivers/${driverId}/results.json`
        const Driver1st = `${BASE_API_URL}2022/drivers/${driverId}/results/1.json`
        const Driver2nd = `${BASE_API_URL}2022/drivers/${driverId}/results/2.json`
        const Driver3rd = `${BASE_API_URL}2022/drivers/${driverId}/results/3.json`

        const getDriverResult = axios.get(DriverResult)
        const getDriver1st = axios.get(Driver1st)
        const getDriver2nd = axios.get(Driver2nd)
        const getDriver3rd = axios.get(Driver3rd)
        
        axios.all([getDriverResult, getDriver1st, getDriver2nd, getDriver3rd]).then(
            axios.spread((... allData) => {
                const driverResult = allData[0].data
                const driver1st = allData[1].data
                const driver2nd= allData[2].data
                const driver3rd = allData[3].data
                
                setLoading(false);
                setResult(driverResult.MRData.RaceTable)
                setFirst(driver1st.MRData.total)
                setSecond(driver2nd.MRData.total)
                setThird(driver3rd.MRData.total)

                if (error) setError(null)

            })

        )
        .catch((e) => {
            setLoading(false);
            setError("Connect to the Internet !");
        });
        }
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'space-between',  
                alignItems: "center", 
                justifyContent: "center", 
                flexDirection: 'row' 
            },
            content: {
                width: 45, 
                height: 45, 
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 10

            },
            number: {
                justifyContent: 'space-between',
                alignItems: "center", 
                justifyContent: "center", 
                flexDirection: 'row' 
            },
            content2: {
                fontSize: 20,
                fontWeight: "bold",
                marginHorizontal: 38,
                marginBottom: 10,
                color: '#ff0100'

            } 

        })
    if (error) return <Text>ERROR: {error}</Text>;


    return (
        
        <View style={{flex: 1}} >
            <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()}/>
            <Appbar.Content title={`${givenName} ${familyName}`} />
            </Appbar.Header>
            <Card>
        <View  style={styles.container}>
                <Image source={gold} style={styles.content}/>
                
                <Image source={silver}  style={styles.content}/>
                
                <Image source={bronze}  style={styles.content}/>

        </View>
        <View style={styles.number}>
        <Text style={styles.content2}>{first}</Text>                

        <Text style={styles.content2}>{second}</Text>

        <Text style={styles.content2}>{third}</Text>

        </View>

            </Card>
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