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

// входная точка для добавления нового слайса сущности
// сущность должна иметь поле id!
// при изменении необходимо также обновить:
// 1. entitiesNamesSingularDictionary
// 2. entitiesNamesPluralDictionary
// 3. entitiesIdsNamesDictionary
// 4. entitiesSlices
export type Entities = {
  movie: Movie
  genre: Genre
  image: Image
  favorite: Favorite
}

export type EntitiesNamesSingular = {
  [key in keyof Entities]: typeof entitiesNamesSingularDictionary[key]
}

// для получения из имени сущности во мн. числе имя сущности в ед. числе
export type EntitiesNamesSingularByPlural = {
  [key in keyof Entities as typeof entitiesNamesPluralDictionary[key]]: key
}

export type EntitiesNamesPlural = {
  [key in keyof Entities as typeof entitiesNamesPluralDictionary[key]]: typeof entitiesNamesPluralDictionary[key]
}

export type EntitiesIdsNames = {
  [key in keyof typeof ENTITIES_NAMES_SINGULAR as `${key}Id`]: typeof entitiesIdsNamesDictionary[key]
}

// типы Id сущностей
export type EntitiesIds = {
  [key in keyof Entities]: PickEntityIdType<Entities[key]>
}

// типы Id сущностей в виде: { movieId: MovieId }
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
