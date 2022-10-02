import {Dispatch} from '../../store'
import {ResponseError} from '../../../api/api'
import {fetchGenresApi} from '../../../api/genres/genres.requests'
import {fetchGenresSuccess} from './genres.slice'

export const fetchGenres = () => async (dispatch: Dispatch) => {
  try {
    const res = await fetchGenresApi()

    dispatch(fetchGenresSuccess(res))
  } catch (e) {
    const responseError = e as ResponseError
    responseError.error = true
    console.error('Error: fetchGenresApi', {responseError})
    return responseError
  }
}
