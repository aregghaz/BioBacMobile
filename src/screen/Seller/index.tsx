import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '@/navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from '@/theme';
import Header from '@/navigation/Header';
import Table from '@/component/Table';
import useSeller from '@/hooks/useSeller';
import Card from './_component/Card';
import Activity from '@/component/ActivityIndicator';
import {deviceHeight} from '@/helper';
import VerticalFlatList from '@/component/list/VerticalFlatList';
import {AllCompanyProps} from '@/types';
import NotFound from '@/component/icons/NotFound';
import {ConfirmDeleteModal} from '@/component/Modal';
import Button from '@/component/button';
import {AntDesign} from '@/component/icons/VectorIcon';
import FilterIcon from '@/component/icons/FilterIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Seller'>;

export default function Seller(route: Props) {
  const {
    item: routeItem,
    loading,
    loadingMore,
    hasNextPage,
    seller,
    loadMore,
    onHandlerHistory,
    visible,
    onSubmitDelete,
    onSubmitCancel,
    onSubmitConfirm,
  } = useSeller(route);
  return (
    <View style={styles.container}>
      <Header title={routeItem?.label} showBack={true} />
      {loading ? (
        <Activity style={styles.activityIndicator} />
      ) : seller.length === 0 ? (
        <View style={styles.emptyContainer}>
          <NotFound size={120} />
        </View>
      ) : (
        <>
        <View style={styles.buttonContainer}>
        <Button
            title="Filter"
            icon={<FilterIcon size={24} color={Colors.gray_400} />}
            onHandler={() => console.log()}
            textStyle={{color: Colors.gray_400}}
            style={styles.filterButton}
          />
          <Button
            titleIcon={<AntDesign name="plus" size={24} color={Colors.white} />}
            onHandler={() => console.log()}
            style={styles.button}
          />
             </View>
          <VerticalFlatList
            data={seller}
            gap={10}
            columns={1}
            keyExtractor={company => String(company?.id ?? '')}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loadingMore ? (
                <Activity style={styles.footerLoading} />
              ) : !hasNextPage && seller.length > 0 ? (
                <Text style={styles.footerText}>No more data</Text>
              ) : null
            }
            renderItem={({item: company}: {item: AllCompanyProps}) => (
              <Table
                containerStyle={styles.tableContainer}
                onClickHistory={() =>
                  onHandlerHistory(company.id, company.name)
                }
                onClickEdit={() => console.log()}
                onClickDelete={() => onSubmitDelete(company.id)}
                permission={routeItem?.items}
                showDelete={company?.deleted}>
                <Card key={company.id} element={company}/>
              </Table>
            )}
          />
        </>
      )}
      <ConfirmDeleteModal
        isVisible={visible}
        onClose={onSubmitCancel}
        onConfirm={onSubmitConfirm}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  activityIndicator: {
    marginTop: deviceHeight / 3,
  },
  tableContainer: {
    marginBottom: 10,
  },
  footerLoading: {
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.gray_300,
    marginTop: 10,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '15%',
  },
  filterButton: {
    width: '30%',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray_200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
    gap: 10,
    width: '93%',
    alignSelf: 'center',
  },
});
