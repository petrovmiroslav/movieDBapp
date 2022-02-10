import {appAxiosInstance, DEFAULT_INCLUDE_LANGUAGE_PARAM} from '../api'
import {
  FetchImagesOfTheMovieApiDto,
  FetchImagesOfTheMovieApiParams,
} from './images.types'
import {fetchImagesOfTheMovieApiDtoMapper} from './images.mappers'
import {PickEntitiesActionPayload} from '../../store/entities/entities.types'

export const fetchImagesOfTheMovieApi = ({
  movieId,
}: FetchImagesOfTheMovieApiParams): Promise<
  PickEntitiesActionPayload<'images'>
> =>
  appAxiosInstance
    .get<FetchImagesOfTheMovieApiDto>(`/movie/${movieId}/images`, {
      params: {
        include_image_language: DEFAULT_INCLUDE_LANGUAGE_PARAM,
      },
    })
    .then(res => res.data)
    .then(body => ({
      images: fetchImagesOfTheMovieApiDtoMapper(body),
    }))
