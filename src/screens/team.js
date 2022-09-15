import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../config";
import { FlatList, View } from "react-native";
import { Card, ActivityIndicator, IconButton, Text } from "react-native-paper";

function TeamScreen() {

    const [teams, setTeams] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_API_URL}2022/constructors.json`)
        .then((response) => response.json())
        .then((json) => {
            
            setLoading(false);
            setTeams(json.MRData.ConstructorTable)
            
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
            <View style={{  flex:1 }}>
            {isLoading ? <ActivityIndicator size ='large' animating={true} color={'#ff0100'} 
            style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={teams.Constructors}
            keyExtractor={({ constructorId }, index) => constructorId}
            renderItem={({ item }) => (
                <Card mode="outlined" onPress={()=> {}}>
                        <Card.Title
                        title={item.name}
                        subtitle={`${item.nationality} Team`}
                        subtitleStyle={{fontSize: 15}}
                        right={(props) => <IconButton {...props} icon="chevron-right" />}
                        /> 

                </Card>
            )}
          />
        </View>
      )}
            </View>

    )
}

export default TeamScreen;