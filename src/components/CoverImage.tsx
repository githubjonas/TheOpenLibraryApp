import React from 'react';
import {Image} from 'react-native';

interface Props {
    /**
     * The OpenLibrary ID (OLID) used to fetch the cover image.
     * @type {string}
     */
    olid: string
}

/**
 * CoverImage Component
 *
 * This component displays a cover image using the OpenLibrary cover image service URL.
 * The image is styled with a border, background color, and fixed height.
 *
 * @param {Props} props - The props for the CoverImage component.
 * @param {string} props.olid - The OpenLibrary ID (OLID) used to construct the URL for the image source.
 * @returns {React.JSX.Element} - A React JSX element displaying the book cover image.
 */
export const CoverImage = ({olid}: Props): React.JSX.Element => (
  <Image
      testID='coverImage'
      source={{uri: `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`}}
      style={{
          borderColor: '#aaa',
          borderWidth: 1,
          padding: 3,
          backgroundColor: '#fff',
          height: 100,
      }}
  />
);
