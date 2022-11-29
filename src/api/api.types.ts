import {AxiosError} from 'axios'
import {ErrorWithMessage} from '../utils/errors'

type ResponseErrorDataType = {
  details?: string[]
  error?: string
  localized_error?: string
}

export type ResponseError<ErrorDataType = ResponseErrorDataType | string> =
  AxiosError<ErrorDataType> & ErrorWithMessage
