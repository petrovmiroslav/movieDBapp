import {PAGINATION_ACTION_TYPES} from '../../store/pagination/pagination.types'

export type PaginationDto = {
  page?: number
  total_pages?: number
  total_results?: number
}

export type PaginationApiParams = {
  _actionType?: PAGINATION_ACTION_TYPES
  page?: number
}
