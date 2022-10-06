import {appAxiosInstance} from '../api'
import {genreDtoMapper} from './genres.mappers'
import {PATH_GETTERS} from '../../constants/api'
import {FetchGenresApiDto, FetchGenresApiResponse} from './genres.types'

export const fetchGenresApi = (): Promise<FetchGenresApiResponse> =>
  appAxiosInstance
    .get<FetchGenresApiDto>(PATH_GETTERS.fetchGenresApiPath)
    .then(res => res.data)
    .then(body => ({
      entities: {
        genres: (body?.genres ?? []).map(genreDtoMapper),
      },
    }))
