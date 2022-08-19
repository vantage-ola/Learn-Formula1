import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { Button, Title, Paragraph } from "react-native-paper";
import {Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs';

function HomeScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
 
    console.log(data);

    useEffect(() => {
        fetch('http://ergast.com/api/f1/drivers.json')
          .then((response) => response.json())
          .then((json) => setData(json.MRData.DriverTable))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

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
           {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>

          <FlatList
            data={data.Drivers}
            keyExtractor={({ driverId }, index) => driverId}
            renderItem={({ item }) => (
              <Text>{item.givenName + ' ' + item.familyName}</Text>
            )}
          />
        </View>
      )}
           </View>
        </TabScreen>
      </Tabs>
    )
}


export default HomeScreen;