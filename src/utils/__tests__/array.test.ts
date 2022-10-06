import {getUniqArray} from '../array'

const ARRAY = [1, 2, 1]
const RESULT = [1, 2]

describe('utils/array.ts', () => {
  test(`given [${ARRAY.toString()}], getUniqArray() returns [${RESULT.toString()}]`, () => {
    expect(getUniqArray(ARRAY)).toEqual(RESULT)
  })
})
