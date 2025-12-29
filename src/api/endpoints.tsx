type Endpoints = {
  SignIn: string;
  GetAllPermissions: string;
  GetProfile: string;
}

export const endpoints:Endpoints = {
  SignIn: 'users/auth/login',

  // permissions//
  GetAllPermissions: 'users/roles/all-permissions',

  // profile //
  GetProfile: 'users/info/profile',
};