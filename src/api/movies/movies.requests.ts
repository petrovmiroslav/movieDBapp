import {appAxiosInstance} from '../api'
import {
  DiscoverMovieApiDto,
  DiscoverMovieApiParams,
  DiscoverMovieApiResponse,
  FetchMovieApiDto,
  FetchMovieApiParams,
  FetchMovieApiResponse,
  FetchPopularMoviesApiDto,
  FetchPopularMoviesApiParam,
  FetchPopularMoviesApiResponse,
  FetchRecommendationsMoviesApiDto,
  FetchRecommendationsMoviesApiParams,
  FetchRecommendationsMoviesApiResponse,
  FetchSimilarMoviesApiDto,
  FetchSimilarMoviesApiParams,
  FetchSimilarMoviesApiResponse,
  FetchTopRatedMoviesApiDto,
  FetchTopRatedMoviesApiParam,
  FetchTopRatedMoviesApiResponse,
  SearchMoviesApiDto,
  SearchMoviesApiParams,
  SearchMoviesApiResponse,
} from './movies.types'
import {movieDtoMapper} from './movies.mappers'
import {genreDtoMapper} from '../genres/genres.mappers'
import {fetchImagesOfTheMovieApiDtoMapper} from '../images/images.mappers'
import {
  getEntitiesListWithValidId,
  getEntityId,
  getValidEntitiesIdsList,
} from '../../utils/store'
import {DEFAULT_INCLUDE_LANGUAGE_PARAM, PATH_GETTERS} from '../../constants/api'

export const fetchMovieApi = ({
  movieId,
  includes,
}: FetchMovieApiParams): Promise<FetchMovieApiResponse> =>
  appAxiosInstance
    .get<FetchMovieApiDto>(PATH_GETTERS.getFetchMovieApiPath(movieId), {
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
): Promise<DiscoverMovieApiResponse> =>
  appAxiosInstance
    .get<DiscoverMovieApiDto>(PATH_GETTERS.discoverMovieApi, {params})
    .then(res => res.data)
    .then(body => {
      const movies = getEntitiesListWithValidId(
        (body.results ?? []).map(movieDtoMapper),
      )

      return {
        entities: {movies},
      }
    })

export const fetchRecommendationsMoviesApi = ({
  movieId,
  page,
}: FetchRecommendationsMoviesApiParams): Promise<FetchRecommendationsMoviesApiResponse> =>
  appAxiosInstance
    .get<FetchRecommendationsMoviesApiDto>(
      PATH_GETTERS.getFetchRecommendationsMoviesAPi(movieId),
      {
        params: {page},
      },
    )
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchSimilarMoviesApi = ({
  movieId,
  page,
}: FetchSimilarMoviesApiParams): Promise<FetchSimilarMoviesApiResponse> =>
  appAxiosInstance
    .get<FetchSimilarMoviesApiDto>(
      PATH_GETTERS.getFetchSimilarMoviesApi(movieId),
      {
        params: {page},
      },
    )
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchPopularMoviesApi = (
  params: FetchPopularMoviesApiParam,
): Promise<FetchPopularMoviesApiResponse> =>
  appAxiosInstance
    .get<FetchPopularMoviesApiDto>(PATH_GETTERS.fetchPopularMoviesApi, {params})
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const fetchTopRatedMoviesApi = (
  params: FetchTopRatedMoviesApiParam,
): Promise<FetchTopRatedMoviesApiResponse> =>
  appAxiosInstance
    .get<FetchTopRatedMoviesApiDto>(PATH_GETTERS.fetchTopRatedMoviesApi, {
      params,
    })
    .then(res => res.data)
    .then(body => {
      const movies = (body.results ?? []).map(movieDtoMapper)

      return {
        entities: {movies},
      }
    })

export const searchMoviesApi = (
  params: SearchMoviesApiParams,
): Promise<SearchMoviesApiResponse> =>
  appAxiosInstance
    .get<SearchMoviesApiDto>(PATH_GETTERS.searchMoviesApi, {params})
    .then(res => res.data)
    .then(body => ({
      entities: {movies: (body.results ?? []).map(movieDtoMapper)},
    }))
