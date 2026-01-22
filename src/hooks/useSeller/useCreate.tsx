import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import useNetworkStore from '@/zustland/networkStore';
import { useState } from 'react';
import { useToast } from '@/component/toast/ToastProvider';
import moment from 'moment';
import { GetCompanyGroup } from '@/services/Company/CompnayGroup';
import { useFocusEffect } from '@react-navigation/native';
import useCompanyGroupStore from '@/zustland/companyGroup';
import { CompanyGroupParamList, DropdownOptions } from '@/navigation/types';
import useRefetchOnReconnect from '../useRefetchOnReconnect';

export default function useSellerCreate() {
  const isConnected = useNetworkStore(s => s.isConnected);
  const [showDate, setShowDate] = useState(false);
  const {companyGroup, setCompanyGroup} = useCompanyGroupStore();
  const [companyGroupList, setCompanyGroupList] = useState<DropdownOptions[]>([]);
  const {show} = useToast();
  const [date, setDate] = useState<string>(
    moment(new Date()).format('DD/MM/YYYY'),
  );

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().trim().required('Required'),
        generalDirector: Yup.string().trim().required('Required'),
        companyAddress: Yup.string().trim().required('Required'),
        companyPhone: Yup.string().trim().required('Required'),
        creditorAmount: Yup.string().trim().required('Required'),
        debtorAmount: Yup.string().trim().required('Required'),
        companyGroup: Yup.string().trim().required('Required'),
        date: Yup.string().trim().required('Required'),
        latitude: Yup.string().trim().required('Required'),
        longitude: Yup.string().trim().required('Required'),

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
          creditorAmount: '0',
          debtorAmount: '0',
          companyGroup: '',
          date: '',
          latitude: '',
          longitude: '',
        },
        mode: 'onSubmit',
        resolver: yupResolver(validationSchema),
      });


  // open date picker
  const onOpenDate = () => {
    setShowDate(true);
  };
 
  // clear date//
  const onclearDate = () => {
    setDate('');
  };

  // close date picker (used by modal overlay)
  const onCloseDate = () => {
    setShowDate(false);
  };

  // confirm selected date
  const onConfirmDate = (payload: {
    day: number;
    month: number;
    year: number;
    dateString: string;
    timestamp: number;
  }) => {
    const dd = String(payload.day).padStart(2, '0');
    const mm = String(payload.month).padStart(2, '0');
    setDate(`${dd}/${mm}/${payload.year}`);
    setShowDate(false);
  };

    // onSubmit send data to api //
    const onSubmit = useCallback(async (values: any) => {
        console.log(values);
    }, []);


  // get company group
  const getCompanyGroup = useCallback(async () => {
    if (!isConnected) return;
    await GetCompanyGroup({
      onSuccess: res => {
        const {data} = res as {data: CompanyGroupParamList[]};
        const companyGroupOptions: DropdownOptions[] = data.map(
          (item: CompanyGroupParamList) => ({
            label: item.name,
            value: item.id,
          }),
        );
        setCompanyGroup(companyGroupOptions);
        setCompanyGroupList(companyGroupOptions)
      },
      onUnauthorized: () => {
        show('Unauthorized', {type: 'error'});
      },
      onError: () => {
        show('Failed to get company group', {type: 'error'});
      },
    });
  }, [isConnected, show, setCompanyGroup]);

  useFocusEffect(
    useCallback(() => {
      getCompanyGroup();
    }, [getCompanyGroup])
  );


  useRefetchOnReconnect(getCompanyGroup);
    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        onOpenDate,
        onclearDate,
        onCloseDate,
        date,
        showDate,
        onConfirmDate,
        companyGroupList,
        companyGroup,
        isConnected
    }
}