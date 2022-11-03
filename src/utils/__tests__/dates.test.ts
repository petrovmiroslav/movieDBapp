import {getValidDateObject} from '../dates'

describe('utils/dates.ts', () => {
  const funcToTest = getValidDateObject

  test('getValidDateObject(NaN) returns undefined', () => {
    expect(funcToTest(NaN)).toBeUndefined()
  })

  test('getValidDateObject(undefined) returns undefined', () => {
    expect(funcToTest(undefined)).toBeUndefined()
  })

  test('getValidDateObject(null) returns undefined', () => {
    expect(funcToTest(null)).toBeUndefined()
  })

  test('getValidDateObject("") returns undefined', () => {
    expect(funcToTest('')).toBeUndefined()
  })

  test('getValidDateObject("invalid string") returns undefined', () => {
    expect(funcToTest('invalid string')).toBeUndefined()
  })

  test('getValidDateObject(new Date()) returns valid Date', () => {
    expect(funcToTest(new Date())).toBeInstanceOf(Date)
  })

  test('getValidDateObject(0) returns valid Date', () => {
    expect(funcToTest(0)?.getTime()).toBe(new Date(0).getTime())
  })

  const ms = 1667469499643
  test(`getValidDateObject(${ms}).getTime() returns ${ms}`, () => {
    expect(funcToTest(ms)?.getTime()).toBe(new Date(ms).getTime())
  })
})
