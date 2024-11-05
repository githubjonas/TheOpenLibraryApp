/**
 * Represents a 'work' response from the OpenLibrary API.
 *
 * This interface defines the structure of a single 'works' item retrieved from the OpenLibrary API.
 */
export interface OpenLibraryWork {
    edition_name: string;
    first_sentence: {type: string, value: string};
    isbn_10?: [string];
    isbn_13?: [string];
    number_of_pages: number;
    physical_format: string;
    publish_date: string;
    publishers: [string];
    title: string;
}
