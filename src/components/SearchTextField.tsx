import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './SearchTextField.styles.ts';

interface Props {
    /**
     * Callback function to be called when the text input is submitted.
     * @param {string} text - The current text value of the input field.
     */
    onSubmit: (text: string) => void;
}

/**
 * SearchTextField Component
 *
 * This component renders a styled text input field that allows users to type a search query. It supports
 * submitting the input when the "Enter" key is pressed and selecting all text when focused.
 *
 * @param {Props} props - The props for the SearchTextField component.
 * @param {Function} props.onSubmit - A callback function that is called when the input is submitted.
 * @returns {React.JSX.Element} - A React JSX element representing the search text input field.
 */
export const SearchTextField = ({onSubmit}: Props): React.JSX.Element => {
    const [text, setText] = useState('');

    /**
     * Handles the focus event and selects all text in the input field.
     *
     * @param {any} event - The focus event object.
     */
    const handleFocus = (event: any) => {
        event.currentTarget.setSelection(0, text.length);
    };

    /**
     * Handles the submission of the input when the "Enter" key is pressed.
     */
    const handleSubmit = () => {
        onSubmit(text);
    };

    return (
        <TextInput
            testID={'searchTextField'}
            style={styles.input}
            onChangeText={setText}
            onSubmitEditing={handleSubmit} // Trigger handleSubmit on "Enter" key press
            onFocus={handleFocus}
            returnKeyType="search" // Change return key type to "search"
            value={text}
        />
    );
};
