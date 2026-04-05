import type { BaContentPage, Details, Page } from '@/interfaces/page.interface'
import { filter, forEach, get, kebabCase, map } from 'lodash'

export function getThumbnail(details?: Details) {
  if (!details) return ''
  const baContent = details.content as BaContentPage

  if (baContent.baAppConfig) {
    return baContent.baAppConfig.thumbnail
  } else {
    return details.thumbnail
  }
}

export function setThumbnailPage(page: Page, thumbnail: string): Page {
  const baContent = page.details.content as BaContentPage

  if (baContent.baAppConfig) {
    baContent.baAppConfig.thumbnail = thumbnail
    const modifiedpage = {
      ...page,
      details: {
        ...page.details,
        content: baContent
      }
    }
    return modifiedpage
  } else {
    page.details.thumbnail = thumbnail
    return page
  }
}

export function getEvents(details?: Details, edges?: any): any[] {
  if (!details) return []
  const baContent = details.content as BaContentPage
  const events: any[] = []
  if (baContent.baAppConfig) {
    const elements = get(details, 'content.baAppConfig.config.elements', [])
    forEach(elements, (element, index) => {
      forEach(Object.keys(element), (key) => {
        const relatedEdges = filter(edges, {
          sourceHandle: kebabCase(key)
        })
        const target = map(relatedEdges, (relatedEdge) => {
          return {
            baId: relatedEdge.targetNode.data.id,
            trigger: get(relatedEdge, 'data.trigger', {})
          }
        })
        const event = {
          id: key,
          elementId: index,
          type: element[key].type,
          details: {
            action: element[key].action,
            target: element[key].target
          }
        }
        if (target) {
          events.push({ ...event, target: target })
        } else {
          events.push({ ...event, original: { element } })
        }
      })
    })
  }
  return events
}

export function getCustomEvent(customEvents?: any[], edges?: any): any[] {
  const formattedCustomEvent = map(customEvents, (customEvent) => {
    const relatedEdges = filter(edges, {
      sourceHandle: kebabCase(customEvent.id)
    })
    const target = map(relatedEdges, (relatedEdge) => {
      return {
        baId: relatedEdge.targetNode.data.id,
        trigger: get(relatedEdge, 'data.trigger', {})
      }
    })
    return { ...customEvent, target: target }
  })
  return formattedCustomEvent
}

export function getDataSource(details?: Details) {
  if (!details) return []
  const baContent = details.content as BaContentPage
  let dataSource: any = {}
  if (baContent.baAppConfig) {
    dataSource = get(details, 'content.baAppConfig.config.dataSource')
  } else {
    dataSource = get(details, 'content.additionalProperties.dataSource')
  }
}

export class EngagementContent {
  public contentType: string

  public baId: string

  public userId: string

  public serviceId: string

  public datasources: any

  public contentConfig: any

  constructor(content: any, edges?: any) {
    this.contentType = get(content, 'targetNode.data.details.contentType')
    this.baId = get(content, 'targetNode.data.id')
    this.userId = '1194'
    this.serviceId = 'hgr'
    this.datasources = []
    this.contentConfig = {
      ['events']: getEvents(get(content, 'targetNode.data.details'), edges),
      ['customEvents']: getCustomEvent(
        get(content, 'targetNode.data.customEvent'),
        edges
      )
    }
  }
}

// context:Array[0]
// custom:Array[0]
// source:Array[0]
// target:Array[0]
