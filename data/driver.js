import React from "react";
import { View } from "react-native";
import {Appbar,  Text, List} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


const RaceResults = ({route}) => {

    const navigation = useNavigation()
    const { race, givenName, familyName } = route.params;
    console.log(race)
    return(
        <View style={{flex: 1}} >
        <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()}/>
        <Appbar.Content title={`${givenName} ${familyName}`} />
        </Appbar.Header>
        <View>
        {race.map((r) =>
                                        <List.AccordionGroup key={r.Driver.driverId} >
                                        <List.Accordion title={`${r.Driver.givenName} ${r.Driver.familyName}`} 
                                        id={r.Driver.driverId}
                                        titleStyle={{fontWeight: "bold"}}
                                        left={(props) => <Text {...props} style={{fontWeight: "bold", fontSize: 25, color:"#ff0100"}}>{r.Driver.permanentNumber} </Text>   }>
                                            <List.Item title={`Points: ${r.points} pts`}/>
                                            <List.Item title={`Position: ${r.position}`}/>
                                            <List.Item title={`Laps: ${r.laps}`}/>
                                            <List.Item title={`Status: ${r.status}`}/>
                                            <List.Item title={`Time: ${r.Time?.time}`} />
                                            <List.Item title={`Average Speed: ${r.FastestLap?.AverageSpeed.speed} ${r.FastestLap?.AverageSpeed.units}`}/>
                                            <List.Item title={`Fastest Time : ${r.FastestLap?.Time.time} on Lap ${r.FastestLap?.lap}`}/>
                                        </List.Accordion>
                                    </List.AccordionGroup>
        )}
        </View>  
    </View>
    )

}

export default RaceResults;