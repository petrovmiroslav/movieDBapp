import {fetchGenresApiHandler} from '../../src/api/genres/__mock__/genres.mockHandlers'
import {
  discoverMovieApiHandler,
  fetchMovieApiHandler,
  fetchPopularMoviesApiHandler,
  fetchRecommendationsMoviesHandler,
  fetchSimilarMoviesHandler,
  fetchTopRatedMoviesApiHandler,
  searchMoviesApiHandler,
} from '../../src/api/movies/__mock__/movies.mockHandlers'

export const handlers = [
  /** genres*/
  fetchGenresApiHandler,
  /** images*/

  /** movies*/
  discoverMovieApiHandler,
  fetchRecommendationsMoviesHandler,
  fetchSimilarMoviesHandler,
  fetchPopularMoviesApiHandler,
  fetchTopRatedMoviesApiHandler,
  fetchMovieApiHandler, //must be last

  /** search*/
  searchMoviesApiHandler,
]
