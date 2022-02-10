import {State} from '../store/store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../utils/selectors'
import {genresAdapter} from '../store/entities/genres/genres.slice'
import createCachedSelector from 're-reselect'
import {movieByIdSelector, MovieIdParam} from './movies.selectors'
import {Genre} from '../store/entities/genres/genres.types'
import {createSelector} from '@reduxjs/toolkit'
import {getEntityId} from '../utils/store'

export const genresSelectors = genresAdapter.getSelectors(
  (state: State) => state.entities.genres,
)

export const {
  /** Возвращает Genre по Id*/
  byIdSelector: genreByIdSelector,
  selectById: selectGenreById,
  /** Возвращает список всех Genre*/
  allListSelector: allGenresListSelector,
  /** Возвращает словарь всех Genre*/
  allEntitiesSelector: allGenreEntitiesSelector,
} = createEntityReSelectors(genresSelectors)

/** Возвращает список GenreId жанров по MovieId*/
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

/** Возвращает список имен жанров по MovieId*/
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

/** Возвращает список Genre отсортированный по name*/
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

/** Возвращает список GenreId отсортированный по name*/
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
