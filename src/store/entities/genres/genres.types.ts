import {Brand} from '../../../utils/types'

export type GenreId = Brand<number, 'GenreId'>

export type Genre = {
  id: GenreId
  name?: string
}
