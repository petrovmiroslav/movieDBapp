import {Duration, intervalToDuration, isValid} from 'date-fns'

export type DateParam = Date | number | string | undefined | null

export const checkIsDateValid = (date: Date) => isValid(date)

export const getValidDateObject = (date: DateParam): Date | undefined => {
  if (date === undefined || date === null) return
  date = date instanceof Date ? date : new Date(date)

  return checkIsDateValid(date) ? date : undefined
}

/** Date format dd*/
export const getFormattedDate = (date: DateParam): string | undefined => {
  date = getValidDateObject(date)
  if (!date) return
  const day = date.getDate()

  return ('0' + day).slice(-2)
}

/** Month format MM*/
export const getFormattedMonth = (date: DateParam): string | undefined => {
  date = getValidDateObject(date)
  if (!date) return
  const month = date.getMonth()

  return ('0' + (month + 1)).slice(-2)
}

/** Month format dd.MM*/
export const getFormattedDateMonth = (date: DateParam): string | undefined => {
  date = getValidDateObject(date)
  if (!date) return
  const dateOfMonth = getFormattedDate(date)
  const month = getFormattedMonth(date)

  return dateOfMonth + '.' + month
}

/** Month format yyyy*/
export const getFormattedDateYear = (date: DateParam): string | undefined => {
  date = getValidDateObject(date)
  if (!date) return
  return date.getFullYear().toString()
}

/** Month format dd.MM.yyyy*/
export const getFormattedDateMonthYear = (
  date: DateParam,
): string | undefined => {
  date = getValidDateObject(date)
  if (!date) return
  const dateMonth = getFormattedDateMonth(date)
  const year = date.getFullYear()

  return dateMonth + '.' + year
}

export const convertMinutesToDuration = (minutes: number): Duration => {
  return intervalToDuration({
    start: 0,
    end: minutes * 60000,
  })
}

/** Duration format 1 ч. 28 мин.*/
export const formatDurationToString = (duration: Duration): string => {
  const {hours, minutes} = duration
  const stringArr = [
    hours ? hours + ' ч.' : '',
    minutes ? minutes + ' мин.' : '',
  ]
  return stringArr.join(' ').trim()
}

/** Duration format 1:08*/
export const formatDurationToDigitsString = (duration: Duration): string => {
  const {hours, minutes} = duration
  const formattedHours = hours ? hours : '0'
  const formattedMinutes = minutes ? ('0' + minutes).slice(-2) : '00'
  return formattedHours + ':' + formattedMinutes
}
