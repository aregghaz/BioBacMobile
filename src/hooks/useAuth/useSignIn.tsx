import {useCallback, useState} from 'react';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {signInService} from '../../services/AuthService/SingIn';
import {LoginForm} from '@/types';
import {useToast} from '@/component/toast/ToastProvider';
import type {RootStackParamList} from '@/navigation/types';
import useAuthStore from '@/zustland/authStore';

export default function useSignIn() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const{setToken,setRefreshToken,setIsLoggedIn} = useAuthStore();
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

          setIsLoggedIn(true);
          setToken(accessToken);
          setRefreshToken(refreshToken);
          setLoading(false);
          reset();
          navigation.reset({index: 0, routes: [{name: 'Tabs'}]});
        },
        onUnauthorized: data => {
          setLoading(false);
          const {message} = data as {message: string};
          show(message, {type: 'error'});
        },
        onError:() => {
          setLoading(false);
        },
      });
    },
    [show, setToken, setRefreshToken, reset, navigation,setIsLoggedIn],
  );

 // toggle show password //
 const toggleShowPass = useCallback(() => {
  setShowPass(v => !v);
 }, []);


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
