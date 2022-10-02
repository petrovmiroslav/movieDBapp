import {TextInput, TextInputProps} from 'react-native'
import React, {useMemo} from 'react'
import {styles} from './Input.styles'

export type InputProps = {} & TextInputProps
const Input = React.forwardRef<TextInput, InputProps>(
  ({style, ...restTextInputProps}, ref) => {
    const _style = useMemo(() => [styles.input, style], [style])

    return (
      <TextInput
        ref={ref}
        style={_style}
        placeholderTextColor={styles.inputPlaceholder.color}
        {...restTextInputProps}
      />
    )
  },
)
export default React.memo(Input)
