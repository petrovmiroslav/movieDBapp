import {
  PaginationApiParams,
  PaginationDto,
} from '../pagination/pagination.types'
import {Favorite} from '../../store/entities/favorites/favorites.types'
import {EntityId} from '@reduxjs/toolkit'

export type FavoriteDto = {
  id?: string
  type?: string
  entityId?: EntityId
  date?: string
}

export type FetchFavoritesApiDto = {
  results?: FavoriteDto[]
} & PaginationDto

export type FetchFavoritesApiParams = Pick<Favorite, 'type'> &
  Omit<PaginationApiParams, 'page'>

export type AddToFavoritesApiParams = Pick<
  Required<Favorite>,
  'type' | 'entityId'
>

export type RemoveFromFavoritesApiParams = Pick<Favorite, 'id'>
