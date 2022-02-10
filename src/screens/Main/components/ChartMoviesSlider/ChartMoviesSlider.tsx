import React, {useCallback} from 'react'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import MoviesSlider, {
  MoviesSliderProps,
} from '../../../../components/MoviesSlider/MoviesSlider'
import {FlatListProps} from 'react-native'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../../../store/store'
import {selectMovieIdsListByQueryKey} from '../../../../selectors/movies.selectors'
import {selectPaginationQueryKeyDataPrimitiveValues} from '../../../../selectors/pagination.selectors'
import {PaginationQueryKey} from '../../../../store/pagination/pagination.types'
import {PaginationApiParams} from '../../../../api/pagination/pagination.types'
import {styles} from './ChartMoviesSlider.styles'

export type ChartMoviesSliderProps = {
  headerText: string
  paginationQueryKey: PaginationQueryKey
  apiFunc: (params: PaginationApiParams) => any
} & Pick<MoviesSliderProps, 'movieIdsList' | 'onMovieButtonPress'>
const ChartMoviesSlider = ({
  headerText,
  paginationQueryKey,
  movieIdsList,
  apiFunc,
  onMovieButtonPress,
}: ChartMoviesSliderProps) => {
  const dispatch = useDispatch<Dispatch>()

  const moviesIdsList = useSelector(
    selectMovieIdsListByQueryKey(paginationQueryKey),
    shallowEqual,
  )

  const {page = 1, totalPages = 1} =
    useSelector(
      selectPaginationQueryKeyDataPrimitiveValues('movies', paginationQueryKey),
      shallowEqual,
    ) ?? {}

  const onEndReachedHandler = useCallback<
    NonNullable<
      FlatListProps<NonNullable<typeof moviesIdsList>[number]>['onEndReached']
    >
  >(() => {
    if (totalPages <= page) return
    dispatch(apiFunc({page: page + 1}))
  }, [apiFunc, dispatch, page, totalPages])

  //console.log('ChartMoviesSlider RENDER', {headerText, movieIdsList})
  if (!movieIdsList?.length) return null
  return (
    <>
      <SectionHeader style={styles.header}>{headerText}</SectionHeader>
      <MoviesSlider
        style={styles.slider}
        movieIdsList={movieIdsList}
        onEndReached={onEndReachedHandler}
        onMovieButtonPress={onMovieButtonPress}
      />
    </>
  )
}
export default React.memo(ChartMoviesSlider)
