import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../config";
import { FlatList, View } from "react-native";
import { Card, ActivityIndicator, IconButton } from "react-native-paper";
import Flag from "../data/flag";

function CircuitScreen() {
    const [circuits, setCircuits] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE_API_URL}2022/circuits.json`)
        .then((response) => response.json())
        .then((json) => setCircuits(json.MRData.CircuitTable))
        .finally(() => setLoading(false))
    }, []);
    return (
        <View style={{ flex:1 }} >
        {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
    ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

        <FlatList
          data={circuits.Circuits}
          keyExtractor={({ circuitId }, index) => circuitId}
          renderItem={({ item }) => (
              <Card mode="outlined">
                  <Card.Content>
                  <Card.Title 
                  title={item.circuitName}
                  titleStyle={{fontWeight: "bold"}}
                  left={(props) => <Flag {...props} country={item.Location.country}/>}
                  right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => {}} />}

                  />
                  
                  </Card.Content>
              </Card>
          )}
        />
      </View>
    )}
        </View>
    )

}


export default CircuitScreen;