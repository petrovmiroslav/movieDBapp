import {State} from '../store/store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../utils/selectors'
import createCachedSelector from 're-reselect'
import {loadedIdsListSelector} from './pagination.selectors'
import {PAGINATION_QUERY_KEY_ROOTS} from '../store/pagination/pagination.types'
import {ENTITIES_NAMES_PLURAL} from '../constants/entities'
import {getEntityId} from '../utils/store'
import {
  Favorite,
  FavoriteId,
  FAVORITES_TYPES,
} from '../store/entities/favorites/favorites.types'
import {favoritesAdapter} from '../store/entities/favorites/favorites.slice'
import {getPaginationQueryKey} from '../store/pagination/pagination.slice'
import {EntityIdParam} from '../store/entities/entities.types'
import {getValidDateObject} from '../utils/dates'

export type FavoriteTypeParam = FAVORITES_TYPES | undefined
export type FavoriteDictionary = {
  [p: NonNullable<Favorite['entityId']>]: FavoriteId
}

export const favoritesSelectors = favoritesAdapter.getSelectors(
  (state: State) => state.entities.favorites,
)

export const {
  /** Возвращает Favorite по Id*/
  byIdSelector: favoriteByIdSelector,
  selectById: selectFavoriteById,
  /** Возвращает список всех Favorite*/
  allListSelector: allFavoritesListSelector,
  /** Возвращает словарь всех Favorite*/
  allEntitiesSelector: allFavoritesEntitiesSelector,
} = createEntityReSelectors(favoritesSelectors)

/** Возвращает список Favorite по type*/
export const favoritesListByTypeSelector = (() => {
  const selector = createCachedSelector(
    [
      (state: State, type: FavoriteTypeParam) => {
        // console.log('favoritesListByQueryKeySelector IN')
        return loadedIdsListSelector(
          state,
          ENTITIES_NAMES_PLURAL.favorites,
          getPaginationQueryKey(PAGINATION_QUERY_KEY_ROOTS.FAVORITES, {
            favoritesType: type,
          }),
        )
      },
      allFavoritesEntitiesSelector,
    ],
    (loadedIdsList, allFavoritesEntities) => {
      // console.log('favoritesListByQueryKeySelector OUT')
      if (!loadedIdsList?.length) return

      const favoritesList = loadedIdsList
        .map(id => allFavoritesEntities[id])
        .filter(Boolean)
        .sort((favoriteA, favoriteB) => {
          const dateA = getValidDateObject(favoriteA?.date)
          if (!dateA) return 1
          const dateB = getValidDateObject(favoriteB?.date)
          if (!dateB) return -1

          return dateA.getTime() - dateB.getTime()
        }) as Favorite[]
      if (!favoritesList.length) return
      return favoritesList
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, type: FavoriteTypeParam) => selector(state, type)
})()

/** Возвращает список FavoriteId по type*/
export const favoriteIdsListByTypeSelector = (() => {
  const selector = createCachedSelector(
    [
      favoritesListByTypeSelector,
      // () => {
      //   console.log('favoriteIdsListByQueryKeySelector IN')
      // },
    ],
    favoritesList => {
      // console.log('favoriteIdsListByQueryKeySelector OUT')
      return favoritesList?.map(getEntityId)
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, type: FavoriteTypeParam) => selector(state, type)
})()
export const selectFavoriteIdsListByType =
  (type?: FavoriteTypeParam) => (state: State) =>
    favoriteIdsListByTypeSelector(state, type)

/** Возвращает FavoriteDictionary по type*/
export const favoriteDictionaryByTypeSelector = (() => {
  const selector = createCachedSelector(
    [
      favoritesListByTypeSelector,
      // () => {
      //   console.log('favoriteDictionaryByTypeSelector IN')
      // },
    ],
    favoritesList => {
      // console.log('favoriteDictionaryByTypeSelector OUT')
      const dictionary: FavoriteDictionary = {}
      favoritesList?.forEach(
        favorite =>
          favorite.entityId && (dictionary[favorite.entityId] = favorite.id),
      )

      return dictionary
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, type: FavoriteTypeParam) => selector(state, type)
})()
export const selectFavoriteDictionaryByType =
  (type?: FavoriteTypeParam) => (state: State) =>
    favoriteDictionaryByTypeSelector(state, type)

/** Возвращает FavoriteId по type и EntityId*/
export const favoriteIdByTypeAndEntityIdSelector = (() => {
  const selector = createCachedSelector(
    [
      favoriteDictionaryByTypeSelector,
      (_S: State, _1: FavoriteTypeParam, entityId: EntityIdParam) => {
        // console.log('favoriteIdByTypeAndEntityIdSelector IN', {entityId})
        return entityId
      },
    ],
    (favoriteDictionary, entityId) => {
      // console.log('favoriteIdByTypeAndEntityIdSelector OUT', {entityId})
      if (entityId === undefined) return
      return favoriteDictionary[entityId]
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, type: FavoriteTypeParam, entityId: EntityIdParam) =>
    selector(state, type, entityId)
})()
export const selectFavoriteIdByTypeAndEntityId =
  (type: FavoriteTypeParam, entityId: EntityIdParam) => (state: State) =>
    favoriteIdByTypeAndEntityIdSelector(state, type, entityId)
