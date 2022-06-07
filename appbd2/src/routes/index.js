import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Driver from "../screens/Driver";
import Home from "../screens/Home";
import Passenger from "../screens/Passenger";
import Splash from "../screens/Splash"


const Stack = createNativeStackNavigator();


export default function AppRoutes() {

    return (

        <NavigationContainer>

            <Stack.Navigator >
                <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <Stack.Screen options={{ headerShown: false }} name="Driver" component={Driver} />
                <Stack.Screen options={{ headerShown: false }} name="Passenger" component={Passenger} />


            </Stack.Navigator>

        </NavigationContainer>
    )
}


