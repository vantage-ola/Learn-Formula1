import React from "react";
import { View } from "react-native";
import {Appbar, Card,  Text, List} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const RaceResults = ({route}) => {

    const navigation = useNavigation()
    const { race, givenName, familyName, result } = route.params;
    
    return(
        <View style={{flex: 1}} >
        <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()}/>
        <Appbar.Content title={`${givenName} ${familyName} at ${result.raceName} ${result.season}`} />
        </Appbar.Header>
        <View>
        {race.map((r) =>
        <Card key={r.Driver.driverId}>
            <Card.Content>
                <List.Item title={`Points: ${r.points} pts`}/>
                <List.Item title={`Position: ${r.position}`}/>
                <List.Item title={`Laps: ${r.laps}`}/>
                <List.Item title={`Status: ${r.status}`}/>
                <List.Item title={`Time: ${r.Time?.time}`} />
                <List.Item title={`Average Speed: ${r.FastestLap?.AverageSpeed.speed} ${r.FastestLap?.AverageSpeed.units}`}/>
                <List.Item title={`Fastest Time : ${r.FastestLap?.Time.time} on Lap ${r.FastestLap?.lap}`}/>
            </Card.Content>

            </Card>
        )}
        </View>  
    </View>
    )

}

export default RaceResults;