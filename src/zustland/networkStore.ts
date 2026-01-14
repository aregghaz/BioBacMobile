import {create} from 'zustand';

type NetworkState = {
  isConnected: boolean | null;
  reconnectCount: number;
  setConnection: (connected: boolean) => void;
};

const useNetworkStore = create<NetworkState>((set, get) => ({
  isConnected: true,
  reconnectCount: 0,
  setConnection: (connected: boolean) => {
    const prev = get().isConnected;
    // offline -> online transition
    const isReconnect = prev === false && connected === true;
    set(state => ({
      isConnected: connected,
      reconnectCount: isReconnect ? state.reconnectCount + 1 : state.reconnectCount,
    }));
  },
}));

export default useNetworkStore;


