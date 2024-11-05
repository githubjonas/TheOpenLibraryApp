import React from 'react';
import {AppNavigator} from "./src/navigation/AppNavigator.tsx";

/**
 * The main entry point of the application.
 *
 * This component initializes the app by rendering the main application navigator.
 * The AppNavigator is responsible for managing the application's navigation
 * structure and routing logic.
 *
 * @returns {React.JSX.Element} The rendered application navigator component.
 *
 */
export default function App(): React.JSX.Element {
  return <AppNavigator />;
}
