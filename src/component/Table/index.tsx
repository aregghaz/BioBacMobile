import {View, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {Colors, Shadows} from '@/theme';
import Button from '@/component/button';
import DeleteIcon from 'react-native-vector-icons/Ionicons';
import EditIcon from '@/component/icons/EditIcon';
import { Permission } from '@/permissions/engine';
import { hasPermission } from '@/permissions/hasPermission';
import { MaterialIcons } from '../icons/VectorIcon';

type Props = {
  onClickEdit: () => void;
  onClickDelete: () => void;
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  permission?: Permission[];
};

enum UserPermission {
  CREATE = 'COMPANY_SELLER_CREATE',
  UPDATE = 'COMPANY_SELLER_UPDATE',
  DELETE = 'COMPANY_SELLER_DELETE',
}

export default function Table({onClickEdit, onClickDelete, children, containerStyle, permission}: Props) {
  const canEdit = hasPermission(permission, UserPermission.UPDATE);
  const canDelete = hasPermission(permission, UserPermission.DELETE);
  const canCreate = hasPermission(permission, UserPermission.CREATE);
  return (
      <View style={[styles.contentContainer, containerStyle]}>
        <View style={styles.invoiceContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log()}>
          <MaterialIcons name="history" size={24} color={Colors.black} />
          </TouchableOpacity>
           {canEdit && <TouchableOpacity activeOpacity={0.8} onPress={onClickEdit}>
            <EditIcon size={24} />
          </TouchableOpacity>}
          {canDelete && <TouchableOpacity activeOpacity={0.8} onPress={onClickDelete}>
            <DeleteIcon name="trash-outline" size={24} color={Colors.red} />
          </TouchableOpacity>}
        </View>
        {children}
        {canCreate && <Button
          title="Create"
          onHandler={() => console.log()}
          style={styles.button}
        />
        }
      </View>
  );
}
const styles = StyleSheet.create({

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
