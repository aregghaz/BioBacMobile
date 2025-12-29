import { useState } from 'react'
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const validationSchema = Yup.object().shape({
        password: Yup.string().trim().required('password is required'),
        username: Yup.string()
          .trim()
          .required('phone is required')
      });
      const {
        control,
        handleSubmit,
        formState: {errors},
        getValues,
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
      const onSubmit = async () => {
        const values = getValues();
        console.log(values);
        reset();
        setLoading(true);
        setShowPass(true)
      };

    return{
        loading,
        showPass,
        control,
        handleSubmit,
        errors,
        onSubmit,
    }
}