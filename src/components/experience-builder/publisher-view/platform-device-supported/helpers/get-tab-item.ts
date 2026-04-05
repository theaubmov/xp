import { PlatformsIcon } from '@/enums/plateform-icon'
import type {
  Configuration,
  ConfigurationItem
} from '@/interfaces/experience.interface'
import { get } from 'lodash'

export function getTabItemIcon(tab: string) {
  return PlatformsIcon[tab as keyof typeof PlatformsIcon]
}

export function isTabItemDisabled(
  tabKey: string,
  configuration: Configuration
): boolean {
  const tab: ConfigurationItem[] = get(configuration, tabKey)
  if (tab.length === 0) return true
  return get(tab, 'status') ?? false
}

export function getRowWithKey(tabKey: string, configuration: Configuration) {
  return get(configuration, tabKey)
}
