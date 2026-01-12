import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {GetPaymentCategory} from '@/services/Payment/PaymentCategory';
import {GetCompanyAccount} from '@/services/Compny/Account';
import {GetAccountResponse, GetPaymentTypeResponse} from '@/types';
import {useToast} from '@/component/toast/ToastProvider';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';

export default function usePayment() {
  const [showDate, setShowDate] = useState(false);
  const {show} = useToast();
  const [date, setDate] = useState<string>(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [account, setAccount] = useState<{label: string; value: string}[]>([]);
  const [typeName, setTypeName] = useState<{label: string; value: string}[]>(
    [],
  );
  const [listType, setListType] = useState<{label: string; value: string}[]>(
    [],
  );
  const [type, setType] = useState<GetPaymentTypeResponse[]>([]);
  const [typeFilterName, setTypeFilterName] = useState<string>('');
  const [category, setCategory] = useState<{label: string; value: string}[]>(
    [],
  );
  const [errorAccount, setErrorAccount] = useState<boolean>(false);



  const [result, setResult] = useState<{
    date: string;
    account: string;
    type: string;
    category: string;
    categoryChild: string;
  }>({
    date: '',
    account: '',
    type: '',
    category: '',
    categoryChild: '',
  });

  const [categoryChild, setCategoryChild] = useState<
    {label: string; value: string}[]
  >([]);

  const validationSchema = Yup.object().shape({
    amount: Yup.string().trim().required('Required'),
    comment: Yup.string().trim().required('Required'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      amount: '',
      comment: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(validationSchema),
  });


  // open date picker
  const onOpenDate = () => {
    setShowDate(true);
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
    setResult(prev => ({...prev, date: date}));
    setShowDate(false);
  };

  // get payment category
  const getPaymentCategory = useCallback(async () => {
    await GetPaymentCategory({
      onSuccess: res => {
        const {data} = res as {data: GetPaymentTypeResponse[]};
        const typeOptions: {label: string; value: string}[] = data.map(
          (item, index) => ({
            label: item.root,
            value: index.toString(),
          }),
        );
        setTypeName(typeOptions);
        setType(data);
      },
      onError: error => {
        console.log('error', error);
      },
      onUnauthorized: error => {
        console.log('error', error);
      },
    });
  }, []);

  // get company account
  const getCompanyAccount = useCallback(async () => {
    await GetCompanyAccount({
      onSuccess: res => {
        const {data} = res as {data: GetAccountResponse[]};
        const accountOptions: {label: string; value: string}[] = data.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setAccount(accountOptions);
      },
      onError: error => {
        show((error as Error).message, {type: 'error'});
      },
      onUnauthorized: error => {
        console.log('error', error);
      },
    });
  }, [show]);

  // submit filter list type
  const onSubmitFilterList = ({label}: {label: string}) => {
    const res = type.find(item => item.root === label);
    const resultFilterList = res?.rootItems.map(
      (item: {name: string; targetId: number}) => ({
        label: item.name,
        value: item.targetId.toString(),
      }),
    );
    setListType(resultFilterList ?? []);
    setTypeFilterName(label);
  };

  // submit filter category
  const onSubmitFilterCategory = ({label}: {label: string}) => {
    const res = type.find(item => item.root === typeFilterName);
    const resultFilterCategory = res?.categories.map((item: {name: string; id: number}) => ({
      label: item.name,
      value: item.id.toString(),
    }));
    setCategory(resultFilterCategory ?? []);
    setResult(prev => ({...prev, category: label}));
  };

  // submit category child
  const onSubmitCategoryChild = ({label}: {label: string}) => {
    const res = type.find(item => item.root === typeFilterName);
    const resCategory = res?.categories?.find((item: {name: string}) => item.name === label);
    const resultFilterCategoryChild = resCategory?.children?.map(
      (item: {name: string; parentId: number}) => ({
        label: item.name,
        value: item.parentId.toString(),
      }),
    );
    setCategoryChild(resultFilterCategoryChild ?? []);
    setResult(prev => ({...prev, categoryChild: label}));
  };

  // submit payment
  const onSubmit = () => {
    console.log('result', getValues());
    // if (result.account === '') {
    //   console.log('result.account', result.account);
    //   setErrorAccount(true);
    // }
  };

  useFocusEffect(
    useCallback(() => {
      getPaymentCategory();
      getCompanyAccount();
    }, [getPaymentCategory, getCompanyAccount]),
  );

  return {
    date,
    showDate,
    setShowDate,
    onOpenDate,
    onCloseDate,
    onConfirmDate,
    account,
    typeName,
    onSubmitFilterList,
    onSubmitFilterCategory,
    onSubmitCategoryChild,
    listType,
    category,
    categoryChild,
    onSubmit,
    setResult,
    control,
    handleSubmit,
    errors,
    result,
    errorAccount,
    setErrorAccount
  };
}
