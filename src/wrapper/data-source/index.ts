import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { DataSourceGetResponse } from '@/interfaces/data-source.interface'

export interface DataSourceWrapper {
  getDataSources: (current: number) => AxiosPromise<DataSourceGetResponse>
  searchDataSource: (keyword: string) => AxiosPromise<DataSourceGetResponse>
  getQueryIterationValue: (id: string) => AxiosPromise<any>
  getGroupIterationValue: (id: string, owner: string) => AxiosPromise<any>
}

export default (API: API): DataSourceWrapper => ({
  getDataSources: (current: number) => {
    const url =
      '/tf-web/v1.0/59ce808c99298e1e06660c09/search?sort=createdTimeMs,desc&category=groups&category=analytics&page=' +
      current
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchDataSource: (keyword: string) => {
    const url =
      '/tf-web/v1.0/59ce808c99298e1e06660c09/search?sort=createdTimeMs,desc&category=groups&category=analytics&keyword=' +
      keyword
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getQueryIterationValue: (id: string) => {
    const url = `/tf-web/v1.0/59ce808c99298e1e06660c09/analytic-queries/${id}/data`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getGroupIterationValue: (id: string, owner: string) => {
    const url = `/tf-web/v1.0/${owner}/schemas/${id}`
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
