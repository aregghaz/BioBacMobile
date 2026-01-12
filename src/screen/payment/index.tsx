import {View, StyleSheet, ScrollView} from 'react-native';
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
import moment from 'moment';
import {Controller} from 'react-hook-form';
import {DefaultModal} from '@/component/Modal';

export default function Payment() {
  const {
    showDate,
    onOpenDate,
    onCloseDate,
    onConfirmDate,
    date,
    account,
    typeName,
    onSubmitFilterList,
    listType,
    onSubmitFilterCategory,
    categoryLevels,
    onSelectCategoryLevel,
    onSubmit,
    control,
    handleSubmit,
    errors,
    onSubmitDiscard,
    visibleModal,
    onSubmitCancel,
    onSubmitConfirm,
  } = usePayment();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <Header title={t('payment')} showBack={true} />

        <TextView title="Date" style={styles.marginTop} />
        <TouchableView
          title={date}
          style={styles.marginTop}
          onPress={onOpenDate}
          onBlur={showDate}
          icon={<DateIcon size={24} color={Colors.black} />}
        />
        <TextView title="Account" style={styles.marginTop} />
        <Controller
          control={control}
          name="account"
          render={({field: {onChange}}) => (
            <DropdownComponent
              style={styles.marginTop}
              data={account}
              onClick={({value}) => {
                onChange(value);
              }}
              errorMessage={errors.account?.message}
            />
          )}
        />
        <Calender
          isVisible={showDate}
          onClose={() => onCloseDate()}
          onConfirm={onConfirmDate}
          value={moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')}
        />
        <TextView title="Amount" style={styles.marginTop} />
        <Controller
          control={control}
          name="amount"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="0"
              containerStyle={styles.marginTop}
              inputSize="medium"
              keyboard="numeric"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.amount?.message}
            />
          )}
        />

        <TextView title="Type" style={styles.marginTop} />
        <DropdownComponent
          style={styles.marginTop}
          data={typeName}
          onClick={onSubmitFilterList}
        />
        {listType.length > 0 && (
          <>
            <TextView title="List Of Type" style={styles.marginTop} />
            <DropdownComponent
              style={styles.marginTop}
              data={listType}
              onClick={onSubmitFilterCategory}
            />
          </>
        )}
        {categoryLevels.length > 0 &&
          categoryLevels.map((levelOptions, idx) => (
            <React.Fragment key={`cat-level-${idx}`}>
              <TextView
                title={idx === 0 ? 'Category' : `Category Child ${idx}`}
                style={styles.marginTop}
              />
              <DropdownComponent
                style={styles.marginTop}
                data={levelOptions}
                onClick={item => onSelectCategoryLevel(idx, item)}
              />
            </React.Fragment>
          ))}
        <TextView title="Comment" style={styles.marginTop} />
        <Controller
          control={control}
          name="comment"
          render={({field: {onChange, value}}) => (
            <TextInput
              placeholder="Comment"
              containerStyle={styles.marginTop}
              inputSize="medium"
              keyboard="default"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.comment?.message}
            />
          )}
        />
      </ScrollView>

      {/* Fixed footer buttons */}
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Button
            title="Discard"
            onHandler={onSubmitDiscard}
            style={[styles.button, styles.discardButton]}
            textStyle={{color: Colors.red}}
          />
          <Button
            title="Create"
            onHandler={handleSubmit(onSubmit)}
            style={styles.button}
          />
        </View>
      </View>
      <DefaultModal
        isVisible={visibleModal}
        onClose={onSubmitCancel}
        onConfirm={onSubmitConfirm}
        title="Discard changes"
        description="Are you sure you want discard this? This action can't be undo."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  marginTop: {
    marginTop: 10,
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    width: '45%',
  },
  discardButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.red,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
