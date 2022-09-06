import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

function TeamTab () {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
            <Stack.Screen
            name="Team"
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="Team Info"
            options={{ headerShown: false }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default TeamTab;