import {Movie} from './movies/movies.types'
import {Genre} from './genres/genres.types'
import {Image} from './images/images.types'
import {entitiesSlices} from './entities.slice'
import {
  ENTITIES_NAMES_SINGULAR,
  entitiesIdsNamesDictionary,
  entitiesNamesPluralDictionary,
  entitiesNamesSingularDictionary,
} from '../../constants/entities'
import {Favorite} from './favorites/favorites.types'
import {EntityId} from '@reduxjs/toolkit'

/** the entry point for adding a new entity slice
An entity has to have id.
 Editing it, you have to update:
1. entitiesNamesSingularDictionary
2. entitiesNamesPluralDictionary
3. entitiesIdsNamesDictionary
4. entitiesSlices **/
export type Entities = {
  movie: Movie
  genre: Genre
  image: Image
  favorite: Favorite
}

export type EntitiesNamesSingular = {
  [key in keyof Entities]: typeof entitiesNamesSingularDictionary[key]
}

// to get singular entity name by plural
export type EntitiesNamesSingularByPlural = {
  [key in keyof Entities as typeof entitiesNamesPluralDictionary[key]]: key
}

export type EntitiesNamesPlural = {
  [key in keyof Entities as typeof entitiesNamesPluralDictionary[key]]: typeof entitiesNamesPluralDictionary[key]
}

export type EntitiesIdsNames = {
  [key in keyof typeof ENTITIES_NAMES_SINGULAR as `${key}Id`]: typeof entitiesIdsNamesDictionary[key]
}

// entities ids
export type EntitiesIds = {
  [key in keyof Entities]: PickEntityIdType<Entities[key]>
}

// entities' ids { movieId: MovieId }
export type EntitiesIdsDictionary = {
  [key in keyof Entities as typeof entitiesIdsNamesDictionary[key]]?: EntitiesIds[key]
}

export type PickEntitiesActionPayload<
  EntityName extends keyof EntitiesNamesPlural,
> = {
  [key in EntityName]: Entities[EntitiesNamesSingularByPlural[key]][]
}

export type EntitiesActionPayload<
  EntityName extends keyof EntitiesNamesPlural,
> = {
  entities: PickEntitiesActionPayload<EntityName>
}

export type PickEntityIdType<Entity extends Entities[keyof Entities]> =
  Entity['id']

export type EntitiesReducers = {
  [key in keyof EntitiesNamesPlural]: typeof entitiesSlices[key]['reducer']
}

export type EntityIdParam = EntityId | undefined
