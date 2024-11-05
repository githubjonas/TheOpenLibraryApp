import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NetworkQuality} from '../types/NetworkQuality.ts';

/**
 * Custom hook to determine the quality of the network connection.
 *
 * @returns {NetworkQuality} - Returns "good", "bad", or "not working" based on the network quality.
 */
export function useNetworkQuality(): NetworkQuality {
    const [networkQuality, setNetworkQuality] = useState<NetworkQuality>(NetworkQuality.GOOD);

    useEffect(() => {
        const checkNetWorkQuality = async () => {
            const state = await NetInfo.fetch();
            if (!state.isConnected || !state.isInternetReachable) {
              setNetworkQuality(NetworkQuality.NOT_WORKING);
            } else {
              // Test connection speed by making a lightweight fetch request
              const startTime = Date.now();
              fetch('https://www.google.com')
                .then(() => {
                  const endTime = Date.now();
                  const duration = endTime - startTime;

                  if (duration < 500) {
                    setNetworkQuality(NetworkQuality.GOOD);
                  } else if (duration < 2000) {
                    setNetworkQuality(NetworkQuality.BAD);
                  } else {
                    setNetworkQuality(NetworkQuality.NOT_WORKING);
                  }
                })
                .catch(() => {
                  setNetworkQuality(NetworkQuality.NOT_WORKING);
                });
            }
        };

        const unsubscribe = NetInfo.addEventListener(() => {
          checkNetWorkQuality().then();
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return networkQuality;
}
