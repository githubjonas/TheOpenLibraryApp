import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchScreen } from '../../src/screens/SearchScreen.tsx';

jest.mock('../../src/navigation/routes.ts', () => ({
    getRouteName: jest.fn(() => 'SearchResult'), // Mock implementation of getRouteName
}));

describe('SearchScreen Component', () => {
    const mockNavigate = jest.fn();

    const mockNavigation = {
        navigate: mockNavigate,
        addListener: jest.fn(() => {}),
    };

    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    it('should navigate with the query "book" when the "All books" button is pressed', () => {
        const { getByTestId } = render(<SearchScreen navigation={mockNavigation} />);

        // Simulate button press
        fireEvent.changeText(getByTestId('searchTextField'), 'book');
        fireEvent(getByTestId('searchTextField'), 'submitEditing');

        // Expect navigation to be called with the correct parameters
        expect(mockNavigate).toHaveBeenCalledWith('SearchResult', { q: 'book' });
    });
});
