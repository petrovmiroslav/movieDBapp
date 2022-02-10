import React from 'react'

export type Brand<T, U> = T & {__brand: U}

export type StringDate = Brand<string, 'StringDate'>

/**Для избежания потери generic type в React.memo*/
interface GenericTypedMemo {
  <T>(fn: T): T
}
export const genericTypedMemo = React.memo as GenericTypedMemo

export type FilterKeys<Base, Condition> = {
  [Key in keyof Base]: [Base[Key]] extends [Condition] ? Key : never
}
export type AllowedKeys<Base, Condition> = FilterKeys<
  Base,
  Condition
>[keyof Base]
export type SubType<Base, Condition> = Pick<Base, AllowedKeys<Base, Condition>>

export type Primitive =
  | number
  | string
  | boolean
  | null
  | undefined
  | bigint
  | symbol

export const checkPrimitive = (val: any): val is Primitive => {
  if (val === null) return true
  return !(val instanceof Object) && !Number.isNaN(val)
}

export type PrimitiveValuesOnly<Base> = SubType<Base, Primitive>

export const getPrimitiveValuesOnly = <Type extends object>(
  obj: Type,
): PrimitiveValuesOnly<Type> => {
  const objCopy = {...obj}
  Object.keys(obj).forEach(
    key =>
      !checkPrimitive(objCopy[key as keyof Type]) &&
      delete objCopy[key as keyof Type],
  )
  return objCopy
}
