import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../config";
import { Text, FlatList, View } from "react-native";
import { Card, ActivityIndicator, IconButton } from 'react-native-paper';

function DriverScreen() {
    
    const [isLoading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetch(`${BASE_API_URL}2022/drivers.json`)
        .then((response) => response.json())
        .then((json) => setDrivers(json.MRData.DriverTable))
        .finally(() => setLoading(false))
    }
    , []);
    return (
        <View style={{flex:1 }}>
        {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
   ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

       <FlatList
         data={drivers.Drivers}
         keyExtractor={({ driverId }, index) => driverId}
         renderItem={({ item }) => (
             <Card mode="outlined" >
                     <Card.Title 
                       title={`${item.givenName} ${item.familyName}`}
                       titleStyle={{fontWeight: "bold"}}
                       left={(props) => <Text {...props} style={{fontWeight: "bold", fontSize: 25, color:"#ff0100"}}>{item.permanentNumber} </Text>   }
                       right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => {}} />}
                     />

                     {/*<DriverResult driver={item.driverId}/>*/}

             </Card>
         )}
       />
     </View>
   )}
        </View>
    )
}

export default DriverScreen;