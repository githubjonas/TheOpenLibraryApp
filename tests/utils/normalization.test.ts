import { normalizeBookData  , normalizeSearchApiResponse } from '../../src/utils/normalization.ts';
import { OpenLibraryDoc } from '../../src/types/OpenLibraryDoc.ts';
import { Book } from '../../src/types/Book.ts';

describe('normalizeBookData', () => {
    it('should normalize a book with all data present', () => {
        const mockDoc: OpenLibraryDoc = {
            title: 'Test Book',
            author_name: ['Author One', 'Author Two'],
            edition_key: ['OL12345M'],
            cover_edition_key: 'OL12345M',
            first_publish_year: 1999,
            key: '/works/OL1234567W',
        };

        const expected: Book = {
            title: 'Test Book',
            author: 'Author One, Author Two',
            olid: 'OL12345M',
            firstPublishedYear: 1999,
            workId: 'OL1234567W',
        };

        expect(normalizeBookData(mockDoc)).toEqual(expected);
    });

    it('should handle a book with missing author and cover edition key', () => {
        const mockDoc: OpenLibraryDoc = {
            title: 'Untitled Book',
            author_name: undefined,
            edition_key: ['OL67890M'],
            cover_edition_key: undefined,
            first_publish_year: undefined,
            key: '/works/OL6789012W',
        };

        const expected: Book = {
            title: 'Untitled Book',
            author: 'Unknown Author',
            olid: 'OL67890M',
            firstPublishedYear: null,
            workId: 'OL6789012W',
        };

        expect(normalizeBookData(mockDoc)).toEqual(expected);
    });

    it('should handle a book with missing edition key', () => {
        const mockDoc: OpenLibraryDoc = {
            title: 'Another Test Book',
            author_name: ['Single Author'],
            edition_key: [],
            cover_edition_key: undefined,
            first_publish_year: 2005,
            key: '/works/OL3456789W',
        };

        const expected: Book = {
            title: 'Another Test Book',
            author: 'Single Author',
            olid: '',
            firstPublishedYear: 2005,
            workId: 'OL3456789W',
        };

        expect(normalizeBookData(mockDoc)).toEqual(expected);
    });
});

describe('normalizeApiResponse', () => {
    it('should normalize an API response with multiple documents', () => {
        const mockResponse = {
            docs: [
                {
                    title: 'Book One',
                    author_name: ['Author One'],
                    edition_key: ['OL11111M'],
                    cover_edition_key: 'OL11111M',
                    first_publish_year: 2000,
                    key: '/works/OL1111122W',
                },
                {
                    title: 'Book Two',
                    author_name: ['Author Two', 'Author Three'],
                    edition_key: ['OL22222M'],
                    cover_edition_key: 'OL22222M',
                    first_publish_year: 2010,
                    key: '/works/OL2222233W',
                },
            ] as OpenLibraryDoc[],
        };

        const expected: Book[] = [
            {
                title: 'Book One',
                author: 'Author One',
                olid: 'OL11111M',
                firstPublishedYear: 2000,
                workId: 'OL1111122W',
            },
            {
                title: 'Book Two',
                author: 'Author Two, Author Three',
                olid: 'OL22222M',
                firstPublishedYear: 2010,
                workId: 'OL2222233W',
            },
        ];

        expect(normalizeSearchApiResponse(mockResponse)).toEqual(expected);
    });

    it('should return an empty array when the response contains no documents', () => {
        const mockResponse = { docs: [] as OpenLibraryDoc[] };
        expect(normalizeSearchApiResponse(mockResponse)).toEqual([]);
    });
});
