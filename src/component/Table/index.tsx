import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Shadows} from '@/theme';
import Button from '@/component/button';
import DeleteIcon from 'react-native-vector-icons/Ionicons';
import EditIcon from '@/component/icons/EditIcon';


type Props = {
  onClickEdit: () => void;
  onClickDelete: () => void;
  children: React.ReactNode;
};

export default function Table({onClickEdit, onClickDelete, children}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.invoiceContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={onClickEdit}>
            <EditIcon size={24} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={onClickDelete}>
            <DeleteIcon name="trash-outline" size={24} color={Colors.red} />
          </TouchableOpacity>
        </View>
        {children}
        <Button
          title="Create"
          onHandler={() => console.log()}
          style={styles.button}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    width: '93%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    ...Shadows.sm,
  },
  invoiceContainer: {
    width: '100%',
    backgroundColor: Colors.gray_100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  button: {
    marginBottom: 10,
  },
});
