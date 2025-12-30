import React from 'react';
import type {SvgProps} from 'react-native-svg';
import EditSvg from '@/assets/svg/Edit.svg';

type Props = SvgProps & {
  size?: number;
};

export default function EditIcon({size = 20, width, height, ...rest}: Props) {
  return <EditSvg width={width ?? size} height={height ?? size} {...rest} />;
}


