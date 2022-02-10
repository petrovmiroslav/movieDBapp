import React, {useMemo} from 'react'
import {styles} from './GenresNamesMovieCardHorizontal.styles'
import GenresNames, {GenresNamesProps} from '../../GenresNames/GenresNames'

export type GenresNamesMovieCardHorizontalProps = {} & GenresNamesProps
const GenresNamesMovieCardHorizontal = ({
  style,
  ...restGenresNamesProps
}: GenresNamesMovieCardHorizontalProps) => {
  const _style = useMemo(() => [styles.genres, style], [style])
  return <GenresNames style={_style} {...restGenresNamesProps} />
}
export default React.memo(GenresNamesMovieCardHorizontal)
