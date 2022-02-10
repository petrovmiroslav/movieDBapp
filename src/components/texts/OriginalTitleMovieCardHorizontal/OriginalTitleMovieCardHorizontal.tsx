import React, {useMemo} from 'react'

import {StyleProp, Text, TextStyle} from 'react-native'
import {styles} from './OriginalTitleMovieCardHorizontal.styles'
import {Movie} from '../../../store/entities/movies/movies.types'

export type OriginalTitleMovieCardHorizontalProps = {
  originalTitle: Movie['originalTitle']
  style?: StyleProp<TextStyle>
}
const OriginalTitleMovieCardHorizontal = ({
  originalTitle,
  style,
}: OriginalTitleMovieCardHorizontalProps) => {
  const _style = useMemo(() => [styles.originalTitle, style], [style])
  return (
    <Text style={_style} numberOfLines={1}>
      {originalTitle}
    </Text>
  )
}
export default React.memo(OriginalTitleMovieCardHorizontal)
