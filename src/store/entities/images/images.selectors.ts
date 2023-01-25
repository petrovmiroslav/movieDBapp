import {State} from '../../store'
import {
  createEntityReSelectors,
  defaultCachedSelectorKeySelector,
} from '../../../utils/selectors'
import {imagesAdapter} from './images.slice'
import createCachedSelector from 're-reselect'
import {movieByIdSelector, MovieIdParam} from '../movies/movies.selectors'
import {Image, IMAGE_TYPES} from './images.types'
import {getEntityId} from '../../../utils/store'

export type ImageTypeParam = IMAGE_TYPES | undefined

export const imagesSelectors = imagesAdapter.getSelectors(
  (state: State) => state.entities.images,
)

export const {
  /** return Image by Id*/
  byIdSelector: imageByIdSelector,
  selectById: selectImageById,
  /** return list of all Image*/
  allListSelector: allImagesListSelector,
  /** return dict of all Image*/
  allEntitiesSelector: allImagesEntitiesSelector,
} = createEntityReSelectors(imagesSelectors)

/** return list of ImageId Movie by MovieId*/
export const imageIdsListByMovieIdSelector = (() => {
  const selector = createCachedSelector(
    [
      movieByIdSelector,
      // () => {
      //   console.log('imageIdsListByMovieIdSelector IN')
      // },
    ],
    movie => {
      // console.log('imageIdsListByMovieIdSelector OUT')
      if (!movie?.imagesIds?.length) return
      return movie.imagesIds
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam) => selector(state, movieId)
})()
export const selectImageIdsListByMovieId =
  (movieId: MovieIdParam) => (state: State) =>
    imageIdsListByMovieIdSelector(state, movieId)

/** return list of Image by MovieId and ImageTypeParam*/
const imagesListByMovieIdSelector = (() => {
  const selector = createCachedSelector(
    [
      imageIdsListByMovieIdSelector,
      allImagesEntitiesSelector,
      (_S: State, movieId: MovieIdParam, type: ImageTypeParam) => {
        // console.log('imagesListByMovieIdSelector IN', {movieId, type})
        return type
      },
    ],
    (imageIdsList, allImagesEntities, type) => {
      // console.log('imagesListByMovieIdSelector OUT', {type})
      if (!imageIdsList?.length) return

      const imagesList = imageIdsList
        .map(id => allImagesEntities[id])
        .filter(Boolean) as Image[]

      const sortedList = type
        ? imagesList.filter(image => image.type === type)
        : imagesList
      if (!sortedList.length) return
      return sortedList
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam, type: ImageTypeParam) =>
    selector(state, movieId, type)
})()

/** return list of ImageId by MovieId and ImageTypeParam*/
const imagesIdsListByMovieIdSelector = (() => {
  const selector = createCachedSelector(
    [
      imagesListByMovieIdSelector,
      // () => {
      //   console.log('imagesIdsListByMovieIdSelector IN')
      // },
    ],
    imageList => {
      // console.log('imagesIdsListByMovieIdSelector OUT')
      return imageList?.map(getEntityId)
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, movieId: MovieIdParam, type: ImageTypeParam) =>
    selector(state, movieId, type)
})()
export const selectImagesIdsListByMovieId =
  (movieId: MovieIdParam, type?: ImageTypeParam) => (state: State) =>
    imagesIdsListByMovieIdSelector(state, movieId, type)
