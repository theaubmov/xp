import type {
  ActionItem,
  Configuration,
  ConfigurationItem,
  Experience,
  ItemsOrentation,
  PageExperience,
  Slides
} from '@/interfaces/experience.interface'
import type { Element } from '@braks/vue-flow'
import type { PageItem } from '@/interfaces/tab-item.interface'
import { get, forEach, find } from 'lodash'

export class ExperienceSimplified {
  public id!: string

  public name!: string

  public tenant!: string

  public description!: string

  public status!: string

  public thumbnail!: string

  public listSlideItem: Slides[] = []

  public listConfigurationItem: ConfigurationItem[] = []

  public listActionItem: ActionItem[] = []

  public listOrentationItem: ItemsOrentation[] = []

  public pagesItem: PageItem[] = []

  public elemenetExperience: Element[] = []

  public performance: string[] = []

  constructor(experience?: Experience) {
    if (experience) {
      this.id = experience.id
      this.name = experience.name
      this.tenant = experience.tenant
      this.description = experience.description
      this.status = experience.status
      this.thumbnail = experience?.thumbnail || experience?.details?.thumbnail

      this.fetchListConfigurationItem(experience.configuration)
      this.fetchListActionItem(experience.gitSource)
      this.fetchListOrentationItem()
      this.fetchPagesAndListSlideItem(experience.pages)
      this.elemenetExperience = experience['experienceElements']
      this.performance = experience.performance
    }
  }

  private fetchListConfigurationItem(configuration: Configuration) {
    this.listConfigurationItem.push({
      icon: 'fa-solid fa-table-columns',
      isActive: get(configuration, 'Dashboard', '')
        ? !!find(configuration.Dashboard, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-solid fa-envelope',
      isActive: get(configuration, 'Email', '')
        ? !!find(configuration.Email, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-solid fa-file-lines',
      isActive: get(configuration, 'Email', '')
        ? !!find(configuration.HTML, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-solid fa-sign-hanging',
      isActive: get(configuration, 'SMS', '')
        ? !!find(configuration.SMS, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-solid fa-comment-dots',
      isActive: get(configuration, 'Signage', '')
        ? !!find(configuration.Signage, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-brands fa-facebook-square',
      isActive: get(configuration, 'Facebook', '')
        ? !!find(configuration.Facebook, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-brands fa-twitter-square',
      isActive: get(configuration, 'Twitter', '')
        ? !!find(configuration.Twitter, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-brands fa-linkedin',
      isActive: get(configuration, 'Linkedin', '')
        ? !!find(configuration.Linkedin, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-brands fa-whatsapp-square',
      isActive: get(configuration, 'Whatsapp', '')
        ? !!find(configuration.Whatsapp, ['isActive', true])
        : false
    })

    this.listConfigurationItem.push({
      icon: 'fa-brands fa-instagram-square',
      isActive: get(configuration, 'Whatsapp', '')
        ? !!find(configuration.Instagram, ['isActive', true])
        : false
    })
  }

  private fetchListActionItem(gitSource: string) {
    const currentUrl = window.location.origin
    this.listActionItem.push({
      icon: 'fa-solid fa-gears',
      url: `${currentUrl}/#/experience-builder/journey?id=${this.id}`
    })
    this.listActionItem.push({
      icon: 'fa-solid fa-eye',
      url: `${currentUrl}/#/experience-builder/previewer?id=${this.id}`
    })

    this.listActionItem.push({
      icon: 'fa-solid fa-scroll',
      url: `${currentUrl}/#/experience-builder/publisher?id=${this.id}`
    })

    this.listActionItem.push({
      icon: 'fa-solid fa-chalkboard-user',
      url: `${currentUrl}/#/experience-builder/performance?id=${this.id}`
    })
    this.listActionItem.push({
      icon: 'fa-solid fa-code-branch',
      url: gitSource ? gitSource : ''
    })
  }

  private fetchListOrentationItem() {
    this.listOrentationItem.push({
      icon: 'fa-solid fa-arrows-up-down',
      isActive: true
    })
    this.listOrentationItem.push({
      icon: 'fa-solid fa-arrows-left-right',
      isActive: true
    })
  }

  private fetchPagesAndListSlideItem(pages: PageExperience[]) {
    forEach(pages, (page) => {
      this.listSlideItem.push({
        id: page.id,
        thumbnail: page.thumbnail
      })
      this.pagesItem.push({
        id: page.id,
        title: get(page, 'title', ''),
        description: get(page, 'description', ''),
        lastUpdate: page.updatedAt,
        thumbnail: page.thumbnail,
        configuration: page.configuration
      })
    })
  }
}
