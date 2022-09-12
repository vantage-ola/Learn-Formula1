import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../config";
import { FlatList, View, TouchableOpacity } from "react-native";
import { Card, ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


function DriverScreen() {

    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(true);
    const [drivers, setDrivers] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`${BASE_API_URL}2022/drivers.json`)
        .then((response) => response.json())
        .then((json) => {
            
            setLoading(false);
            setDrivers(json.MRData.DriverTable)
            
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
        
        <View style={{flex:1 }}>
        {isLoading ? <ActivityIndicator size ='large' animating={true} color={'#ff0100'} 
        style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
   ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

       <FlatList
         data={drivers.Drivers}
         keyExtractor={({ driverId }, index) => driverId}
         renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DriverResult', { driverId: item.driverId})}>
             <Card mode="outlined" >
                     <Card.Title 
                       title={`${item.givenName} ${item.familyName}`}
                       titleStyle={{fontWeight: "bold"}}
                       left={(props) => <Text {...props} style={{fontWeight: "bold", fontSize: 25, color:"#ff0100"}}>{item.permanentNumber} </Text>   }
                       right={(props) => <IconButton {...props} icon="chevron-right" />}
                       />
             </Card>
            </TouchableOpacity>
         )}
       />
     </View>
   )}
   
        </View>
    );
    
    
}

export default DriverScreen;