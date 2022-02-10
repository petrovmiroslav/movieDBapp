import {Brand} from '../../../utils/types'
import {ENTITIES_IDS_NAMES} from '../../../constants/entities'
import {EntitiesIds} from '../entities.types'

export type ImageId = Brand<string, 'ImageId'>

export enum IMAGE_TYPES {
  BACKDROPS = 'backdrops',
  POSTERS = 'posters',
}
export type Image = {
  id: ImageId
  [ENTITIES_IDS_NAMES.movieId]: EntitiesIds['movie']
  type: IMAGE_TYPES
  aspectRatio?: number
  filePath?: string
  height?: number
  iso_639_1?: string | null
  voteAverage?: number
  voteCount?: number
  width?: number
}
