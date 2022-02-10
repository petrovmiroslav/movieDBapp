import React from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {DEFAULT_ACTIVE_OPACITY} from '../../../constants/styles'

export type ButtonProps = {} & TouchableOpacityProps
const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({...restTouchableOpacityProps}, ref) => (
    <TouchableOpacity
      ref={ref}
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
      {...restTouchableOpacityProps}
    />
  ),
)
export default React.memo(Button)
