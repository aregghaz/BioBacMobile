import { useCallback, useEffect,useState } from 'react';
import {RootStackParamList} from '@/navigation/types';
import { GetBuyers } from '@/services/Compny/Buyers';
import {HomeListProps} from '@/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Buyers'>;

export default function useBuyers(route: Props) {
  const {item} = route.route.params;
  const [loading, setLoading] = useState(false);
  const [buyers, setBuyers] = useState<[]>([]);
  // get buyers data //
  const getBuyers = useCallback(() => {
    console.log('getBuyers');
    setLoading(true);
    return GetBuyers({
      onSuccess: (res) => {
        console.log(res);
        // setBuyers(res.data as []);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, []);

useEffect(() => {
  getBuyers();
}, [getBuyers]);
  return {
    item: item as HomeListProps,
  };
}
