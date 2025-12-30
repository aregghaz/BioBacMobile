import {useCallback, useEffect, useState} from 'react';
import {GetProfileResponse} from '@/types';
import {GetProfile} from '@/services/Profile';
import useProfileStore from '@/zustland/profileStore';
import {comparePermissions, orderGrouped} from '@/permissions/engine';
import usePermissionStore from '@/zustland/permissionStore';
import { getGroupMeta } from '@/permissions/groupMeta';
import { HomeListProps } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
export default function useHome() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setProfile} = useProfileStore();
  const {permissions} = usePermissionStore();
  const [groups, setGroups] = useState<any[]>([]);

  // get profile //
  const getProfile = useCallback(() => {
    setLoading(true);
    return GetProfile({
      onSuccess: res => {
        const {data} = res as {data: GetProfileResponse};
        const result = comparePermissions({
          fullPermissions: permissions,
          userPermissions: data.permissions,
        });
        const groupsData = orderGrouped(result.grouped, ['BUYER', 'SELLER'], {
          includeEmpty: true,
        }).map(g => {
          const enabled = g.items.filter(x => x.has).length;
          const meta = getGroupMeta(g.key);
          return {
            key: g.key,
            label: meta.label,
            iconLibrary: meta.icon.library,
            iconName: meta.icon.name,
            enabled,
            total: g.items.length,
            iconSize: meta.icon.size,
            items: g.items, // <-- permissions
          };
        });
        setGroups(groupsData);
        setProfile(data);
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  }, [setProfile, permissions]);

 // navigate to detail //
 const navigateToDetail = useCallback((item: HomeListProps) => {
  switch (item.key) {
    case 'BUYER':
      navigation.navigate('Buyers', {item});
      break;
    case 'SELLER':
      navigation.navigate('Seller', {item});
      break;
  }
 }, [navigation]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);



  return {
    loading,
    groups,
    navigateToDetail,
  };
}
