import React, {useMemo} from 'react'

import {StyleProp, Text, TextStyle} from 'react-native'
import {styles} from './TitleMovieCardHorizontal.styles'
import {Movie} from '../../../store/entities/movies/movies.types'

export type TitleMovieCardHorizontalProps = {
  title: Movie['title']
  style?: StyleProp<TextStyle>
}
const TitleMovieCardHorizontal = ({
  title,
  style,
}: TitleMovieCardHorizontalProps) => {
  const _style = useMemo(() => [styles.title, style], [style])
  return (
    <Text style={_style} numberOfLines={1}>
      {title}
    </Text>
  )
}
export default React.memo(TitleMovieCardHorizontal)
