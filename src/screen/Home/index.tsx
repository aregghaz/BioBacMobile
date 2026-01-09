import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import VerticalFlatList from '@/component/list/VerticalFlatList';
import useHome from '@/hooks/useHome';
import HomeList from './_component/HomeList';
import Activity from '@/component/activityIndicator';
import {HomeListProps} from '@/types';

export default function Home() {
  const {groups, loading, navigateToDetail} = useHome();
  return (
    <View style={styles.container}>
      {loading ? (
        <Activity />
      ) : (
        <View style={styles.linstContainer}>
          <VerticalFlatList
            data={groups}
            gap={10}
            columns={2}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <HomeList
                item={item}
                onCallback={item => navigateToDetail(item as HomeListProps)}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    height: '100%',
  },
  linstContainer: {
    width: '93%',
    alignSelf: 'center',
    height: '100%',
  },
});
