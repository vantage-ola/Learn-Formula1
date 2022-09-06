import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

function CircuitTab () {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
            <Stack.Screen
            name="Circuit"
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="Circuit Info"
            options={{ headerShown: false }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default CircuitTab;