import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { Button, Title, Paragraph, Card, ActivityIndicator} from "react-native-paper";
import {Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs';

function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(15);
 
    console.log(data);
    useEffect(() => getData(), []);
    const getData =() => {
        fetch('http://ergast.com/api/f1/drivers.json?limit='+limit)
          .then((response) => response.json())
          .then((json) => {
            setLimit(limit + 30);
            setData(json.MRData.DriverTable)

          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      };

    return (
      <Tabs
        // defaultIndex={0} // default = 0
        // uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={false} // (default=false) disable swipe to left/right gestures
        
      >
        
        <TabScreen label="Teams">
        <View style={{  flex:1 }} />
        </TabScreen>
        <TabScreen label="Circuits" >
          <View style={{ flex:1 }} />
        </TabScreen>

        <TabScreen label="Drivers">
           <View style={{flex:1 }}>
           {isLoading ? <ActivityIndicator animating={true} color={'#ff0100'} /> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={data.Drivers}
            keyExtractor={({ driverId }, index) => driverId}
            renderItem={({ item }) => (
                <Card mode="outlined">
                    <Card.Content>
                        <Title>{item.givenName} <Text>{item.permanentNumber} </Text> </Title>
                        <Paragraph>{item.familyName} | {item.nationality} | {item.dateOfBirth}</Paragraph>
                    </Card.Content>
                </Card>
            )}
          />
        </View>
      )}
      <Button onPress={getData}>Load More</Button>
           </View>
        </TabScreen>
      </Tabs>
    )
}


export default HomeScreen;