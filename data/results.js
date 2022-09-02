import React, {  useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity  } from "react-native";
import { Button } from "react-native-paper";
import Flag from "./flag";

function DriverResult({driver}) {

    const [result, setResult ] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://ergast.com/api/f1/drivers/${driver}/results.json`)
          .then((response) => response.json())
          .then((json) => setResult(json.MRData.RaceTable))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);
    return (
        <View>
            <FlatList
            data={result.Races}
            keyExtractor={({driverId }, index) => driverId} 
            renderItem={({item}) => (
                <TouchableOpacity >                  
                    <Button mode="contained" icon={() => <Flag country={item.Circuit.Location.country}/>}>{item.raceName}</Button>
                </TouchableOpacity>
            )}
            />
        </View>
    )
}


export default DriverResult;