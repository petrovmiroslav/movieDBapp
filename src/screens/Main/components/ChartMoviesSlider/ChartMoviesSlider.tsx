import React, {useCallback} from 'react'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import MoviesSlider, {
  MoviesSliderProps,
} from '../../../../components/MoviesSlider/MoviesSlider'
import {useDispatch} from 'react-redux'
import {Dispatch} from '../../../../store/store'
import {styles} from './ChartMoviesSlider.styles'
import {
  useFetchDataList,
  UseFetchDataListParams,
} from '../../../../hooks/useFetchData'
import {
  EntitiesActionPayload,
  EntitiesIds,
} from '../../../../store/entities/entities.types'
import {getEntityId} from '../../../../utils/store'
import {PaginationApiParams} from '../../../../api/pagination/pagination.types'
import {ResponseError} from '../../../../api/api.types'

export type ChartMoviesSliderProps = {
  headerText: string
  apiFunc: (
    params: PaginationApiParams,
  ) => (
    dispatch: Dispatch,
  ) => Promise<EntitiesActionPayload<'movies'> | ResponseError | undefined>
} & Pick<
  MoviesSliderProps,
  'onMovieButtonPress' | 'movieCardTestID' | 'movieTitleTestID'
>
const ChartMoviesSlider = ({
  headerText,
  apiFunc,
  onMovieButtonPress,
  movieCardTestID,
  movieTitleTestID,
}: ChartMoviesSliderProps) => {
  const dispatch = useDispatch<Dispatch>()

  const fetchPopularMoviesFunc = useCallback<
    UseFetchDataListParams<EntitiesIds['movie']>['fetchDataListFunc']
  >(
    async page => {
      const res = await dispatch(apiFunc({page}))
      const movies = res && 'entities' in res ? res.entities.movies : undefined
      if (!movies) return
      return movies.map(getEntityId)
    },
    [apiFunc, dispatch],
  )

  const {dataList: moviesIdsList, loadMoreData} = useFetchDataList({
    fetchDataListFunc: fetchPopularMoviesFunc,
  })

  //console.log('ChartMoviesSlider RENDER', {headerText, movieIdsList})
  if (!moviesIdsList?.length) return null
  return (
    <>
      <SectionHeader style={styles.header}>{headerText}</SectionHeader>
      <MoviesSlider
        style={styles.slider}
        movieIdsList={moviesIdsList}
        onEndReached={loadMoreData}
        onMovieButtonPress={onMovieButtonPress}
        movieCardTestID={movieCardTestID}
        movieTitleTestID={movieTitleTestID}
      />
    </>
  )
}
export default React.memo(ChartMoviesSlider)
