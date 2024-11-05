import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Stores a value in AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to store.
 */
export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to store data:', e);
    }
};

/**
 * Retrieves a value from AsyncStorage.
 * @param {string} key - The key to fetch the value for.
 * @param {any} dflt - Default retun value
 * @returns {Promise<any | null>} - The stored value or dflt|null if not found.
 */
export const getData = async (key: string, dflt: any = null): Promise<any | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? JSON.parse(value) : dflt;
    } catch (e) {
        console.error('Failed to get data:', e);
        return dflt;
    }
}

/**
 * Stores a search keyword in the search history.
 *
 * This function retrieves the current search history from storage, adds the new keyword to the start of the history,
 * and ensures the history does not exceed 10 items. If the history exceeds 10 items, the oldest items are removed.
 *
 * @param {string} keyword - The search keyword to store.
 *
 * @example
 * // Store a keyword in the search history
 * storeSearchHistory('React Native');
 */
export const storeSearchHistory = (keyword: string) => {
    (async() => {
        let searchHistory = await getData('searchHistory');
        if (!searchHistory) {
            searchHistory = [];
        }

        searchHistory.unshift(keyword);
        while (searchHistory.length > 10) searchHistory.pop();

        await storeData('searchHistory', searchHistory);
    })();
};

/**
 * Retrieves the search history from storage.
 *
 * This function returns the stored search history or an empty array if no history is found.
 *
 * @returns {Promise<string[]>} - A promise that resolves to an array of search history keywords.
 *
 * @example
 * // Get the search history
 * const history = await getSearchHistory();
 * console.log(history); // Outputs: ['React Native', 'JavaScript', 'TypeScript']
 */
export const getSearchHistory = async () : Promise<[]> => {
    return await getData('searchHistory', []);
};
