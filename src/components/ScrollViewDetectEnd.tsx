import React, {type PropsWithChildren} from 'react';
import {ScrollView} from 'react-native';

/**
 * Function to determine if a `ScrollView` has been scrolled close to the bottom.
 */
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

type Props = PropsWithChildren<{
    onReachedBottom: Function;
}>;

/**
 * ScrollView with callback when it's scrolled close to the end
 *
 * @see https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
 *
 * @param onReachedBottom
 * @param children
 * @constructor
 */
export const ScrollViewDetectEnd = ({onReachedBottom, children}: Props) => (
    <ScrollView
        onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                onReachedBottom();
            }
        }}
        scrollEventThrottle={400}
    >
        {children}
    </ScrollView>
);
