/**
 * Represents a document from the OpenLibrary API response.
 *
 * This interface defines the structure of a single document item retrieved from the OpenLibrary API.
 */
export interface OpenLibraryDoc {
    /**
     * The title of the book.
     * @type {string}
     */
    title: string;

    /**
     * An array of author names associated with the book. Optional.
     * @type {string[] | undefined}
     */
    author_name?: string[];

    /**
     * The key for the edition that has a cover image. Optional.
     * @type {string | undefined}
     */
    cover_edition_key?: string;

    /**
     * An array of edition keys for the book. Optional.
     * @type {string[] | undefined}
     */
    edition_key?: string[];

    /**
     * The year the book was first published. Optional.
     * @type {number | undefined}
     */
    first_publish_year?: number;

    /**
     * The unique key for the work, typically used to identify the book within OpenLibrary.
     * @type {string}
     */
    key: string;
}

