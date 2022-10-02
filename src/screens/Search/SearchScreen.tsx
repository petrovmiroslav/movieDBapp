import React, {useCallback, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {Animated, ListRenderItem, RefreshControl} from 'react-native'
import {styles} from './SearchScreen.styles'
import {SearchMoviesApiParams} from '../../api/movies/movies.types'
import {searchMovies} from '../../store/entities/movies/movies.thunks'
import {Dispatch} from '../../store/store'
import SearchMovieItem from './components/SearchMovieItem/SearchMovieItem'
import {EntitiesIds} from '../../store/entities/entities.types'
import {getEntityId} from '../../utils/store'
import {useDebounce} from '../../hooks/useDebounce'
import {useDefaultScreenHeaderAnimation} from '../../hooks/useDefaultScreenHeaderAnimation'
import ScreenHeaderSection, {
  ScreenHeaderSectionProps,
} from './components/ScreenHeaderSection/ScreenHeaderSection'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView/KeyboardAvoidingView'
import {ON_END_REACHED_THRESHOLD_DEFAULT} from '../../constants/virtualizedLists'
import {
  useFetchDataList,
  UseFetchDataListParams,
} from '../../hooks/useFetchData'
import {keyExtractorForId} from '../../utils/virtualizedLists'

const SearchScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const {
    screenHeaderHeight,
    setScreenHeaderHeight,
    screenHeaderShadowStyle,
    onScreenScrollHandler,
  } = useDefaultScreenHeaderAnimation()

  const {baseUrl, sizePart} = useImageUri({
    imageType: IMAGE_TYPES.POSTERS,
  })

  const [queryParam, setQueryParam] = React.useState('')
  const updateQueryParamFunc = useDebounce(setQueryParam)

  const contentContainerStyle = useMemo(
    () => [
      styles.container,
      {paddingTop: styles.container.paddingTop + screenHeaderHeight},
    ],
    [screenHeaderHeight],
  )

  const searchMoviesParams = useMemo<SearchMoviesApiParams>(
    () => ({query: queryParam.trim()}),
    [queryParam],
  )

  const onSearchInputChangeTextHandler = useCallback<
    ScreenHeaderSectionProps['onSearchInputChangeText']
  >(
    value => {
      if (!value) {
        updateQueryParamFunc.cancel()
        return setQueryParam(value)
      }
      updateQueryParamFunc(value)
    },
    [updateQueryParamFunc],
  )

  const renderSearchMovieItem = useCallback<
    ListRenderItem<NonNullable<typeof searchMoviesIdsList>[number]>
  >(
    ({item}) => (
      <SearchMovieItem
        key={item}
        movieId={item}
        baseUrl={baseUrl}
        sizePart={sizePart}
      />
    ),
    [baseUrl, sizePart],
  )

  const fetchSearchMovies = useCallback<
    UseFetchDataListParams<EntitiesIds['movie']>['fetchDataListFunc']
  >(
    async page => {
      const res = await dispatch(searchMovies({...searchMoviesParams, page}))
      const movies = res && 'entities' in res ? res.entities.movies : undefined
      if (!movies) return
      return movies.map(getEntityId)
    },
    [dispatch, searchMoviesParams],
  )

  const {
    dataList: searchMoviesIdsList,
    isRefreshing,
    loadMoreData,
    onRefresh,
  } = useFetchDataList({
    fetchDataListFunc: fetchSearchMovies,
  })

  // console.log('SearchScreen RENDER', {})
  return (
    <KeyboardAvoidingView>
      <ScreenHeaderSection
        setScreenHeaderHeight={setScreenHeaderHeight}
        screenHeaderShadowStyle={screenHeaderShadowStyle}
        onSearchInputChangeText={onSearchInputChangeTextHandler}
      />

      <Animated.FlatList
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={searchMoviesIdsList}
        renderItem={renderSearchMovieItem}
        keyExtractor={keyExtractorForId}
        onScroll={onScreenScrollHandler}
        onEndReached={loadMoreData}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD_DEFAULT}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            progressViewOffset={screenHeaderHeight}
          />
        }
      />
    </KeyboardAvoidingView>
  )
}
export default React.memo(SearchScreen)
