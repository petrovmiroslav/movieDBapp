import {Movie, MovieId} from '../store/entities/movies/movies.types'
import {moviesAdapter} from '../store/entities/movies/movies.slice'
import {State} from '../store/store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../utils/selectors'
import createCachedSelector from 're-reselect'
import {PaginationQueryKey} from '../store/pagination/pagination.types'
import {loadedIdsListSelector} from './pagination.selectors'
import {ENTITIES_NAMES_PLURAL} from '../constants/entities'
import {getEntityId} from '../utils/store'
import {getPrimitiveValuesOnly} from '../utils/types'

export type MovieIdParam = MovieId | undefined

export const moviesSelectors = moviesAdapter.getSelectors(
  (state: State) => state.entities.movies,
)

export const {
  /** Возвращает Movie по Id*/
  byIdSelector: movieByIdSelector,
  selectById: selectMovieById,
  /** Возвращает список всех Movie*/
  allListSelector: allMoviesListSelector,
  /** Возвращает словарь всех Movie*/
  allEntitiesSelector: allMoviesEntitiesSelector,
} = createEntityReSelectors(moviesSelectors)

/** Возвращает список Movie по paginationQueryKey*/
export const moviesListByQueryKeySelector = (() => {
  const selector = createCachedSelector(
    [
      loadedIdsListSelector,
      allMoviesEntitiesSelector,
      // () => {
      //   console.log('moviesListByQueryKeySelector IN')
      // },
    ],
    (loadedIdsList, allMoviesEntities) => {
      // console.log('moviesListByQueryKeySelector OUT')
      if (!loadedIdsList?.length) return

      const moviesList = loadedIdsList
        .map(id => allMoviesEntities[id])
        .filter(Boolean) as Movie[]
      if (!moviesList.length) return
      return moviesList
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, paginationQueryKey: PaginationQueryKey) =>
    selector(state, ENTITIES_NAMES_PLURAL.movies, paginationQueryKey)
})()

/** Возвращает список MovieId по paginationQueryKey*/
export const movieIdsListByQueryKeySelector = (() => {
  const selector = createCachedSelector(
    [
      moviesListByQueryKeySelector,
      // () => {
      //   console.log('movieIdsListByQueryKeySelector IN')
      // },
    ],
    moviesList => {
      // console.log('movieIdsListByQueryKeySelector OUT')
      return moviesList?.map(getEntityId)
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, paginationQueryKey: PaginationQueryKey) =>
    selector(state, paginationQueryKey)
})()
export const selectMovieIdsListByQueryKey =
  (paginationQueryKey: PaginationQueryKey) => (state: State) =>
    movieIdsListByQueryKeySelector(state, paginationQueryKey)

/** Возвращает только примитивные значения Movie по MovieId*/
const moviePrimitiveValuesByIdSelector = (() => {
  const selector = createCachedSelector(
    [
      movieByIdSelector,
      // () => {
      //   console.log('moviePrimitiveValuesByIdSelector IN')
      // },
    ],
    movie => {
      // console.log('moviePrimitiveValuesByIdSelector OUT')
      return movie && getPrimitiveValuesOnly(movie)
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam) => selector(state, movieId)
})()
export const selectMoviePrimitiveValuesById =
  (movieId: MovieIdParam) => (state: State) =>
    moviePrimitiveValuesByIdSelector(state, movieId)
