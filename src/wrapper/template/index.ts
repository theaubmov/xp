import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { Template } from '@/interfaces/template-interface'

export interface TemplateWrapper {
  getTemplates: (page: number) => AxiosPromise<Template>
  searchTemplates: (query: string, page: number) => AxiosPromise<Template>
  deleteTemplate: (id: string) => AxiosPromise<Template>
}

export default (API: API): TemplateWrapper => ({
  getTemplates: (page: number) => {
    const url = `/template-service/v1.0/618b6fdef5dacc0001a6b1b0/618b6fdef5dacc0001a6b1b0/templates?sort=updatedAt,desc&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchTemplates: (query: string, page: number) => {
    const url = `template-service/v1.0/ADMIN/ADMIN/templates/search?query=${query}&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  deleteTemplate: (id: string) => {
    const url = `/template-service/v1.0/618b6fdef5dacc0001a6b1b0/618b6fdef5dacc0001a6b1b0/templates/${id}`
    const request = API.http.delete(url)
    return API.handleError(request)
  }
})
