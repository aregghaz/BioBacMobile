import {useCallback, useState} from 'react';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {signInService} from '../../services/AuthService/SingIn';
import {GetAllPermissionsResponse, LoginForm} from '@/types';
import {useToast} from '@/component/toast/ToastProvider';
import type {RootStackParamList} from '@/navigation/types';
import useAuthStore from '@/zustland/authStore';
import { GetAllPermissions } from '@/services/Permissions/GetPermissions';
import usePermissionStore from '@/zustland/permissionStore';

export default function useSignIn() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const{setToken,setRefreshToken,setIsLoggedIn} = useAuthStore();
  const {setPermissions} = usePermissionStore();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {show} = useToast();

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required('password is required'),
    username: Yup.string().trim().required('username is required'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });



 // toggle show password //
 const toggleShowPass = useCallback(() => {
  setShowPass(v => !v);
 }, []);


 // get all permissions //
 const getAllPermissions = useCallback(async () => {
  setLoading(true);
 await GetAllPermissions({
    onSuccess: res => {
      const {data} = res as {data: GetAllPermissionsResponse[]};
      setPermissions(data);
      setIsLoggedIn(true);
      setLoading(false);
      reset();
      navigation.reset({index: 0, routes: [{name: 'Tabs'}]});
    },
    onError: () => {
      setLoading(false);
 
    },
  });
}, [setPermissions, navigation, reset, setIsLoggedIn]);


  //---------onSubmit to api---------//
  const onSubmit = useCallback(
    async (values: LoginForm) => {
      setLoading(true);
      await signInService(values.username.toLocaleLowerCase(), values.password, {

        onSuccess: (data: any) => {
          const accessToken = data?.accessToken ?? data?.data?.accessToken;
          const refreshToken = data?.refreshToken ?? data?.data?.refreshToken;
          if (!accessToken || !refreshToken) {
            setLoading(false);
            return;
          }
          setToken(accessToken);
          setRefreshToken(refreshToken);
          getAllPermissions();

        },
        onUnauthorized: data => {
          setLoading(false);
          const {message} = data as {message: string};
          show(message, {type: 'error'});
        },
        onError:(error) => {
          setLoading(false);
          // show(error.message, {type: 'error'});
          console.log('error', error);
        },
      });
    },
    [show, setToken, setRefreshToken, getAllPermissions],
  );

  return {
    loading,
    showPass,
    toggleShowPass,
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
}
