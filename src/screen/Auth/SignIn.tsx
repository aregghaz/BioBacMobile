import {View, StyleSheet, ScrollView, Text} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import {Controller} from 'react-hook-form';
import TextInput from '@/component/input/TextInput';
import Botton from '@/component/button';
import useSignIn from '@/hooks/useAuth/useSignIn';
import {FontFamily, FontSizes} from '@/theme';
import {deviceHeight} from '@/helper';
import useExitAppOnBack from '@/component/exitapp';
export default function Login() {
  useExitAppOnBack();
  const { control, handleSubmit, errors, onSubmit, loading, showPass, toggleShowPass } =
    useSignIn();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={[styles.headerTitle,{fontFamily: FontFamily.semiBold}]}>BioBac</Text>
        <Text style={[styles.title]}>Please enter your credentials to sign in!</Text>
        <View style={styles.inputContainerSmallMargin}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                containerStyle={styles.inputContainerSmallMargin}
                onBlur={onBlur}
                placeholder={'Username'}
                handlePasswordIconClick={() => console.log()}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.username?.message}
                inputSize="medium"
              />
            )}
          />
        </View>
        <View style={styles.inputContainerSmallMargin}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                containerStyle={styles.inputContainerSmallMargin}
                onBlur={onBlur}
                placeholder={'Password'}
                rightIcon
                handlePasswordIconClick={toggleShowPass}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                showPass={!showPass}
                inputSize="medium"
              />
            )}
          />
        </View>
        <Botton
          title={'Sign In'}
          onHandler={handleSubmit(onSubmit)}
          style={styles.buttonComponent}
          loading={loading}
          disabled={loading}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainerSmallMargin: {
    marginTop: 10,
  },
  buttonComponent: {
    marginTop: '10%',
  },
  title: {
    marginLeft: '6%',
    marginTop: '10%',
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.medium,
  },
  headerTitle: {
    marginTop: deviceHeight / 6,
    textAlign: 'center',
    fontSize:40,
  },
});
