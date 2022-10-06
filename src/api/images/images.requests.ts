import {appAxiosInstance} from '../api'
import {
  FetchImagesOfTheMovieApiDto,
  FetchImagesOfTheMovieApiParams,
} from './images.types'
import {fetchImagesOfTheMovieApiDtoMapper} from './images.mappers'
import {PickEntitiesActionPayload} from '../../store/entities/entities.types'
import {DEFAULT_INCLUDE_LANGUAGE_PARAM, PATH_GETTERS} from '../../constants/api'

export const fetchImagesOfTheMovieApi = ({
  movieId,
}: FetchImagesOfTheMovieApiParams): Promise<
  PickEntitiesActionPayload<'images'>
> =>
  appAxiosInstance
    .get<FetchImagesOfTheMovieApiDto>(
      PATH_GETTERS.getFetchImagesOfTheMovieApiPath(movieId),
      {
        params: {
          include_image_language: DEFAULT_INCLUDE_LANGUAGE_PARAM,
        },
      },
    )
    .then(res => res.data)
    .then(body => ({
      images: fetchImagesOfTheMovieApiDtoMapper(body),
    }))
