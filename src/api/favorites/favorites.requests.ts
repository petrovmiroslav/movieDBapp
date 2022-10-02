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
import {favoriteDtoMapper} from './favorites.mappers'
import {getEntitiesListWithValidId, getRandomId} from '../../utils/store'

export const fetchFavoritesAPi = ({
  type,
}: FetchFavoritesApiParams = {}): Promise<EntitiesActionPayload<'favorites'>> =>
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

      return {
        entities: {favorites},
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
