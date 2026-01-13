type Endpoints = {
  SignIn: string;
  RefreshToken: string;
  GetAllPermissions: string;
  GetProfile: string;
  GetBuyers: string;
  GetSeller: string;
  GetAllCompanies: string;
  GetCompanyHistory: string;
  DeleteCompany: string;
  GetAssetInfoCategory: string;
  GetPaymentCategory: string;
  GetCompanyAccount: string;
  CreatePayment: string;
}

export const endpoints:Endpoints = {
  SignIn: 'users/auth/login',
  RefreshToken: 'users/auth/refresh-token',
  // permissions//
  GetAllPermissions: 'users/roles/all-permissions',

  // profile //
  GetProfile: 'users/info/profile',

  // company //
  GetAllCompanies: 'company/all',
  GetBuyers: 'company/buyer',
  GetSeller: 'company/seller',
  GetCompanyHistory: 'company/company-history/',
  DeleteCompany: 'company/delete/',
  GetCompanyAccount: 'company/account',


  //payment
  GetPaymentCategory: 'company/payment-category',
  CreatePayment: 'company/payment',

  //info-controller
  GetAssetInfoCategory: 'warehouse/asset-info/category',
};