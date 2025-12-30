import {View, StyleSheet} from 'react-native';
import React from 'react';
import useBuyers from '@/hooks/useBuyers';
import {RootStackParamList} from '@/navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors, Shadows} from '@/theme';
import Header from '@/navigation/Header';
import Table from '@/component/Table';

type Props = NativeStackScreenProps<RootStackParamList, 'Buyers'>;

export default function Buyers(
  route: Props,
) {
  const {item} = useBuyers(route);
  return (
    <View style={styles.container}>
      <Header title={item?.label} showBack={true} />
      <Table onClickEdit={()=>console.log()} onClickDelete={()=>console.log()} >
        <View>
            
        </View>
      </Table>
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
