import {AxiosError} from 'axios'

export type DefaultErrorDataType = {
  details?: string[]
  error?: string
  localized_error?: string
}
export type ResponseError<ErrorDataType = DefaultErrorDataType | string> =
  AxiosError<ErrorDataType> & {error: true}
