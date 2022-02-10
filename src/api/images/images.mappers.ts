import {
  Image,
  IMAGE_TYPES,
  ImageId,
} from '../../store/entities/images/images.types'
import {FetchImagesOfTheMovieApiDto, ImageDto} from './images.types'
import {MovieId} from '../../store/entities/movies/movies.types'
import {MovieDto} from '../movies/movies.types'

export const imageDtoMapper =
  (movieId: MovieDto['id'], type: IMAGE_TYPES) =>
  (imageDto: ImageDto): Image => ({
    id: imageDto.file_path as ImageId,
    movieId: movieId as MovieId,
    type,
    aspectRatio: imageDto.aspect_ratio,
    filePath: imageDto.file_path,
    height: imageDto.height,
    iso_639_1: imageDto.iso_639_1,
    voteAverage: imageDto.vote_average,
    voteCount: imageDto.vote_count,
    width: imageDto.width,
  })

export const fetchImagesOfTheMovieApiDtoMapper = (
  dto: FetchImagesOfTheMovieApiDto,
): Image[] => {
  if (!dto.id) return []
  const backdrops =
    dto.backdrops?.map(imageDtoMapper(dto.id, IMAGE_TYPES.BACKDROPS)) ?? []
  const posters =
    dto.posters?.map(imageDtoMapper(dto.id, IMAGE_TYPES.POSTERS)) ?? []
  return backdrops.concat(posters)
}
