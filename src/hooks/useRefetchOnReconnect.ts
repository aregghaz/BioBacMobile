import {useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';

import useNetworkStore from '@/zustland/networkStore';

/**
 * Runs `refetch` when the app goes from offline -> online.
 * By default it only runs while the screen is focused.
 */
export default function useRefetchOnReconnect(
  refetch: () => void,
  opts?: {enabled?: boolean; onlyWhenFocused?: boolean},
) {
  const enabled = opts?.enabled ?? true;
  const onlyWhenFocused = opts?.onlyWhenFocused ?? true;
  const isFocused = useIsFocused();

  const reconnectCount = useNetworkStore(s => s.reconnectCount);
  const last = useRef(reconnectCount);

  useEffect(() => {
    if (!enabled) return;
    if (onlyWhenFocused && !isFocused) return;
    if (reconnectCount === last.current) return;
    last.current = reconnectCount;
    refetch();
  }, [enabled, isFocused, onlyWhenFocused, reconnectCount, refetch]);
}


