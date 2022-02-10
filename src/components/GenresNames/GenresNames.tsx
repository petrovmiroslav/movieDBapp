import React, {useMemo} from 'react'
import {Text, TextProps} from 'react-native'
import {Genre} from '../../store/entities/genres/genres.types'

export type GenresNamesProps = {
  genresNamesList: Genre['name'][] | undefined
} & TextProps
const GenresNames = ({genresNamesList, ...restTextProps}: GenresNamesProps) => {
  const genresNames = useMemo(
    () => genresNamesList?.join(', '),
    [genresNamesList],
  )
  return (
    <Text numberOfLines={1} {...restTextProps}>
      {genresNames}
    </Text>
  )
}
export default React.memo(GenresNames)
