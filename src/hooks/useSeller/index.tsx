import { useCallback, useEffect,useState } from 'react';
import {RootStackParamList} from '@/navigation/types';
import { GetBuyers } from '@/services/Compny/Buyers';
import {HomeListProps} from '@/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { GetSeller } from '@/services/Compny/Seller';

type Props = NativeStackScreenProps<RootStackParamList, 'Seller'>;

export default function useSeller(route: Props) {
  const {item} = route.route.params;
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState<[]>([]);


  // get seller data //
  const getSeller = useCallback(() => {
    console.log('getSeller');
    setLoading(true);
    return GetSeller({
      onSuccess: (res) => {
        console.log('===>',res);
        // setBuyers(res.data as []);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, []);

useEffect(() => {
  getSeller();
}, [getSeller]);
  return {
    item: item as HomeListProps,
  };
}
