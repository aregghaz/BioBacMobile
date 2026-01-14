import React from 'react';

import useNetworkStore from '@/zustland/networkStore';

const NetInfo = require('@react-native-community/netinfo');

export default function NetworkListener() {
  const setConnection = useNetworkStore(s => s.setConnection);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      const connected = state.isConnected && state.isInternetReachable !== false;
      setConnection(Boolean(connected));
    });
    return unsubscribe;
  }, [setConnection]);

  return null;
}


