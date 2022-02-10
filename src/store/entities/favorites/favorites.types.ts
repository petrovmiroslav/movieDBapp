import {Brand, StringDate} from '../../../utils/types'
import {EntityId} from '@reduxjs/toolkit'
import {EntitiesActionPayload} from '../entities.types'

export type FavoriteId = Brand<string, 'FavoriteId'>

export enum FAVORITES_TYPES {
  MOVIE = 'movie',
}

export type Favorite = {
  id: FavoriteId
  type?: FAVORITES_TYPES
  entityId?: EntityId
  date?: StringDate
}

export type FavoritesEntitiesPayload = EntitiesActionPayload<'favorites'>
