import {State} from '../store/store'
import {createSelector, EntitySelectors} from '@reduxjs/toolkit'
import {Entities} from '../store/entities/entities.types'
import {Primitive} from './types'

/**
 * Возвращает строку состоящую из строковых значений всех переданных аргументов
 */
export const getValidSelectorCacheKey = (...args: any[]): string => {
  let validCacheKey = ''
  for (let i = 0; i < args.length; i++) {
    validCacheKey += typeof args[i] === 'string' ? args[i] : String(args[i])
  }
  return validCacheKey
}

/**
 * Возвращает функцию оборачивающую вызов .selectById(), что бы отбросить неиспользуемые параметры
 */
export const createEntityByIdSelector = <
  Entity extends Entities[keyof Entities],
>(
  selector: EntitySelectors<Entity, State>['selectById'],
) => {
  return (state: State, entityId: Entity['id'] | undefined) => {
    if (entityId === undefined) return
    return selector(state, entityId)
  }
}

/**
 * Возвращает функцию для использования переданного селектора в хуке useSelector
 */
export const createSelectEntityByIdFunc = <
  Entity extends Entities[keyof Entities],
>(
  selector: (
    state: State,
    entityId: Entity['id'] | undefined,
  ) => undefined | Entity,
) => {
  return (entityId: Entity['id'] | undefined) => (state: State) =>
    selector(state, entityId)
}

/**
 * Создает реселект вызывающий переданный .selectAll() и возвращает функцию,
 * оборачивающую вызов реселекта, что бы отбросить неиспользуемые параметры
 */
export const createAllEntitiesListSelector = <
  Entity extends Entities[keyof Entities],
>(
  allEntitiesListSelector: EntitySelectors<Entity, State>['selectAll'],
) => {
  const selector = createSelector(
    [allEntitiesListSelector],
    allEntitiesList => {
      if (!allEntitiesList.length) return
      return allEntitiesList
    },
  )

  return (state: State) => selector(state)
}

/**
 * Создает реселект вызывающий переданный .selectEntities() и возвращает функцию,
 * оборачивающую вызов реселекта, что бы отбросить неиспользуемые параметры
 */
export const createAllEntitiesSelector = <
  Entity extends Entities[keyof Entities],
>(
  allEntitiesSelector: EntitySelectors<Entity, State>['selectEntities'],
) => {
  const selector = createSelector(
    [allEntitiesSelector],
    allEntities => allEntities,
  )

  return (state: State) => selector(state)
}

export const createEntityReSelectors = <
  Entity extends Entities[keyof Entities],
>(
  selectors: EntitySelectors<Entity, State>,
) => {
  const byIdSelector = createEntityByIdSelector(selectors.selectById)
  const selectById = createSelectEntityByIdFunc(byIdSelector)
  const allListSelector = createAllEntitiesListSelector(selectors.selectAll)
  const allEntitiesSelector = createAllEntitiesSelector(
    selectors.selectEntities,
  )

  return {
    byIdSelector,
    selectById,
    allListSelector,
    allEntitiesSelector,
  }
}

export const defaultCachedSelectorKeySelector = (
  _S: State,
  ...args: Primitive[]
) => getValidSelectorCacheKey(...args)
