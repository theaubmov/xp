import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { PageGetResponse } from '@/interfaces/page.interface'

export interface PagesWrapper {
  getPages: (current: number) => AxiosPromise<PageGetResponse>
  searchPages: (keyword: string) => AxiosPromise<PageGetResponse>
}

export default (API: API): PagesWrapper => ({
  getPages: (current: number) => {
    const url =
      '/tf-web/v1.0/618b6fdef5dacc0001a6b1b0/search?category=pages&keyword=&page=' +
      current
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchPages: (keyword: string) => {
    const url =
      '/tf-web/v1.0/618b6fdef5dacc0001a6b1b0/search?category=pages&keyword=' +
      keyword
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
