export const USER_PERMISSIONS = {
    ACTIVE: 'ACTIVE',
    BLOCKED: 'BLOCKED',
    PENDING: 'PENDING',
  } as const;

  export type UserPermissions = keyof typeof USER_PERMISSIONS;