import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
  Platform,
} from 'react-native'
import React, {useMemo} from 'react'
import {styles} from './KeyboardAvoidingView.styles'

export type KeyboardAvoidingViewProps = {} & RNKeyboardAvoidingViewProps
const KeyboardAvoidingView = ({
  style,
  ...restKeyboardAvoidingViewProps
}: KeyboardAvoidingViewProps) => {
  const _style = useMemo(() => [styles.KeyboardAvoidingView, style], [style])
  return (
    <RNKeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior={'padding'}
      style={_style}
      {...restKeyboardAvoidingViewProps}
    />
  )
}
export default React.memo(KeyboardAvoidingView)
