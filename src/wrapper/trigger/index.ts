import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { TriggerGetResponse } from '@/interfaces/trigger.interface'

export interface TriggerWrapper {
  getTriggers: (page: number) => AxiosPromise<TriggerGetResponse>
  searchTriggers: (value: string) => AxiosPromise<TriggerGetResponse>
}

export default (API: API): TriggerWrapper => ({
  getTriggers: (page: number) => {
    const url =
      'tf-web/v1.0/59ce808c99298e1e06660c09/search?sort=createdTimeMs,desc&categoey=groups&category=contexts&size=10&page=' +
      page
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchTriggers: (value: string) => {
    const url =
      'tf-web/v1.0/59ce808c99298e1e06660c09/search?sort=createdTimeMs,desc&category=groups&category=contexts&keyword=' +
      value
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
