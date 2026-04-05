import type { Page } from '@/interfaces/page.interface'
import type { TriggerItem } from '@/interfaces/trigger.interface'

export const onDragStart = (event: DragEvent, nodeType: string, item: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.items.add(item.title, 'title')
    event.dataTransfer.effectAllowed = 'move'
  }
}
export const onDragTriggerStart = (
  event: DragEvent,
  item: TriggerItem,
  type: string
) => {
  if (event.dataTransfer) {
    event.dataTransfer.items.add(JSON.stringify(item), 'item')

    event.dataTransfer.items.add(type, 'type')
    event.dataTransfer.effectAllowed = 'move'
  }
}
export const onDragDataSourceStart = (
  event: DragEvent,
  item: TriggerItem,
  type: string
) => {
  if (event.dataTransfer) {
    event.dataTransfer.items.add(JSON.stringify(item), 'item')

    event.dataTransfer.items.add(type, 'type')
    event.dataTransfer.effectAllowed = 'move'
  }
}
export const onDragPageStart = (
  event: DragEvent,
  nodeType: string,
  id: string,
  item: Page
) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.items.add(id, 'id')
    event.dataTransfer.items.add(item.id, 'page-id')
    event.dataTransfer.effectAllowed = 'move'
  }
}
