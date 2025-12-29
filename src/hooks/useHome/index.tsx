import {useCallback, useEffect, useState} from 'react';
import { GetAllPermissions } from '@/services/Permissions/GetPermissions';
import usePermissionStore from '@/zustland/permissionStore';
import { GetAllPermissionsResponse } from '@/types';
export default function useHome() {
    const [loading, setLoading] = useState(false);
    const {setPermissions,permissions} = usePermissionStore();

 // get all permissions //
  const getAllPermissions = useCallback(() => {
    setLoading(true);
    GetAllPermissions({
      onSuccess: res => {
        const {data} = res as {data: GetAllPermissionsResponse[]};
        setPermissions(data);
        setLoading(false);
      },
      onError: () => {setLoading(false)}
    });
  }, [setPermissions]);

 const getProfile = useCallback(() => {
    return permissions;
 }, []);

  useEffect(() => {
    if (!permissions.length) {
        getAllPermissions();
    }
  }, [permissions.length, getAllPermissions]);

return{
    loading,
};

}
