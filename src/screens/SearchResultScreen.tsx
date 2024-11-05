import React, {useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {OpenLibraryApi} from '../api/OpenLibraryApi.ts';
import {Section} from '../components/Section.tsx';
import {Book} from '../types/Book.ts';
import {getRouteName} from '../navigation/routes.ts';
import {ScrollViewDetectEnd} from '../components/ScrollViewDetectEnd.tsx';
import {styles} from './SearchResultScreen.styles.tsx';
import {NetworkErrorDialog} from '../components/NetworkErrorDialog.tsx';

/**
 * SearchResult Screen Component
 *
 * This component displays a list of books fetched from the OpenLibrary API based on a search query.
 * It supports pagination and navigates to a details screen when a book is selected.
 *
 * @param {object} props - The props object.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @returns {React.JSX.Element} - A React JSX element representing the search results screen.
 */
export const SearchResultScreen = ({navigation, route}: any) : React.JSX.Element => {
    const [books, setBooks] = useState<Array<Book>>([]);
    const [networkError, setNetworkError] = useState<any>(null);
    const [noMoreResults, setNoMoreResults] = useState(false);
    const [offset, setOffset] = useState(0);

    const limit = 10; // Number of items per page
    const { q } = route.params || {}; // The query string

    /**
     * Navigate to the details screen for a specific book.
     *
     * @param {Book} book - The Book.
     */
    const showDetails = (book: Book) => {
        navigation.navigate(getRouteName('details_page'), { book });
    };

    /**
     * Update the offset when the current view reaches the bottom of the scroll view.
     */
    const nextPage = () => {
        if (!noMoreResults) {
            setOffset(offset + limit);
        }
    };

    /**
     * When a network error occurs, go back to the search screen.
     */
    const unableToCompeteRequest = () => {
        setNetworkError(null);
        navigation.goBack();
    };

    /**
     * Load search results when the query or offset changes.
     */
    useEffect(() => {
        (async ()=> {
            try {
            const fetchedBooks = await OpenLibraryApi.searchBooks(q, offset, limit);
            if (fetchedBooks.length < limit) {
                // No more results
                setNoMoreResults(true);
            }
            setBooks(books.concat(fetchedBooks));
            } catch (error) {
                setNetworkError(error);
            }
        })();
    }, [q, offset]);

     return (
         <View>
             <ScrollViewDetectEnd onReachedBottom={nextPage} >
                 {books.map(book => (
                     <TouchableHighlight
                         key={book.olid}
                         onPress={() => showDetails(book) }
                     >
                         <Section document={ book } containerStyles={ styles.sectionContainer } />
                     </TouchableHighlight>
                 ))}
                 {noMoreResults ?
                     <View  style={{flex: 1, alignItems: 'center', paddingVertical: 10}}>
                         <Text>No more results.</Text>
                     </View> : null
                 }
             </ScrollViewDetectEnd>
             {networkError == null ? null : <NetworkErrorDialog onPress={() => unableToCompeteRequest()} /> }
         </View>
     );
};
