import React from 'react';
import { render } from '@testing-library/react-native';
import {CoverImage} from '../../src/components/CoverImage.tsx';

describe('CoverImage Component', () => {
    it('renders correctly with a given OLID', () => {
        const { getByTestId } = render(<CoverImage olid="OL12345M" />);

        const image = getByTestId('coverImage');

        expect(image).toBeTruthy();
        expect(image.props.source).toEqual({
            uri: 'https://covers.openlibrary.org/b/olid/OL12345M-M.jpg',
        });
    });

    it('applies correct styles to the Image component', () => {
        const { getByTestId } = render(<CoverImage olid="OL12345M" />);

        const image = getByTestId('coverImage');

        expect(image.props.style).toMatchObject({
            borderColor: '#aaa',
            borderWidth: 1,
            padding: 3,
            backgroundColor: '#fff',
            height: 100,
        });
    });
});
