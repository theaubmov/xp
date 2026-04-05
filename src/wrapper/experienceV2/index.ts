import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type {
  Experience,
  ExperienceCreationResponse,
  ExperienceResponse,
  SearchExperienceResponse
} from '@/interfaces/experience.interface'
import { useTokenStore } from '@/stores/token'
import type { ExperienceDTO } from '@/interfaces/dto/experience.dto'

export interface ExperienceV2Wrapper {
  getExperiences: (
    page?: number,
    size?: number
  ) => AxiosPromise<ExperienceResponse>
  searchExperiences: (
    query?: string,
    page?: number,
    size?: number
  ) => AxiosPromise<SearchExperienceResponse>
  getExperience: (id: string) => AxiosPromise<Experience>
  createExperience: (
    experience: ExperienceDTO
  ) => AxiosPromise<ExperienceCreationResponse>
  updateExperienceElement: (
    experience: Experience,
    elements: any[]
  ) => AxiosPromise<Experience>
  deleteExperienceByID: (value: string) => AxiosPromise<Experience>
}

export default (API: API): ExperienceV2Wrapper => ({
  getExperiences: (page = 0, size = 10) => {
    const url = `/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences?page=${page}&size=${size}`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchExperiences: (query = '', page = 0, size = 10) => {
    const url = `/tf-web/v1.0/618b6fdef5dacc0001a6b1b0/search?category=experiences&keyword=${query}&page=${page}&size=${size}`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getExperience: (id: string) => {
    const url = `/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences/${id}`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  createExperience: async (experience: ExperienceDTO) => {
    const tokenValue = await useTokenStore().getBearerToken()
    const url = `/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences`
    const AllNeededElementExperience = {
      ...experience,
      published: false,
      version: 1,
      tenantId: '618b6fdef5dacc0001a6b1b0',
      gitSource: '',
      medias: [],
      configuration: {},
      pages: {},
      experienceElements: []
    }
    const request = API.http.post(url, AllNeededElementExperience, {
      headers: {
        Authorization: `Bearer ${tokenValue}`
      }
    })
    return API.handleError(request)
  },
  updateExperienceElement: async (experience: Experience, elements: any[]) => {
    const tokenValue = await useTokenStore().getBearerToken()
    const url =
      '/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences/' +
      experience.id
    const request = API.http.put(
      url,
      {
        ...experience,
        experienceElements: elements
      },
      {
        headers: {
          Authorization: `Bearer ${tokenValue}`
        }
      }
    )
    return API.handleError(request)
  },
  deleteExperienceByID: async (id: string) => {
    const tokenValue = await useTokenStore().getBearerToken()
    const url =
      '/engagements-web/v1.0/618b6fdef5dacc0001a6b1b0/experiences/' + id
    const request = API.http.delete(url, {
      headers: {
        Authorization: `Bearer ${tokenValue}`
      }
    })
    return API.handleError(request)
  }
})
