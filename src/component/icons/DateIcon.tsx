import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

type Props = SvgProps & {
  size?: number;
  color?: string;
};

export default function DateIcon({size = 24, color = '#000', ...props}: Props) {
  return (
    <Svg
    stroke={color}
    fill="none"
    strokeWidth={2}
    viewBox="0 0 24 24"
    height={size}
    width={size}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </Svg>
  );
}


