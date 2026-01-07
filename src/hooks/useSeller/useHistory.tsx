import {useCallback, useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '@/navigation/types';
import {getHistoryProps} from '@/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { refreshTokenService } from '@/services/AuthService/RefreshToken';
import useAuthStore from '@/zustland/authStore';
import { GetCompanyHistory } from '@/services/Compny/Histroy';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

export default function useHistory(route: Props) {
  const {item} = route.route.params;
  const {id, name} = item;
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const {refreshToken} = useAuthStore();
  const [history, setHistory] = useState<getHistoryProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const getHistoryRef = useRef<() => void>(() => {});


  // refresh token //
  const onSubmitRefreshToken = useCallback(() => {
    refreshTokenService(refreshToken, {
      onSuccess: () => {
        getHistoryRef.current();
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [refreshToken]);

  // get seller data //
  const getHistory = useCallback(() => {
    if (page === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    return GetCompanyHistory(id, page, {
      onSuccess: payload => {
        const {data} = payload as {data: getHistoryProps[]};
        const {metadata} = payload as unknown as {
          metadata: {page: number; last: boolean; totalPages: number};
        };
        console.log('data', data);
        // page=0 -> replace, page>0 -> append
        setHistory(prev => (page === 0 ? data : [...prev, ...data]));

        // update hasNextPage if backend provides it
        if (typeof metadata?.last === 'boolean') {
          setHasNextPage(!metadata.last);
        } else if (typeof metadata?.totalPages === 'number') {
          setHasNextPage(page + 1 < metadata.totalPages);
        }

        setLoading(false);
        setLoadingMore(false);
      },
      onUnauthorized: () => {
        onSubmitRefreshToken();
      },
      onError: (error) => {
        console.log('onError',error);
        setLoading(false);
        setLoadingMore(false);
      },
    });
  }, [page, onSubmitRefreshToken, id]);


  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasNextPage) {
      return;
    }
    setPage(p => p + 1);
  }, [hasNextPage, loading, loadingMore]);






  useEffect(() => {
    getHistoryRef.current = getHistory;
  }, [getHistory]);


  useFocusEffect(
    useCallback(() => {
      getHistory();
    }, [getHistory])
  );

  return {
    name:name,
    loading,
    loadingMore,
    hasNextPage,
    history,
    loadMore,
  };
}
