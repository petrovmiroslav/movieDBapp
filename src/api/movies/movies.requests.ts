import {appAxiosInstance, DEFAULT_INCLUDE_LANGUAGE_PARAM} from '../api'
import {
  DiscoverMovieApiParams,
  DiscoverMovieDto,
  FetchMovieApiParams,
  FetchPopularMoviesApiParam,
  FetchPopularMoviesDto,
  FetchRecommendationsMoviesAPiParams,
  FetchRecommendationsMoviesDto,
  FetchSimilarMoviesAPiParams,
  FetchSimilarMoviesDto,
  FetchTopRatedMoviesApiParam,
  FetchTopRatedMoviesDto,
  MovieDto,
  SearchMoviesApiParams,
  SearchMoviesDto,
} from './movies.types'
import {movieDtoMapper} from './movies.mappers'
import {genreDtoMapper} from '../genres/genres.mappers'
import {EntitiesActionPayload} from '../../store/entities/entities.types'
import {fetchImagesOfTheMovieApiDtoMapper} from '../images/images.mappers'
import {
  getEntitiesListWithValidId,
  getEntityId,
  getValidEntitiesIdsList,
} from '../../utils/store'

export const fetchMovieApi = ({
  movieId,
  includes,
}: FetchMovieApiParams): Promise<
  EntitiesActionPayload<'movies' | 'genres' | 'images'>
> =>
  appAxiosInstance
    .get<MovieDto>(`/movie/${movieId}`, {
      params: {
        append_to_response: includes?.join(),
        include_image_language: includes && DEFAULT_INCLUDE_LANGUAGE_PARAM,
      },
    })
    .then(res => res.data)
    .then(body => {
      const images = fetchImagesOfTheMovieApiDtoMapper({
        id: body.id,
        ...body.images,
      })

      const movie = movieDtoMapper(body)
      movie.imagesIds = getValidEntitiesIdsList(images.map(getEntityId))
      return {
        entities: {
          movies: getEntitiesListWithValidId([movie]),
          genres: (body.genres ?? []).map(genreDtoMapper),
          images,
        },
      }
    })

export const discoverMovieApi = (
  params: DiscoverMovieApiParams,
): Promise<EntitiesActionPayload<'movies'>> =>
  appAxiosInstance
    .get<DiscoverMovieDto>('/discover/movie', {params})
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchRecommendationsMoviesAPi = ({
  movieId,
  page,
}: FetchRecommendationsMoviesAPiParams): Promise<
  EntitiesActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<FetchRecommendationsMoviesDto>(`/movie/${movieId}/recommendations`, {
      params: {page},
    })
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchSimilarMoviesAPi = ({
  movieId,
  page,
}: FetchSimilarMoviesAPiParams): Promise<EntitiesActionPayload<'movies'>> =>
  appAxiosInstance
    .get<FetchSimilarMoviesDto>(`/movie/${movieId}/similar`, {
      params: {page},
    })
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchPopularMoviesApi = (
  params: FetchPopularMoviesApiParam,
): Promise<EntitiesActionPayload<'movies'>> =>
  appAxiosInstance
    .get<FetchPopularMoviesDto>('/movie/popular', {params})
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchTopRatedMoviesApi = (
  params: FetchTopRatedMoviesApiParam,
): Promise<EntitiesActionPayload<'movies'>> =>
  appAxiosInstance
    .get<FetchTopRatedMoviesDto>('/movie/top_rated', {params})
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const searchMoviesApi = (
  params: SearchMoviesApiParams,
): Promise<EntitiesActionPayload<'movies'>> =>
  appAxiosInstance
    .get<SearchMoviesDto>('/search/movie', {params})
    .then(res => res.data)
    .then(body => ({
      entities: {movies: (body.results ?? []).map(movieDtoMapper)},
    }))
