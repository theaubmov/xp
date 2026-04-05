import { EngagementContent, getEvents } from '@/helpers/content-extractor'
import { useVueFlow } from '@braks/vue-flow'
import { filter, forEach, isEqual, kebabCase, uniqWith } from 'lodash'

export function useEngagementHandler() {
  const { getEdges } = useVueFlow()

  function getContentItems(startingContent: any) {
    const events = getEvents(startingContent.targetNode.data.details)
    const customEvents = startingContent.targetNode.data.customEvent as any[]
    let channelContents = [
      new EngagementContent(startingContent, getEdges.value)
    ]

    if (events.length === 0 && !customEvents) {
      return removeDuplicated(channelContents)
    } else {
      forEach(events, (event) => {
        const relatedsEdges = getRelatedsEdge(getEdges.value, event.id)
        forEach(relatedsEdges, (relatedEdge) => {
          const nestedResponse = getContentItems(relatedEdge) as any[]
          if (nestedResponse)
            channelContents = [...channelContents, ...nestedResponse]
        })
      })

      forEach(customEvents, (customEvent) => {
        const relatedsEdges = getRelatedsEdge(getEdges.value, customEvent.id)
        forEach(relatedsEdges, (relatedEdge) => {
          const nestedResponse = getContentItems(relatedEdge) as any[]
          if (nestedResponse)
            channelContents = [...channelContents, ...nestedResponse]
        })
      })
      return removeDuplicated(channelContents)
    }
  }

  function getRelatedsEdge(edges: any, id: string) {
    return filter(edges, {
      sourceHandle: kebabCase(id)
    })
  }

  function removeDuplicated(channelContents: any[]) {
    return uniqWith(channelContents, isEqual)
  }

  return {
    getContentItems
  }
}
