import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {routes} from './routes.ts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/**
 * AppNavigator Component
 *
 * This component sets up the navigation structure for the application using
 * React Navigation's native stack navigator. It wraps the stack navigator
 * in a NavigationContainer, which manages the navigation state.
 *
 * @returns {React.JSX.Element} The NavigationContainer with a stack navigator.
 */
export const AppNavigator = (): React.JSX.Element => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Search'}>
                {routes.map((route) => (
                    <Stack.Screen
                        key={ route.id }
                        name={ route.name }
                        component={ route.component }
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
