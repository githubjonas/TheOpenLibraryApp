import React from 'react';
import {SearchScreen} from '../screens/SearchScreen.tsx';
import {SearchResultScreen} from '../screens/SearchResultScreen.tsx';
import {DetailsScreen} from '../screens/DetailsScreen.tsx';

/**
 * Represents a single route in the application.
 *
 * Each route includes an identifier, a name for display purposes,
 * and the component that should be rendered when navigating to this route.
 *
 * @interface Route
 * @property {string} id - A unique identifier for the route.
 * @property {string} name - The name of the route, typically used for display in navigation elements.
 * @property {React.ComponentType} component - The React component to render when the route is active.
 */
interface Route {
    id: string
    name: string
    component: React.ComponentType,
}

/**
 * An array of routes for the application, defining the available navigation paths.
 *
 * Each route object in the array conforms to the Route interface, specifying
 * the unique identifier, display name, and the component to be rendered.
 *
 * @type {Route[]}
 * @constant
 */
export const routes: Route[] = [
    {
        id: 'search',
        name: 'Search OpenLibrary',
        component: SearchScreen,
    },
    {
        id: 'search_result',
        name: 'Search Results',
        component: SearchResultScreen,
    },
    {
        id: 'details_page',
        name: 'Book details',
        component: DetailsScreen,
    },
];

/**
 * Retrieves a route from the routes array based on the provided ID.
 *
 * This function searches for a route that matches the specified ID
 * and returns the corresponding route object if found. If no matching
 * route is found, the function returns null.
 *
 * @param {string} id - The unique identifier of the route to retrieve.
 * @returns {Route | null} The route object if found, otherwise null.
 */
function getRouteById(id: string): Route | null {
    return routes.find(route => route.id === id) || null;
}

/**
 * Retrieves the name of a route given its ID.
 *
 * @param {string} id - The unique identifier of the route.
 * @returns {string} - The name of the route if found, otherwise an empty string.
 *
 */
export function getRouteName(id: string): string {
    const route = getRouteById(id);
    if (route) {
        return route.name;
    }

    return '';
}
