/**
 * Represents a normalized document from OpenLibrary.
 */
export interface Book {
    /**
     * The title of the book.
     * @type {string}
     */
    title: string;

    /**
     * The authors of the book described in a string.
     * @type {string}
     */
    author: string;

    /**
     * The unique ID of a book
     * @type {string}
     */
    olid: string;

    /**
     * The first publication year of a book or null if not known.
     * @type {number | null}
     */
    firstPublishedYear: number | null;

    /**
     * The "Work ID" from OpenLibrary
     */
    workId: string;
}
