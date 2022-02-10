import {Text, TextProps} from 'react-native'
import React from 'react'
import {styles} from './SectionHeader.styles'
import {styleSheetCompose} from '../../../utils/styles'

export type SectionHeaderProps = {} & TextProps
const SectionHeader = ({style, ...restTextProps}: SectionHeaderProps) => {
  return (
    <Text style={styleSheetCompose(styles.header, style)} {...restTextProps} />
  )
}
export default React.memo(SectionHeader)
