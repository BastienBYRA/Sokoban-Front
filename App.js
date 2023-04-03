import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Board from './screens/Board';
import Admin from "./screens/Admin";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{title: 'Home'}}
                />
                <Stack.Screen
                    name="Board"
                    component={Board}
                    options={{title: 'Board'}}
                />
                <Stack.Screen
                    name="Admin"
                    component={Admin}
                    options={{title: 'Admin'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
