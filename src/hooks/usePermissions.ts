import {useMemo} from 'react';
import usePermissionStore from '@/zustland/permissionStore';
import useProfileStore from '@/zustland/profileStore';
import {buildPermissionEngine, type Permission} from '@/permissions/engine';

export default function usePermissions() {
  const fullPermissions = usePermissionStore(s => s.permissions) as unknown as Permission[];
  const profile = useProfileStore(s => s.profile);
  const userPermissions = (profile?.permissions ?? []) as unknown as Permission[];

  return useMemo(
    () =>
      buildPermissionEngine({
        fullPermissions,
        userPermissions,
      }),
    [fullPermissions, userPermissions],
  );
}


