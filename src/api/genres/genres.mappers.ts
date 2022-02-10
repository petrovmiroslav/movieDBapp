import {Genre, GenreId} from '../../store/entities/genres/genres.types'
import {GenresDto} from './genres.types'

export const genreDtoToGenreIdMapper = (genreDto: GenresDto): GenreId =>
  genreDto.id as GenreId

export const genreDtoMapper = (genreDto: GenresDto): Genre => ({
  id: genreDtoToGenreIdMapper(genreDto),
  name: genreDto.name,
})
