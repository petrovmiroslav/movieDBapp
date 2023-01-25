import {State} from '../../store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../../../utils/selectors'
import {genresAdapter} from './genres.slice'
import createCachedSelector from 're-reselect'
import {movieByIdSelector, MovieIdParam} from '../movies/movies.selectors'
import {Genre} from './genres.types'
import {createSelector} from '@reduxjs/toolkit'
import {getEntityId} from '../../../utils/store'

export const genresSelectors = genresAdapter.getSelectors(
  (state: State) => state.entities.genres,
)

export const {
  /** returns Genre by Id*/
  byIdSelector: genreByIdSelector,
  selectById: selectGenreById,
  /** returns list of all Genre*/
  allListSelector: allGenresListSelector,
  /** returns dict of all Genre*/
  allEntitiesSelector: allGenreEntitiesSelector,
} = createEntityReSelectors(genresSelectors)

/** returns list of GenreId by MovieId*/
const genreIdsListByMovieIdSelector = (() => {
  const selector = createCachedSelector(
    [
      movieByIdSelector,
      // () => {
      //   console.log('genreIdsListByMovieIdSelector IN')
      // },
    ],
    movie => {
      // console.log('genreIdsListByMovieIdSelector OUT')
      if (!movie?.genresIds?.length) return
      return movie.genresIds
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam) => selector(state, movieId)
})()
export const selectGenreIdsListByMovieId =
  (movieId: MovieIdParam) => (state: State) =>
    genreIdsListByMovieIdSelector(state, movieId)

/** returns list of genres names by MovieId*/
const genreNamesListByMovieIdSelector = (() => {
  const selector = createCachedSelector(
    [
      genreIdsListByMovieIdSelector,
      allGenreEntitiesSelector,
      // () => {
      //   console.log('genreNamesListByMovieIdSelector IN')
      // },
    ],
    (genreIdsList, allGenreEntities) => {
      // console.log('genreNamesListByMovieIdSelector OUT')

      return genreIdsList
        ?.map(genreId => allGenreEntities[genreId]?.name)
        .filter(Boolean)
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam) => selector(state, movieId)
})()
export const selectGenreNamesListByMovieId =
  (movieId: MovieIdParam) => (state: State) =>
    genreNamesListByMovieIdSelector(state, movieId)

/** returns list Genre sorted by name*/
const genresListSortedByNameSelector = (() => {
  const selector = createSelector(
    [
      allGenresListSelector,
      // () => {
      //   console.log('genresListSortedByNameSelector IN')
      // },
    ],
    genresList => {
      // console.log('genresListSortedByNameSelector OUT')
      return genresList
        ?.filter(
          (genre): genre is Required<Genre> => typeof genre.name === 'string',
        )
        .sort((genreA, genreB) => genreA.name.localeCompare(genreB.name))
    },
  )

  return (state: State) => selector(state)
})()

/** returns list of GenreId sorted by name*/
export const genreIdsListSortedByNameSelector = (() => {
  const selector = createSelector(
    [
      genresListSortedByNameSelector,
      // () => {
      //   console.log('genreIdsListSortedByNameSelector IN')
      // },
    ],
    genresList => {
      // console.log('genreIdsListSortedByNameSelector OUT')
      return genresList?.map(getEntityId)
    },
  )

  return (state: State) => selector(state)
})()
