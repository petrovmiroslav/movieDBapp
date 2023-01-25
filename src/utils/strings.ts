import {roundTo} from './numbers'

/** round rating to 1 digit after point*/
export const getRoundedVote = (vote: number): string =>
  roundTo(vote, 1).toFixed(1)

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
