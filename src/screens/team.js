import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../config";
import { FlatList, View,TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function TeamScreen() {

    const [teams, setTeams] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigation()

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
            {/*Carousel Here*/}
            {isLoading ? <ActivityIndicator size ='large' animating={true} color={'#ff0100'} 
            style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 20 }} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={teams.Constructors}
            keyExtractor={({ constructorId }, index) => index}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('TeamInfo', { constructorId: item.constructorId, teamName: item.name})}>
                    <Card mode="outlined">
                        <Card.Title
                        title={item.name}
                        subtitle={`${item.nationality} Team`}
                        subtitleStyle={{fontSize: 15}}
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

export default TeamScreen;