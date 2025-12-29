import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/theme/Colors';
import VerticalFlatList from '@/component/list/VerticalFlatList';
import HomeList from './_component/HomeList';
import useHome from '@/hooks/useHome';

export default function Home() {
  const {} = useHome();
  const data = [
    {
      id: 1,
      title: 'Home',
    },
    {
      id: 2,
      title: 'Settings',
    },
    {
      id: 3,
      title: 'Settings',
    },
    {
      id: 4,
      title: 'Settings',
    },
    {
      id: 5,
      title: 'Settings',
    },
    {
      id: 6,
      title: 'Settings',
    },
    {
      id: 7,
      title: 'Settings',
    },
    {
      id: 8,
      title: 'Settings',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.linstContainer}>
        <VerticalFlatList
          data={data}
          gap={20}
          columns={2}
          renderItem={({item}) => <HomeList item={item} />}
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
  linstContainer: {
    width: '93%',
    alignSelf: 'center',
  },
});
