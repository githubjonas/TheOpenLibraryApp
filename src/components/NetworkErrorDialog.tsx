import React from 'react';
import DialogTitle from 'react-native-dialog/lib/Title';
import DialogDescription from 'react-native-dialog/lib/Description';
import DialogButton from 'react-native-dialog/lib/Button';
import DialogContainer from 'react-native-dialog/lib/Container';

interface Props {
    /**
     * A function to be called when the dialog button is pressed.
     * @type {Function}
     */
    onPress: Function;
}

/**
 * NetworkErrorDialog Component
 *
 * This component displays a modal dialog indicating a network error. It provides
 * a message explaining the error and includes a button that allows users to acknowledge
 * and dismiss the dialog.
 *
 * @param {Props} props - The props for the NetworkErrorDialog component.
 * @param {Function} props.onPress - The callback function to be invoked when the "Ok" button is pressed.
 * @returns {React.JSX.Element} - A React JSX element representing the network error dialog.
 *
 * @example
 * // Example usage in a React Native screen or component
 * <NetworkErrorDialog onPress={() => console.log('Dialog dismissed')} />
 */
export const NetworkErrorDialog = ({onPress}: Props): React.JSX.Element => {
    return (
        <DialogContainer visible={true}>
            <DialogTitle>Network Error</DialogTitle>
            <DialogDescription>
                Unable to complete your request. Please make sure you have network
                connetion and try again.
            </DialogDescription>
            <DialogButton label={'Ok'} onPress={() => onPress()} />
        </DialogContainer>
    );
};
