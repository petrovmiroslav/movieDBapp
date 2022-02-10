import React, {useCallback, useMemo} from 'react'
import MoviesSlider, {
  MoviesSliderProps,
} from '../../../../components/MoviesSlider/MoviesSlider'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {selectMovieIdsListByQueryKey} from '../../../../selectors/movies.selectors'
import {PAGINATION_QUERY_KEY_ROOTS} from '../../../../store/pagination/pagination.types'
import {selectPaginationQueryKeyDataPrimitiveValues} from '../../../../selectors/pagination.selectors'
import {getPaginationQueryKey} from '../../../../store/pagination/pagination.slice'
import {Dispatch} from '../../../../store/store'
import {FlatListProps} from 'react-native'
import {
  fetchRecommendationsMovies,
  fetchSimilarMovies,
} from '../../../../thunks/movies.thunks'
import {MovieId} from '../../../../store/entities/movies/movies.types'
import {styles as movieScreenStyles} from '../../MovieScreen.styles'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import {styles} from './SuggestedMoviesSlider.styles'

export type SuggestedMoviesSliderProps = {
  movieId: MovieId
  suggestedType: Extract<
    PAGINATION_QUERY_KEY_ROOTS,
    | PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES
    | PAGINATION_QUERY_KEY_ROOTS.SIMILAR_MOVIES
  >
} & Pick<MoviesSliderProps, 'onMovieButtonPress'>
const SuggestedMoviesSlider = ({
  movieId,
  suggestedType,
  onMovieButtonPress,
}: SuggestedMoviesSliderProps) => {
  const dispatch = useDispatch<Dispatch>()

  const headerText = useMemo(() => {
    if (suggestedType === PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES)
      return 'Рекомендации'
    return 'Похожие'
  }, [suggestedType])

  const paginationQueryKey = useMemo(
    () =>
      getPaginationQueryKey(suggestedType, {
        movieId,
      }),
    [movieId, suggestedType],
  )

  const suggestedMoviesIdsList = useSelector(
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
      FlatListProps<
        NonNullable<typeof suggestedMoviesIdsList>[number]
      >['onEndReached']
    >
  >(() => {
    if (totalPages <= page) return
    dispatch(
      (suggestedType === PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES
        ? fetchRecommendationsMovies
        : fetchSimilarMovies)({movieId, page: page + 1}),
    )
  }, [dispatch, movieId, page, suggestedType, totalPages])

  //console.log('SuggestedMoviesSlider RENDER', {page, totalPages})
  if (!suggestedMoviesIdsList?.length) return null
  return (
    <>
      <SectionHeader style={movieScreenStyles.sectionHeader}>
        {headerText}
      </SectionHeader>
      <MoviesSlider
        style={styles.slider}
        movieIdsList={suggestedMoviesIdsList}
        onMovieButtonPress={onMovieButtonPress}
        onEndReached={onEndReachedHandler}
      />
    </>
  )
}
export default React.memo(SuggestedMoviesSlider)
