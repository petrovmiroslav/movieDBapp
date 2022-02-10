import {Dispatch} from '../store/store'
import {ResponseError} from '../api/api'
import {
  AddToFavoritesApiParams,
  FetchFavoritesApiParams,
  RemoveFromFavoritesApiParams,
} from '../api/favorites/favorites.types'
import {fetchFavoritesSuccess} from '../store/entities/favorites/favorites.slice'
import {
  addToFavoritesApi,
  fetchFavoritesAPi,
  removeFromFavoritesApi,
} from '../api/favorites/favorites.requests'

export const fetchFavorites =
  (params?: FetchFavoritesApiParams) => async (dispatch: Dispatch) => {
    try {
      const res = await fetchFavoritesAPi(params)

      dispatch(fetchFavoritesSuccess(res))
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: fetchFavoritesAPi', {responseError})
      return responseError
    }
  }

export const addToFavorites = (params: AddToFavoritesApiParams) => async () => {
  try {
    await addToFavoritesApi(params)
  } catch (e) {
    const responseError = e as ResponseError
    responseError.error = true
    console.error('Error: addToFavoritesApi', {responseError})
    return responseError
  }
}

export const removeFromFavorites =
  (params: RemoveFromFavoritesApiParams) => async () => {
    try {
      await removeFromFavoritesApi(params)
    } catch (e) {
      const responseError = e as ResponseError
      responseError.error = true
      console.error('Error: addToFavoritesApi', {responseError})
      return responseError
    }
  }
