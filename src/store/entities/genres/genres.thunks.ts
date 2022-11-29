import {Dispatch} from '../../store'
import {fetchGenresApi} from '../../../api/genres/genres.requests'
import {fetchGenresSuccess} from './genres.slice'
import {withResponseErrorCatcher} from '../../../utils/errors'

export const fetchGenres = () =>
  withResponseErrorCatcher(async (dispatch: Dispatch) => {
    const res = await fetchGenresApi()

    dispatch(fetchGenresSuccess(res))
  }, 'fetchGenresApi')
