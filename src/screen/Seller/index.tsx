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

type Props = NativeStackScreenProps<RootStackParamList, 'Seller'>;

export default function Seller(route: Props) {
  const {item: routeItem, loading, loadingMore, hasNextPage, seller, loadMore} = useSeller(route);
  return (
    <View style={styles.container}>
      <Header title={routeItem?.label} showBack={true} />
      {loading ? (
        <Activity style={styles.activityIndicator} />
      ) : (
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
              onClickEdit={() => console.log()}
              onClickDelete={() => console.log()}
              permission={routeItem?.items}>
              <Card key={company.id} element={company} />
            </Table>
          )}
        />
      )}
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
});
