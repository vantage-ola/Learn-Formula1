import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../config";
import { FlatList, View,TouchableOpacity } from "react-native";
import { Card, ActivityIndicator, IconButton, Text, DataTable } from "react-native-paper";
import Flag from "../../data/flag";

function ScheduleScreen() {

    const [schedule, setSchedule] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* function to convert date from api to  datestring */
    const Dateb = (newDate) => {
        const date = new Date(newDate).toLocaleDateString('en-us', { day:"numeric", month:"short", year:"numeric"  })
        return (
                <Text>
                    {date}
                </Text>
            )
    }

    useEffect(() => {
        fetch(`${BASE_API_URL}2022.json`)
        .then((response) => response.json())
        .then((json) => {
            
            setLoading(false);
            setSchedule(json.MRData.RaceTable)
            
            if (error) setError(null);
        })
        .catch((e) => {
            setLoading(false);
            setError("Connect to the Internet !");
        });   
    }
    , []);
    if (error) return <Text>ERROR: {error}</Text>;

    return (
        <View style={{ flex:1 }} >
        {isLoading ? <ActivityIndicator size ='large'animating={true} color={'#ff0100'} 
        style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

        <FlatList
          data={schedule.Races}
          keyExtractor={({ round }, index) => round}
          renderItem={({ item }) => (
     
              <Card mode="outlined">
                  <Card.Title 
                  title={item.raceName}
                  titleStyle={{fontWeight: "bold"}}
                  subtitle={item.Circuit.circuitName}
                  left={(props) => <Flag {...props} country={item.Circuit.Location.country}/>}
                  right={() => Dateb(item.date) }

                  />
              </Card>
          )}
        />
      </View>
    )}
        </View>
    );
   
}

export default ScheduleScreen