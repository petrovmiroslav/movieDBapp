import {MovieDto} from '../movies/movies.types'
import {EntitiesActionPayload} from '../../store/entities/entities.types'
import {appAxiosInstance} from '../api'
import {genreDtoMapper} from './genres.mappers'

export const fetchGenresApi = (): Promise<EntitiesActionPayload<'genres'>> =>
  appAxiosInstance
    .get<Pick<MovieDto, 'genres'>>('/genre/movie/list')
    .then(res => res.data)
    .then(body => ({
      entities: {
        genres: (body.genres ?? []).map(genreDtoMapper),
      },
    }))
