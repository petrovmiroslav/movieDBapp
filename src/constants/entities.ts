import {
  EntitiesIdsNames,
  EntitiesNamesPlural,
  EntitiesNamesSingular,
} from '../store/entities/entities.types'

export const entitiesNamesSingularDictionary = {
  movie: 'movie',
  genre: 'genre',
  image: 'image',
  favorite: 'favorite',
} as const

// Имена сущностей в ед. числе в виде: { movie: 'movie' }
export const ENTITIES_NAMES_SINGULAR =
  entitiesNamesSingularDictionary as EntitiesNamesSingular

export const entitiesNamesPluralDictionary = {
  [ENTITIES_NAMES_SINGULAR.movie]: 'movies',
  [ENTITIES_NAMES_SINGULAR.genre]: 'genres',
  [ENTITIES_NAMES_SINGULAR.image]: 'images',
  [ENTITIES_NAMES_SINGULAR.favorite]: 'favorites',
} as const

// Имена сущностей во мн. числе в виде: { movies: 'movies' }
export const ENTITIES_NAMES_PLURAL = Object.fromEntries(
  Object.values(entitiesNamesPluralDictionary).map(value => [value, value]),
) as EntitiesNamesPlural

export const entitiesIdsNamesDictionary = {
  [ENTITIES_NAMES_SINGULAR.movie]: 'movieId',
  [ENTITIES_NAMES_SINGULAR.genre]: 'genreId',
  [ENTITIES_NAMES_SINGULAR.image]: 'imageId',
  [ENTITIES_NAMES_SINGULAR.favorite]: 'favoriteId',
} as const

// Имена Id сущностей в ед. числе в виде: { movieId: 'movieId' }
export const ENTITIES_IDS_NAMES = Object.fromEntries(
  Object.entries(ENTITIES_NAMES_SINGULAR).map(value => [
    value[0] + 'Id',
    value[1] + 'Id',
  ]),
) as EntitiesIdsNames

export const RANDOM_ENTITY_ID_SIZE = 12
