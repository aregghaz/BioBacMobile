import { View, StyleSheet } from 'react-native'
import React from 'react'
import useDraft from '@/hooks/useDraft';
import CustomHeader from '@/navigation/Header';
import { Colors } from '@/theme';
import VerticalFlatList from '@/component/list/VerticalFlatList';
import Card from './_component/Card';
import NotFound from '@/component/icons/NotFound';
import DefaultTable from '@/component/Table/defaultTable';
export default function Draft() {
  const { Draft, onSubmitDelete } = useDraft();
  return (
    <View style={styles.container}>
      <CustomHeader title="Draft" showBack={true} />
      {Draft.length === 0 ? (
        <View style={styles.emptyContainer}>
          <NotFound size={120} />
        </View>
      ) : (
           <VerticalFlatList
              data={Draft}
              gap={10}
              columns={1}
              keyExtractor={company => String(company?.name)}
              onEndReachedThreshold={0.3}
              renderItem={({item: company}: {item: any}) => (
                <DefaultTable
                  containerStyle={styles.tableContainer}
                  onClickEdit={() => console.log()}
                  onClickDelete={() => onSubmitDelete(company.id)}
                  
                  >
                  <Card element={company} />
                </DefaultTable>
              )}
            />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tableContainer: {
    marginBottom: 10,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});