import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {FetchMovieApiParams} from '../movies/movies.types'

export type ImageDto = {
  aspect_ratio?: number
  file_path?: string
  height?: number
  iso_639_1?: string | null
  vote_average?: number
  vote_count?: number
  width?: number
}

export type FetchImagesOfTheMovieApiDto = {
  id?: number
  [IMAGE_TYPES.BACKDROPS]?: ImageDto[]
  [IMAGE_TYPES.POSTERS]?: ImageDto[]
}

export type FetchImagesOfTheMovieApiParams = Pick<
  FetchMovieApiParams,
  'movieId'
>
