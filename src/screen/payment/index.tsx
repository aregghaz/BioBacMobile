import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/theme';
import Header from '@/navigation/Header';
import {t} from '@/locales';
import DropdownComponent from '@/component/dropdown';
import Calender from '@/component/calender';
import TextView from '@/component/view/TextView';
import TouchableView from '@/component/view/TouchableView';
import usePayment from '@/hooks/usePayment';
import TextInput from '@/component/input/TextInput';
import Button from '@/component/button';
import DateIcon from '@/component/icons/DateIcon';
export default function Payment() {
  const {showDate, onOpenDate, onCloseDate, onConfirmDate, date} = usePayment();
  return (
    <View style={styles.container}>
      <Header title={t('payment.title')} showBack={true} />
      <TextView title="Date" style={styles.marginTop} />
      <TouchableView
        title={date}
        style={styles.marginTop}
        onPress={onOpenDate}
        onBlur={showDate}
        icon={<DateIcon size={24} color={Colors.black} />}
      />
      <TextView title="Account" style={styles.marginTop} />
      <DropdownComponent style={styles.marginTop} />
      <Calender
        isVisible={showDate}
        onClose={() => onCloseDate()}
        onConfirm={onConfirmDate}
      />
      <TextView title="Amount" style={styles.marginTop} />
      <TextInput
        placeholder="0"
        containerStyle={styles.marginTop}
        inputSize="medium"
        keyboard="numeric"
      />
      <View style={styles.buttonContainer}>
      <Button title="Discard" onHandler={() => console.log('submit')} style={[styles.button, styles.discardButton]} textStyle={{color: Colors.red}} />
      <Button title="Create" onHandler={() => console.log('submit')} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  marginTop: {
    marginTop: 10,
  },
  buttonContainer: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    position: 'absolute',
    bottom: 30,
  },
  button: {
    width: '45%',
  },
  discardButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.red
  },
});
