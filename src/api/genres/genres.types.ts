import {MovieDto} from '../movies/movies.types'
import {EntitiesActionPayload} from '../../store/entities/entities.types'

export type GenresDto = {
  id?: number
  name?: string
}

export type FetchGenresApiDto = Pick<MovieDto, 'genres'>
export type FetchGenresApiResponse = EntitiesActionPayload<'genres'>
