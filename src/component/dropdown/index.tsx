import React, { useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
    import {Feather} from '@/component/icons/VectorIcon';
import { Colors, FontFamily, FontSizes } from '@/theme';

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [_isFocused, setIsFocused] = useState(false);

    const renderItem = (item:{label:string, value:string}) => {
      const isSelected = item.value === value;
      return (
        <View
          style={[
            styles.item,
            {backgroundColor: isSelected ? Colors.blue_100 : Colors.white},
          ]}>
          <Text
            style={[
              styles.textItem,
              {color: isSelected ? Colors.blue : Colors.black},
            ]}>
            {item.label}
          </Text>
          {item.value === value && (
            <Feather
              style={styles.icon}
              color={Colors.blue}
              name="check"
              size={25}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        iconColor={Colors.black}
        data={data}
        activeColor={Colors.white}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select..."
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        renderItem={renderItem}
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
        width: '95%',
        alignSelf: 'center',
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:2,
      marginBottom: '2%',
      borderRadius: 8,
    },
    textItem: {
      flex: 1,
      fontSize: FontSizes.medium,
      fontFamily: FontFamily.medium,
      color: Colors.black,
    },
    placeholderStyle: {
        fontSize: FontSizes.medium,
        fontFamily: FontFamily.medium,
        color: Colors.gray_300,
        },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 25,
      height: 25,
    },

  });
