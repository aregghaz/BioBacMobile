import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '@/theme';
import { Controller } from 'react-hook-form';
import TextView from '@/component/view/TextView';
import useSellerCreate from '@/hooks/useSeller/useCreate';
import TextInput from '@/component/input/TextInput';
import Botton from '@/component/button';
import CustomHeader from '@/navigation/Header';
import Calender from '@/component/calender';
import TouchableView from '@/component/view/TouchableView';
import DateIcon from '@/component/icons/DateIcon';
import moment from 'moment';
import DropdownComponent from '@/component/dropdown';
export default function SellerCreate() {
  const { control, handleSubmit, errors, onSubmit, onOpenDate, onclearDate, onCloseDate, date, showDate, onConfirmDate, companyGroupList, companyGroup, isConnected } = useSellerCreate();



  return (
    <View style={styles.container}>
      <CustomHeader title={'Company Information'} showBack={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <TextView title="Company Name" style={styles.marginTop} />
        <Controller
          control={control}
          name="companyName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="..."
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.companyName?.message}
            />
          )}
        />
        <TextView title="General Director" style={styles.marginTop} />
        <Controller
          control={control}
          name="generalDirector"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="..."
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.companyName?.message}
            />
          )}
        />
        <TextView title="Company Phone" style={styles.marginTop} />
        <Controller
          control={control}
          name="companyPhone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="..."
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              keyboard="numeric"
              value={value}
              errorMessage={errors.companyPhone?.message}
            />
          )}
        />
        <TextView title="Company Address" style={styles.marginTop} />
        <Controller
          control={control}
          name="companyAddress"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="..."
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.companyAddress?.message}
            />
          )}
        />
    <TextView title="Company Group" style={styles.marginTop} />
        <Controller
          control={control}
          name="companyGroup"
          render={({ field: { onChange, value: accountValue } }) => (
            <DropdownComponent
              style={styles.marginTop}
              data={isConnected ? companyGroupList : companyGroup}
              value={accountValue}
              onClick={({ value }) => onChange(value)}
              errorMessage={errors.companyGroup?.message}
            />
          )}
        />
        <TextView title="Creditor amount" style={styles.marginTop} />
        <Controller
          control={control}
          name="creditorAmount"
          render={({ field: { onChange, value } }) => (
            <TextInput
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              keyboard="numeric"
              value={value}
              errorMessage={errors.creditorAmount?.message}
            />
          )}
        />
        <TextView title="Debtor amount" style={styles.marginTop} />
        <Controller
          control={control}
          name="debtorAmount"
          render={({ field: { onChange, value } }) => (
            <TextInput
              containerStyle={styles.marginTop}
              inputSize="medium"
              onChangeText={onChange}
              keyboard="numeric"
              value={value}
              errorMessage={errors.debtorAmount?.message}
            />
          )}
        />
        <TextView title="Date" style={styles.marginTop} />
        <TouchableView
          title={date}
          style={styles.marginTop}
          onPress={onOpenDate}
          onClose={onclearDate}
          onBlur={showDate}
          icon={<DateIcon size={24} color={Colors.black} />}
        />
    
        <Calender
          isVisible={showDate}
          onClose={() => onCloseDate()}
          onConfirm={onConfirmDate}
          value={
            moment(date, 'DD/MM/YYYY', true).isValid()
              ? moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
              : undefined
          }
        />
        <Botton title="Create" onHandler={handleSubmit(onSubmit)} style={styles.button} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  marginTop: {
    marginTop: 10,
  },

  button: {
    marginTop: '10%',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});