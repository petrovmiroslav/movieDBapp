import React from 'react'
import {SvgProps as RNSvgProps} from 'react-native-svg'

export type SvgProps = {
  source: React.FC<RNSvgProps>
} & RNSvgProps
const Svg = ({source, ...props}: SvgProps) => {
  return React.createElement(source, props)
}
export default React.memo(Svg)
