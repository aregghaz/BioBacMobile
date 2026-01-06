import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export default function HistoryIcon({size = 25, color = '#000'}: Props) {
  return (
    <Svg
      stroke={color}
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}>
      <Path d="M12 8l0 4l2 2" />
      <Path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </Svg>
  );
}
