import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

export default function useSellerCreate() {

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().trim().required('Required'),
        companyAddress: Yup.string().trim().required('Required'),
        companyPhone: Yup.string().trim().required('Required'),
        companyEmail: Yup.string().trim().required('Required'),
      });

      const {
        control,
        handleSubmit,
        formState: {errors},
      } = useForm({
        defaultValues: {
          companyName: '',
          companyAddress: '',
          companyPhone: '',
          companyEmail: '',
        },
        mode: 'onSubmit',
        resolver: yupResolver(validationSchema),
      });

    // onSubmit send data to api //
    const onSubmit = useCallback(async (values: any) => {
        console.log(values);
    }, []);

    return {
        control,
        handleSubmit,
        errors,
        onSubmit
    }
}