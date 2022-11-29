import {Dispatch} from '../../store'
import {
  AddToFavoritesApiParams,
  FetchFavoritesApiParams,
  RemoveFromFavoritesApiParams,
} from '../../../api/favorites/favorites.types'
import {
  fetchFavoritesSuccess,
  removeFromFavoritesSuccess,
} from './favorites.slice'
import {
  addToFavoritesApi,
  fetchFavoritesAPi,
  removeFromFavoritesApi,
} from '../../../api/favorites/favorites.requests'
import {withResponseErrorCatcher} from '../../../utils/errors'

export const fetchFavorites = (params?: FetchFavoritesApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const res = await fetchFavoritesAPi(params)

    dispatch(fetchFavoritesSuccess(res))
  }, 'fetchFavoritesAPi')

export const addToFavorites = (params: AddToFavoritesApiParams) =>
  withResponseErrorCatcher(async () => {
    await addToFavoritesApi(params)
  }, 'addToFavoritesApi')

export const removeFromFavorites = (params: RemoveFromFavoritesApiParams) =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    await removeFromFavoritesApi(params)
    dispatch(removeFromFavoritesSuccess(params.id))
  }, 'addToFavoritesApi')
