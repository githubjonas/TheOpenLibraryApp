import axios from 'axios';
import {getData, storeData, storeSearchHistory} from '../utils/storage.ts';
import {Book} from '../types/Book.ts';
import {normalizeBookWorkData, normalizeSearchApiResponse} from '../utils/normalization.ts';

const BASE_URL = 'https://openlibrary.org';

export const OpenLibraryApi = {
    /**
     * Search for books based on a query
     * @param query - The search term (e.g., title, author, etc.)
     * @param offset - Offset of first result to be returned
     * @param limit - The maximum number of results to return
     * @returns A promise resolving to the search results
     */
    searchBooks: async (query: string, offset: number = 0, limit: number = 10): Promise<Book[]> => {
        const key = `${query}-${offset}-${limit}-searchBook`;
        try {
            const cached = await getData(key);
            if (cached) {
                return cached;
            } else {
                const response = await axios.get(`${BASE_URL}/search.json`, {
                    params: {q: query, offset, limit},
                    timeout: 3000,
                });
                const books: Book[] = normalizeSearchApiResponse(response.data);
                if (offset == 0 && books.length > 0) {
                    // Only cache first page
                    await storeData(key, books);

                    // Save history
                    storeSearchHistory(query);
                }
                return books;
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get details about a specific book by its Open Library ID
     * @param id - The Open Library ID of the book
     * @returns A promise resolving to the book details
     */
    getBookDetails: async (id: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/works/${id}.json`, {
                timeout: 3000,
            });
            return normalizeBookWorkData(response.data);
        } catch (error) {
            throw error;
        }
    },
};
