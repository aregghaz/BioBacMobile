import React from 'react';
import usePermissions from '@/hooks/usePermissions';

type Props = {
  anyOf?: string[];
  allOf?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export default function RequirePermission({
  anyOf,
  allOf,
  fallback = null,
  children,
}: Props) {
  const perm = usePermissions();

  const allowed =
    (anyOf?.length ? perm.hasAny(anyOf) : true) &&
    (allOf?.length ? perm.hasAll(allOf) : true);

  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}


