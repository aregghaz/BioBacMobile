type Endpoints = {
  SignIn: string;
  GetAllPermissions: string;
  GetProfile: string;
  GetBuyers: string;
  GetSeller: string;
}

export const endpoints:Endpoints = {
  SignIn: 'users/auth/login',

  // permissions//
  GetAllPermissions: 'users/roles/all-permissions',

  // profile //
  GetProfile: 'users/info/profile',

  // company //
  GetBuyers: 'company/buyer',
  GetSeller: 'company/seller',
};