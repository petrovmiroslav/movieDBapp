import {combineReducers} from '@reduxjs/toolkit'
import {moviesSlice} from './movies/movies.slice'
import {genresSlice} from './genres/genres.slice'
import {imagesSlice} from './images/images.slice'
import {EntitiesReducers} from './entities.types'
import {ENTITIES_NAMES_PLURAL} from '../../constants/entities'
import {favoritesSlice} from './favorites/favorites.slice'

export const entitiesSlices = {
  [ENTITIES_NAMES_PLURAL.movies]: moviesSlice,
  [ENTITIES_NAMES_PLURAL.genres]: genresSlice,
  [ENTITIES_NAMES_PLURAL.images]: imagesSlice,
  [ENTITIES_NAMES_PLURAL.favorites]: favoritesSlice,
}

// для сортировки имен слайсов по алфавиту
export const sortedEntitiesReducersNamesList = Object.keys(
  entitiesSlices,
).sort() as (keyof typeof entitiesSlices)[]

export const entitiesReducers = Object.fromEntries(
  sortedEntitiesReducersNamesList.map(key => [
    key,
    entitiesSlices[key].reducer,
  ]),
) as EntitiesReducers

export const entitiesSlice = {
  name: 'entities',
  reducer: combineReducers(entitiesReducers),
} as const
