import {useCallback, useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '@/navigation/types';
import {AllCompanyProps, HomeListProps} from '@/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GetAllCompanies} from '@/services/Compny/AllCompanies';
import { refreshTokenService } from '@/services/AuthService/RefreshToken';
import useAuthStore from '@/zustland/authStore';
type Props = NativeStackScreenProps<RootStackParamList, 'Seller'>;

export default function useSeller(route: Props) {
  const {item} = route.route.params;
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const {refreshToken} = useAuthStore();
  const [seller, setSeller] = useState<AllCompanyProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const getAllCompaniesRef = useRef<() => void>(() => {});


  // refresh token //
  const onSubmitRefreshToken = useCallback(() => {
    refreshTokenService(refreshToken, {
      onSuccess: () => {
        getAllCompaniesRef.current();
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [refreshToken]);

  // get seller data //
  const getAllCompanies = useCallback(() => {
    if (page === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    return GetAllCompanies(page, {
      onSuccess: payload => {
        const {data} = payload as {data: AllCompanyProps[]};
        const {metadata} = payload as unknown as {
          metadata: {page: number; last: boolean; totalPages: number};
        };

        // page=0 -> replace, page>0 -> append
        setSeller(prev => (page === 0 ? data : [...prev, ...data]));

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
      onError: (error, status) => {
        setLoading(false);
        setLoadingMore(false);
        console.log('GetAllCompanies error', {status, error});
      },
    });
  }, [page, onSubmitRefreshToken]);


  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasNextPage) {
      return;
    }
    setPage(p => p + 1);
  }, [hasNextPage, loading, loadingMore]);


  useEffect(() => {
    getAllCompaniesRef.current = getAllCompanies;
  }, [getAllCompanies]);


  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);
  return {
    item: item as HomeListProps,
    loading,
    loadingMore,
    hasNextPage,
    seller,
    loadMore,
  };
}
