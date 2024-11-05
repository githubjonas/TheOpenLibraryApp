import React from 'react';
import {Text, View} from 'react-native';
import {useNetworkQuality} from '../utils/useNetworkQuality.ts';
import {NetworkQuality} from '../types/NetworkQuality.ts';
import {styles} from './NetworkStatus.styles.tsx';

/**
 * NetworkStatus Component
 *
 * This component displays the current network status of the device. Depending on the network quality,
 * it either shows no message, a warning about limited (slow) connectivity, or an alert about being offline.
 *
 * @returns {React.JSX.Element} - A React JSX element representing the network status message.
 */
export const NetworkStatus = (): React.JSX.Element => {

    const quality = useNetworkQuality();

    switch (quality) {
        case NetworkQuality.GOOD:
            // No message displayed for good network connection
            return <></>;

        case NetworkQuality.BAD:
            return (
              <View>
                  <Text style={styles.bad}>Your connection is limited.</Text>
              </View>
            );

        case NetworkQuality.NOT_WORKING:
            return (
              <View>
                  <Text style={styles.notWorking}>You are offline.</Text>
              </View>
            );
    }
};
