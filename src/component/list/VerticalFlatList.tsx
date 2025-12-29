import React, {useMemo} from 'react';
import {
  FlatList,
  type FlatListProps,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
  View,
  StyleSheet,
} from 'react-native';

type RenderChild<T> = (item: T, index: number) => React.ReactNode;

type BaseProps<T> = Omit<
  FlatListProps<T>,
  'renderItem' | 'data' | 'contentContainerStyle' | 'numColumns'
> & {
  data: ReadonlyArray<T> | null | undefined;
  contentContainerStyle?: StyleProp<ViewStyle>;
  columns?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
};

type WithRenderItem<T> = BaseProps<T> & {
  renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement | null;
  children?: never;
};

type WithChildren<T> = BaseProps<T> & {
  renderItem?: never;
  children: RenderChild<T>;
};

export type VerticalFlatListProps<T> = WithRenderItem<T> | WithChildren<T>;

export default function VerticalFlatList<T>(props: VerticalFlatListProps<T>) {
  const data = (props.data ?? []) as ReadonlyArray<T>;
  const columns = Math.max(1, Number((props as any).columns ?? 1) || 1);
  const columnGap = Number((props as any).columnGap ?? (props as any).gap ?? 0) || 0;
  const rowGap = Number((props as any).rowGap ?? (props as any).gap ?? 0) || 0;

  const renderItem = useMemo(() => {
    if ('renderItem' in props && props.renderItem) {
      return props.renderItem;
    }
    const child = (props as WithChildren<T>).children;
    return ({item, index}: ListRenderItemInfo<T>) => child(item, index) as any;
  }, [props]);

  const renderItemWithSpacing = useMemo(() => {
    if (!columnGap && !rowGap) {
      return renderItem;
    }

    return (info: ListRenderItemInfo<T>) => {
      const element = (renderItem as any)(info) as React.ReactElement | null;
      if (!element) {
        return element;
      }

      // اگر grid باشد، فاصله افقی هم داریم
      const isEndOfRow = columns <= 1 ? true : (info.index + 1) % columns === 0;
      const spacingStyle: ViewStyle = {
        marginRight: columns > 1 && !isEndOfRow ? columnGap : 0,
        marginBottom: rowGap,
      };

      return (
        <View
          style={[
            styles.itemWrapper,
            columns > 1 ? styles.gridItem : null,
            spacingStyle,
          ]}>
          {element}
        </View>
      );
    };
  }, [columnGap, rowGap, renderItem, columns]);

  return (
    <FlatList
      {...props}
      data={data as any}
      numColumns={columns}
      key={`columns-${columns}`}
      renderItem={renderItemWithSpacing as any}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator ?? false}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps ?? 'handled'}
    />
  );
}

const styles = StyleSheet.create({
  itemWrapper: {},
  gridItem: {flex: 1},
});


