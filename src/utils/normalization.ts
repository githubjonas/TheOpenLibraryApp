import {OpenLibraryDoc} from '../types/OpenLibraryDoc.ts';
import {Book} from '../types/Book.ts';
import {OpenLibraryWork} from '../types/OpenLibraryWork.ts';
import {BookDetails} from '../types/BookDetails.ts';
import {DisplayableBookDetail} from '../types/DisplayableBookDetail.ts';

/**
 * Normalizes a single API response item into a `Book` object.
 *
 * @param {OpenLibraryDoc} doc - The raw API response document to be normalized.
 * @returns {Book} - A normalized `Book` object containing essential information.
 */
export const normalizeBookData = (doc: OpenLibraryDoc): Book => {
    return {
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown Author',
        olid: doc.cover_edition_key ? doc.cover_edition_key :
            (doc.edition_key && doc.edition_key.length > 0 ? doc.edition_key[0] : ''),
        firstPublishedYear: doc.first_publish_year || null,
        workId: doc.key.replace('/works/', ''), // Extract the ID from the work key
    };
};

/**
 * Normalizes an OpenLibrary work response into a `BookDetails` object.
 *
 * @param {OpenLibraryWork} work - The raw OpenLibrary work data to be normalized.
 * @returns {BookDetails} - A `BookDetails` object containing detailed book information.
 */
export const normalizeBookWorkData = (work: OpenLibraryWork): BookDetails => {
    return {
        title: work.title,
        firstSentence: work.first_sentence ? work.first_sentence.value : '',
        isbn: work.isbn_13 ? work.isbn_13.join(', ') : (work.isbn_10 ? work.isbn_10.join(', ') : ''),
        numberOfPages: work.number_of_pages ?? 0,
        physicalFormat: work.physical_format ?? '-',
        publishDateString: work.publish_date,
        publishers: work.publishers ? work.publishers.join(', ') : '',
    };
};

/**
 * Normalizes the response from the OpenLibrary search API into an array of `Book` objects.
 *
 * @param {object} response - The raw API response containing an array of documents.
 * @param {OpenLibraryDoc[]} response.docs - The array of raw API response documents.
 * @returns {Book[]} - An array of normalized `Book` objects.
 */
export const normalizeSearchApiResponse = (response: { docs: OpenLibraryDoc[] }): Book[] => {
    return response.docs.map(normalizeBookData);
};

/**
 * Maps `BookDetails` to an array of `DisplayableBookDetail` for displaying detailed information.
 *
 * @param {BookDetails} bookDetails - The `BookDetails` object to map.
 * @returns {DisplayableBookDetail[]} - An array of `DisplayableBookDetail` objects, each containing a title and value.
 */
export const mapToDisplayableDetails = (bookDetails: BookDetails): DisplayableBookDetail[] => {
    return [
        {title: 'Full Title', value: bookDetails.title},
        {title: 'First Sentence', value: bookDetails.firstSentence},
        {title: 'ISBN', value: bookDetails.isbn},
        {title: 'Number of Pages', value: bookDetails.numberOfPages > 0 ? `${bookDetails.numberOfPages}` : ''},
        {title: 'Physical Format', value: bookDetails.physicalFormat},
        {title: 'Published Date', value: bookDetails.publishDateString},
        {title: 'Published By', value: bookDetails.publishers},
    ];
};
