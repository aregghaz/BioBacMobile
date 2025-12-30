export type LoginForm = {
    username: string;
    password: string;
  };

  export type GetAllPermissionsResponse = {
    id: number;
    name: string;
  }

  export type GetProfileResponse = {
    createdAt: string;
    updatedAt: string;
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    active: boolean;
    dob: string | null;
    positionId: null,
    positionName: null,
    permissions: GetAllPermissionsResponse[]
  }

  export type HomeListProps = {
    key: string;
    label: string;
    iconLibrary: string;
    iconName: string;
    iconSize: number;
    enabled: boolean;
    total: number;
    icon: string;
    item?:[]
  }