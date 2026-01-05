
import { Permission } from '@/permissions/engine';

export const hasPermission = (
    permissions: Permission[] | undefined,
    name: string,
  ) => {
    return permissions?.some(p => p.name === name) ?? false;
  };