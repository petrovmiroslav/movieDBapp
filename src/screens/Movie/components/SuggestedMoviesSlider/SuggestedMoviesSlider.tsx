import React, {useCallback} from 'react'
import MoviesSlider, {
  MoviesSliderProps,
} from '../../../../components/MoviesSlider/MoviesSlider'
import {useDispatch} from 'react-redux'
import {Dispatch} from '../../../../store/store'
import {MovieId} from '../../../../store/entities/movies/movies.types'
import {styles as movieScreenStyles} from '../../MovieScreen.styles'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import {styles} from './SuggestedMoviesSlider.styles'
import {
  useFetchDataList,
  UseFetchDataListParams,
} from '../../../../hooks/useFetchData'
import {
  EntitiesActionPayload,
  EntitiesIds,
} from '../../../../store/entities/entities.types'
import {getEntityId} from '../../../../utils/store'
import {
  FetchRecommendationsMoviesApiParams,
  FetchSimilarMoviesApiParams,
} from '../../../../api/movies/movies.types'
import {ResponseError} from '../../../../api/api.types'

export type SuggestedMoviesSliderProps = {
  movieId: MovieId
  headerText: string
  apiFunc: (
    params: FetchRecommendationsMoviesApiParams | FetchSimilarMoviesApiParams,
  ) => (
    dispatch: Dispatch,
  ) => Promise<EntitiesActionPayload<'movies'> | ResponseError | undefined>
} & Pick<MoviesSliderProps, 'onMovieButtonPress'>
const SuggestedMoviesSlider = ({
  movieId,
  onMovieButtonPress,
  apiFunc,
  headerText,
}: SuggestedMoviesSliderProps) => {
  const dispatch = useDispatch<Dispatch>()

  const fetchMoviesFunc = useCallback<
    UseFetchDataListParams<EntitiesIds['movie']>['fetchDataListFunc']
  >(
    async page => {
      const res = await dispatch(apiFunc({movieId, page}))
      const movies = res && 'entities' in res ? res.entities.movies : undefined
      if (!movies) return
      return movies.map(getEntityId)
    },
    [apiFunc, dispatch, movieId],
  )

  const {dataList: moviesIdsList, loadMoreData} = useFetchDataList({
    fetchDataListFunc: fetchMoviesFunc,
  })

  //console.log('SuggestedMoviesSlider RENDER', {page, totalPages})
  if (!moviesIdsList?.length) return null
  return (
    <>
      <SectionHeader style={movieScreenStyles.sectionHeader}>
        {headerText}
      </SectionHeader>
      <MoviesSlider
        style={styles.slider}
        movieIdsList={moviesIdsList}
        onMovieButtonPress={onMovieButtonPress}
        onEndReached={loadMoreData}
      />
    </>
  )
}
export default React.memo(SuggestedMoviesSlider)
