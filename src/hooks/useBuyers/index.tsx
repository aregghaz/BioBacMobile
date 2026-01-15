import {useCallback, useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '@/navigation/types';
import {AllCompanyProps, HomeListProps} from '@/types';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {GetAllCompanies} from '@/services/Compny/AllCompanies';
import {refreshTokenService} from '@/services/AuthService/RefreshToken';
import useAuthStore from '@/zustland/authStore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DeleteCompany} from '@/services/Compny/DeleteCompany';
import {useToast} from '@/component/toast/ToastProvider';
type Props = NativeStackScreenProps<RootStackParamList, 'Buyers'>;

export default function useBuyers(route: Props) {
  const {item} = route.route.params;
  const {show} = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const {refreshToken} = useAuthStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [seller, setSeller] = useState<AllCompanyProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const getAllCompaniesRef = useRef<() => void>(() => {});
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState<number>(0);

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
    return GetAllCompanies(page,1, {
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
      onError: () => {
        setLoading(false);
        setLoadingMore(false);
      },
    });
  }, [page, onSubmitRefreshToken]);

  // load more data //
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasNextPage) {
      return;
    }
    setPage(p => p + 1);
  }, [hasNextPage, loading, loadingMore]);

  // navigate to history //
  const onHandlerHistory = (id: number, name: string) => {
    navigation.navigate('HistoryBuyers', {item: {id: id, name: name}});
  };

  // submit delete //
  const onSubmitDelete = (id: number) => {
    setVisible(() => true);
    setId(id);
  };

  const onSubmitConfirm = () => {
    setLoading(true);
    DeleteCompany(id, {
      onSuccess: () => {
        setVisible(() => false);
        getAllCompanies();
      },
      onUnauthorized: () => {
        onSubmitRefreshToken();
      },
      onError: () => {
        show('Failed to delete company', {type: 'error'});
        setVisible(() => false);
        setLoading(false);
      },
    });
  };

  const onSubmitCancel = () => {
    setVisible(() => false);
  };

  useEffect(() => {
    getAllCompaniesRef.current = getAllCompanies;
  }, [getAllCompanies]);


  useFocusEffect(
    useCallback(() => {
      getAllCompanies();
    }, [getAllCompanies])
  );
  return {
    item: item as HomeListProps,
    loading,
    loadingMore,
    hasNextPage,
    seller,
    loadMore,
    onHandlerHistory,
    onSubmitConfirm,
    visible,
    onSubmitDelete,
    onSubmitCancel,
  };
}
