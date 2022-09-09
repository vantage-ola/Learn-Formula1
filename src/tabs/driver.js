import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DriverScreen from "../screens/driver";

const Stack = createStackNavigator();

function DriverTab () {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
            <Stack.Screen
            name="Drivers"
            options={{ headerShown: false }}
            component={DriverScreen}
            />
            <Stack.Screen
            name="Driver Info"
            options={{ headerShown: false }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default DriverTab;