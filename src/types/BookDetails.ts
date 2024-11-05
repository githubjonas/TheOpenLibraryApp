/**
 * Represents a normalized 'work' document from OpenLibrary.
 */
export interface BookDetails {
    /**
     * The title of the book.
     * @type {string}
     */
    title: string;

    /**
     * The first sentence of the book, or empty string if not found.
     * @type {string}
     */
    firstSentence: string;

    /**
     * The ISBN of the book.
     * @type {string}
     */
    isbn: string;

    /**
     * Number of pages in the book or 0 if not known.
     * @type {number}
     */
    numberOfPages: number;

    /**
     * Physical format of the book.
     * @type {string}
     */
    physicalFormat: string;

    /**
     * Publish date as a string.
     * @type {string}
     */
    publishDateString: string;

    /**
     * Publishers as a string, separated by ', '
     * @type {string}
     */
    publishers: string;
}
