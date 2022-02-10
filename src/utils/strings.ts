import {roundTo} from './numbers'

/** округляет рейтинг до 1 знака после запятой*/
export const getRoundedVote = (vote: number): string =>
  roundTo(vote, 1).toFixed(1)

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
