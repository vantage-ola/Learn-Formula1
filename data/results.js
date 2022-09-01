import React, {  useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

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
                    <Text>{item.raceName}</Text>
            )}
            />
        </View>
    )
}


export default DriverResult;