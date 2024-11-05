import React, {type PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Section.styles.tsx';
import {CoverImage} from './CoverImage.tsx';
import {Book} from '../types/Book.ts';

type SectionProps = PropsWithChildren<{
    /**
     * The document object containing book details to display.
     * @type {Book}
     */
    document: Book;

    /**
     * Optional styles to apply to the text elements.
     * @type {Object}
     */
    textStyles?: Object;

    /**
     * Optional styles to apply to the container element.
     * @type {Object}
     */
    containerStyles?: Object;
}>;

/**
 * Section Component
 *
 * This component renders a section containing a cover image and some details about a book.
 * It displays the title, author, and year of the book. Custom styles can be applied
 * to the text and container elements.
 *
 * @param {SectionProps} props - The props for the Section component.
 * @param {Book} props.document - The book document to display in the section.
 * @param {Object} [props.textStyles] - Optional custom styles for text elements.
 * @param {Object} [props.containerStyles] - Optional custom styles for the container element.
 * @returns {React.JSX.Element} - A React JSX element representing the book section.
 */
export const Section = ({document, textStyles = {}, containerStyles = {}}: SectionProps): React.JSX.Element => {
    return (
        <View style={{...styles.sectionContainer, ...containerStyles }} key={document.workId}>
            <View style={{flex: 3}}>
                <CoverImage olid={document.olid} />
            </View>
            <View style={{flex: 12}}>
                <Text style={{...styles.sectionTitle, ...textStyles }}>
                    {document.title}
                </Text>
                <Text style={{...styles.sectionDescription, ...textStyles }}>
                    Author: {document.author}
                </Text>
                <Text style={{...styles.sectionDescription, ... textStyles }}>
                    Year: {document.firstPublishedYear}
                </Text>
            </View>
        </View>
    );
};
