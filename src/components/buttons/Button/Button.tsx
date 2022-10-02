import React from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {ACTIVE_OPACITY_DEFAULT} from '../../../constants/styles'

export type ButtonProps = {} & TouchableOpacityProps
const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({...restTouchableOpacityProps}, ref) => (
    <TouchableOpacity
      ref={ref}
      activeOpacity={ACTIVE_OPACITY_DEFAULT}
      {...restTouchableOpacityProps}
    />
  ),
)
export default React.memo(Button)
