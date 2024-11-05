jest.mock('@react-native-async-storage/async-storage', () => {
    return require('@react-native-async-storage/async-storage/jest/async-storage-mock').default;
});

jest.mock('@react-native-community/netinfo', () => {
    return {
        __esModule: true,
        default: {
            addEventListener: jest.fn(),
            fetch: jest.fn(() =>
                Promise.resolve({
                    isConnected: true,
                    isInternetReachable: true,
                    details: {
                        isConnectionExpensive: false,
                    },
                })
            ),
        },
    };
});

jest.mock('../src/utils/useNetworkQuality', () => ({
    useNetworkQuality: jest.fn(() => 2), //NetworkQuality = GOOD
}));
