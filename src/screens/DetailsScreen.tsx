import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {OpenLibraryApi} from '../api/OpenLibraryApi.ts';
import {BookDetails} from '../types/BookDetails.ts';
import {Section} from '../components/Section.tsx';
import {styles} from './DetailsScreen.styles.tsx';
import {mapToDisplayableDetails} from '../utils/normalization.ts';
import {NetworkErrorDialog} from '../components/NetworkErrorDialog.tsx';

/**
 * DetailsScreen Component
 *
 * This screen displays detailed information about a specific book. It fetches
 * book details from the OpenLibrary API based on the `olid` passed via route parameters.
 * If there is a network error during the request, a network error dialog is shown.
 *
 * @param {object} props - The props for the DetailsScreen component.
 * @param {object} props.navigation - The navigation object provided by React Navigation.
 * @param {object} props.route - The route object provided by React Navigation.
 * @param {object} [props.route.params] - The parameters passed to the route.
 * @param {object} props.route.params.book - The book object passed to the route.
 * @returns {React.JSX.Element} - A React JSX element representing the details screen.
 *
 * @example
 * // Example usage in a React Navigation stack
 * <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
 */
export const DetailsScreen = ({navigation, route}: any): React.JSX.Element => {
    const [bookDetails, setBookDetails] = useState<BookDetails>();
    const [networkError, setNetworkError] = useState<any>(null);
    const { book } = route.params || {}; // The query string

    /**
     * Handles network errors by resetting the network error state and navigating back to the previous screen.
     */
    const unableToCompeteRequest = () => {
        setNetworkError(null);
        navigation.goBack();
    };

    useEffect(() => {
        (async ()=> {
            try {
                setBookDetails(await OpenLibraryApi.getBookDetails(book.olid));
            } catch (error) {
                setNetworkError(error);
            }
        })();
    }, []);

    let i = 0;
    return (
        <View>
            {bookDetails ?
                <ScrollView style={{backgroundColor: '#fff'}}>
                    <View style={styles.headerArea}>
                        <Section document={book} textStyles={styles.headerTextStyles} />
                    </View>
                    <View style={styles.detailsArea}>
                        {mapToDisplayableDetails(bookDetails).map(detail => (
                            (detail.value.length > 0 ?
                                <View key={i} style={{...styles.detail, backgroundColor: (i++ % 2 == 0 ? '#f0f8ff' : '#fff') }}>
                                    <View style={{flex: 5}}>
                                        <Text style={styles.title}>{detail.title}</Text>
                                    </View>
                                    <View style={{flex: 7}}>
                                        <Text style={styles.value}>{detail.value}</Text>
                                    </View>
                                </View> : null
                            )
                        ))}
                    </View>
                </ScrollView> : null}
            {networkError == null ? null : <NetworkErrorDialog onPress={() => unableToCompeteRequest()} /> }
        </View>
    );
};
