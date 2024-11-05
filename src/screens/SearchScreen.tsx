import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {getRouteName} from '../navigation/routes.ts';
import {SearchTextField} from '../components/SearchTextField.tsx';
import {getSearchHistory} from '../utils/storage.ts';
import {NetworkStatus} from '../components/NetworkStatus.tsx';

/**
 * Search Screen Component
 *
 * This component allows users to perform a search using a text input field and displays a list of past search history.
 * Users can tap on a past search to perform that search again or submit a new search query.
 *
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {React.JSX.Element} - A React JSX element representing the search screen.
 */
export const SearchScreen = ({navigation}: any): React.JSX.Element => {
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    /**
     * Navigates to the search results screen with the provided query.
     *
     * @param {string} q - The search query string.
     */
    const doSearch = (q: string) => {
        navigation.navigate(getRouteName('search_result'), { q });
    };

    /**
     * (Re-)load the search history when the component is visible
     */
    useEffect(() => {
        return navigation.addListener('focus', () => {
          (async () => {
            setSearchHistory(await getSearchHistory());
          })();
        });
    }, [navigation]);

    return (
        <View style={{flex: 1}}>
            <NetworkStatus />
            <SearchTextField onSubmit={ (q) => doSearch(q) } />
            {searchHistory.map(searchString => (
                <Button
                    key={searchString}
                    title={searchString}
                    onPress={ () => doSearch(searchString) }
                />
            ))}
        </View>
    );
};
