import {MovieId} from './movies.types'
import {moviesAdapter} from './movies.slice'
import {State} from '../../store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../../../utils/selectors'
import createCachedSelector from 're-reselect'
import {getPrimitiveValuesOnly} from '../../../utils/types'

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
