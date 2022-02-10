import {MovieDto} from './movies.types'
import {
  ImdbId,
  Movie,
  MOVIE_STATUSES,
  MovieId,
} from '../../store/entities/movies/movies.types'
import {StringDate} from '../../utils/types'
import {GenreId} from '../../store/entities/genres/genres.types'
import {getUniqArray} from '../../utils/array'
import {genreDtoToGenreIdMapper} from '../genres/genres.mappers'
import {getValidEntitiesIdsList} from '../../utils/store'

export const movieDtoMapper = (movieDto: MovieDto): Movie => ({
  adult: movieDto.adult,
  backdropPath: movieDto.backdrop_path,
  budget: movieDto.budget,
  genresIds: getUniqArray([
    ...((movieDto.genre_ids ?? []) as GenreId[]),
    ...getValidEntitiesIdsList(
      (movieDto.genres ?? []).map(genreDtoToGenreIdMapper),
    ),
  ]),
  homepage: movieDto.homepage,
  id: movieDto.id as MovieId,
  imdbId: movieDto.imdb_id as ImdbId,
  originalLanguage: movieDto.original_language,
  originalTitle: movieDto.original_title,
  overview: movieDto.overview,
  popularity: movieDto.popularity,
  posterPath: movieDto.poster_path,
  releaseDate: movieDto.release_date as StringDate,
  revenue: movieDto.revenue,
  runtime: movieDto.runtime,
  status: movieDto.status as MOVIE_STATUSES,
  tagline: movieDto.tagline,
  title: movieDto.title,
  video: movieDto.video,
  voteAverage: movieDto.vote_average,
  voteCount: movieDto.vote_count,
})

export const getGenresParam = (genresList: GenreId[]) => genresList.join()
