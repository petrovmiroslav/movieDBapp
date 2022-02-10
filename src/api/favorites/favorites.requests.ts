import {
  AddToFavoritesApiParams,
  FavoriteDto,
  FetchFavoritesApiDto,
  FetchFavoritesApiParams,
  RemoveFromFavoritesApiParams,
} from './favorites.types'
import {
  ASYNC_STORAGE_KEYS,
  getAsyncStorageData,
  setAsyncStorageData,
} from '../../utils/asyncStorage'
import {EntitiesActionPayload} from '../../store/entities/entities.types'
import {
  PAGINATION_QUERY_KEY_ROOTS,
  PaginationActionPayload,
} from '../../store/pagination/pagination.types'
import {getPaginationQueryKey} from '../../store/pagination/pagination.slice'
import {paginationMapper} from '../pagination/pagination.mappers'
import {favoriteDtoMapper} from './favorites.mappers'
import {getEntitiesListWithValidId, getRandomId} from '../../utils/store'

export const fetchFavoritesAPi = ({
  type,
  _actionType,
}: FetchFavoritesApiParams = {}): Promise<
  EntitiesActionPayload<'favorites'> & PaginationActionPayload<'favorites'>
> =>
  getAsyncStorageData(ASYNC_STORAGE_KEYS.FAVORITES)
    .then((favorites): {data: FetchFavoritesApiDto} => {
      const favoritesList = (
        Array.isArray(favorites) ? favorites : []
      ) as FavoriteDto[]
      const filteredFavoritesList = type
        ? favoritesList.filter(favorite => favorite.type === type)
        : favoritesList

      return {
        data: {
          results: filteredFavoritesList,
        },
      }
    })
    .then(res => res.data)
    .then(body => {
      const favorites = getEntitiesListWithValidId(
        body.results?.map(favoriteDtoMapper) ?? [],
      )

      const queryKey = getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.FAVORITES,
        {favoritesType: type},
      )

      const favoritesPagination = paginationMapper(
        favorites,
        body,
        queryKey,
        _actionType,
      )

      return {
        entities: {favorites},
        pagination: {favorites: [favoritesPagination]},
      }
    })

export const addToFavoritesApi = async ({
  type,
  entityId,
}: AddToFavoritesApiParams) => {
  if (entityId === undefined)
    throw new Error('Error: addToFavoritesAPi. entityId === undefined')

  const maybeFavorites = await getAsyncStorageData(ASYNC_STORAGE_KEYS.FAVORITES)

  const favoritesList = (
    Array.isArray(maybeFavorites) ? maybeFavorites : []
  ) as FavoriteDto[]

  if (
    favoritesList.some(
      favorite => favorite.type === type && favorite.entityId === entityId,
    )
  ) {
    throw new Error('Error: addToFavoritesAPi. favorite was already added')
  }

  const newFavorite = {
    id: getRandomId(),
    type,
    entityId,
    date: new Date().toISOString(),
  } as FavoriteDto
  favoritesList.unshift(newFavorite)

  await setAsyncStorageData(ASYNC_STORAGE_KEYS.FAVORITES, favoritesList)
}

export const removeFromFavoritesApi = async ({
  id,
}: RemoveFromFavoritesApiParams) => {
  const maybeFavorites = await getAsyncStorageData(ASYNC_STORAGE_KEYS.FAVORITES)

  const favoritesList = (
    Array.isArray(maybeFavorites) ? maybeFavorites : []
  ) as FavoriteDto[]

  const newFavorites = favoritesList.filter(
    favorite => favorite.id !== id,
  ) as FavoriteDto

  await setAsyncStorageData(ASYNC_STORAGE_KEYS.FAVORITES, newFavorites)
}
