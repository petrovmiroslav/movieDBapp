import {roundTo} from '../numbers'

describe('utils/numbers.ts', () => {
  test('roundTo(12.3456, 3) returns 12.346', () => {
    expect(roundTo(12.3456, 3)).toBe(12.346)
  })
})
