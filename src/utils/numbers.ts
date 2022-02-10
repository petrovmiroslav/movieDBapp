/** Округляет число до переданного количества знаков после запятой*/
export const roundTo = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}
