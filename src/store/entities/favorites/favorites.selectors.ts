import {State} from '../../store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../../../utils/selectors'
import createCachedSelector from 're-reselect'
import {getEntityId} from '../../../utils/store'
import {Favorite, FavoriteId, FAVORITES_TYPES} from './favorites.types'
import {favoritesAdapter} from './favorites.slice'
import {EntityIdParam} from '../entities.types'
import {getValidDateObject} from '../../../utils/dates'

export type FavoriteTypeParam = FAVORITES_TYPES | undefined
export type FavoriteDictionary = {
  [p: NonNullable<Favorite['entityId']>]: FavoriteId
}

export const favoritesSelectors = favoritesAdapter.getSelectors(
  (state: State) => state.entities.favorites,
)

export const {
  /** returns Favorite by Id*/
  byIdSelector: favoriteByIdSelector,
  selectById: selectFavoriteById,
  /** returns list of all Favorite*/
  allListSelector: allFavoritesListSelector,
  /** returns dict of all Favorite*/
  allEntitiesSelector: allFavoritesEntitiesSelector,
} = createEntityReSelectors(favoritesSelectors)

/** returns list of Favorite by type*/
export const favoritesListByTypeSelector = (() => {
  const selector = createCachedSelector(
    [
      allFavoritesListSelector,
      (_S: State, type: FavoriteTypeParam) => {
        // console.log('favoritesListByQueryKeySelector IN')
        return type
      },
    ],
    (allFavoritesList, type) => {
      // console.log('favoritesListByQueryKeySelector OUT')
      if (!allFavoritesList?.length) return

      const favoritesList = allFavoritesList
        .filter(favorite => {
          if (!type) return true
          return favorite.type === type
        })
        .sort((favoriteA, favoriteB) => {
          const dateA = getValidDateObject(favoriteA?.date)
          if (!dateA) return 1
          const dateB = getValidDateObject(favoriteB?.date)
          if (!dateB) return -1

          return dateB.getTime() - dateA.getTime()
        }) as Favorite[]
      if (!favoritesList.length) return
      return favoritesList
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, type: FavoriteTypeParam) => selector(state, type)
})()

/** returns list of FavoriteId by type*/
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

/** returns FavoriteDictionary by type*/
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

/** returns FavoriteId by type and EntityId*/
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
