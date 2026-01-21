import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/theme';
import { Controller } from 'react-hook-form';
import TextView from '@/component/view/TextView';
import useSellerCreate from '@/hooks/useSeller/useCreate';
import TextInput from '@/component/input/TextInput';
import Botton from '@/component/button';
import CustomHeader from '@/navigation/Header';

export default function SellerCreate() {
  const { control, handleSubmit, errors, onSubmit } = useSellerCreate();

  return (
    <View style={styles.container}>
      <CustomHeader title={'Company Information'} showBack={true} />
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
      <Botton title="Create" onHandler={handleSubmit(onSubmit)} style={styles.button} />
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
    position: 'absolute',
    bottom: 20,
  },
});