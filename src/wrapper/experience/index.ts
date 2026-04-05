import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type {
  Configuration,
  Experience,
  ExperienceResponse,
  Media
} from '@/interfaces/experience.interface'
import type {
  GroupItem,
  QueryItem,
  ContextItem
} from '@/interfaces/tab-item.interface'
import type { ExperienceDTO } from '@/interfaces/dto/experience.dto'
import type { ExperienceInformationDto } from '@/interfaces/dto/experience-information.dto'

export interface ExperienceApiWrapper {
  getExperiences: () => AxiosPromise<Experience[]>
  // getExperienceById: (id: string) => AxiosPromise<Experience>
  createExperience: (dto: ExperienceDTO) => AxiosPromise<Experience>
  createRealExperience: (dto: ExperienceDTO) => AxiosPromise<Experience>
  updateExperienceElement: (
    id: string,
    elements: any[]
  ) => AxiosPromise<Experience>
  updateExperienceInformation: (
    id: string,
    elements: ExperienceInformationDto
  ) => AxiosPromise<Experience>
  updateExperienceMedia: (
    id: string,
    elements: Media
  ) => AxiosPromise<Experience>
  updateExperienceDashboard: (
    id: string,
    dashboards: string[]
  ) => AxiosPromise<Experience>
  deleteExperienceByID: (value: string) => AxiosPromise<Experience>
  getQueries: () => AxiosPromise<QueryItem[]>
  searchQueries: (value: string) => AxiosPromise<QueryItem[]>
  getGroups: () => AxiosPromise<GroupItem[]>
  searchGroups: (value: string) => AxiosPromise<GroupItem[]>
  getContext: () => AxiosPromise<ContextItem[]>
  searchContext: (value: string) => AxiosPromise<ContextItem[]>
  getPlatformDeviceSupport: (id: string) => AxiosPromise<Configuration>
}

export default (API: API): ExperienceApiWrapper => ({
  getExperiences: () => {
    const url = '/api/experiences/'
    const request = API.http.get(url)
    return API.handleError(request)
  },
  // getExperienceById: (id: string) => {
  //   const url = '/api/experiences/' + id
  //   const request = API.http.get(url)
  //   return API.handleError(request)
  // },
  createExperience: (dto: ExperienceDTO) => {
    const url = '/api/experiences/'
    const request = API.http.post(url, dto, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
    return API.handleError(request)
  },
  createRealExperience: (dto: ExperienceDTO) => {
    const url = '/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences/'
    const request = API.http.post(url, dto)
    return API.handleError(request)
  },
  updateExperienceElement: (id: string, elements: any[]) => {
    const url = '/api/experiences/' + id
    const request = API.http.patch(url, { experienceElements: elements })
    return API.handleError(request)
  },
  updateExperienceInformation: (
    id: string,
    elements: ExperienceInformationDto
  ) => {
    const url = '/api/experiences/' + id
    const request = API.http.patch(url, elements)
    return API.handleError(request)
  },
  updateExperienceDashboard: (id: string, dashboards: string[]) => {
    const url = '/api/experiences/' + id
    const request = API.http.patch(url, { performance: dashboards })
    return API.handleError(request)
  },
  updateExperienceMedia: (id: string, elements: Media) => {
    const url = '/api/experiences/' + id + '/media'
    const request = API.http.post(url, elements)
    return API.handleError(request)
  },
  deleteExperienceByID: (id: string) => {
    const url = '/api/experiences/' + id
    const request = API.http.delete(url)
    return API.handleError(request)
  },
  getQueries: () => {
    const url = '/api/queries/'
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchQueries: (value: string) => {
    const url = '/api/queries?q=' + value
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getGroups: () => {
    const url = '/api/groups/'
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchGroups: (value: string) => {
    const url = '/api/groups?q=' + value
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getContext: () => {
    const url = '/api/context/'
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchContext: (value: string) => {
    const url = '/api/context?q=' + value
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getPlatformDeviceSupport: (id: string) => {
    const url = '/api/experiences/' + id + '/platform-device'
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
