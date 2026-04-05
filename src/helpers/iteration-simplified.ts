import { forEach, map } from 'lodash'

export interface Type {
  type: string
}

export interface GroupIteration {
  name: string
  nestedName: string
  type: Type
  required: boolean
  reference: boolean
  childAttributes: GroupIteration[]
  access: string
}

export interface Metadata {
  name: string
  type: string
}

export async function fromGroupIterationToSimplified(
  groups: GroupIteration[]
): Promise<string[]> {
  const iterationNestedNames: string[] = []
  Promise.all(
    forEach(groups, (item: GroupIteration) => {
      if (item.childAttributes.length) {
        forEach(item.childAttributes, (item: GroupIteration) => {
          iterationNestedNames.push(item.nestedName)
        })
      } else {
        iterationNestedNames.push(item.nestedName)
      }
    })
  )
  return iterationNestedNames
}

export function fromQueryIterationToSimplified(metadata: Metadata[]): string[] {
  return map(metadata, 'name')
}
