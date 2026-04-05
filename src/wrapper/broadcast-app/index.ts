import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { BroadCastAppResponse } from '@/interfaces/broadcast-app.interface'

export interface BroadCastAppWrapper {
  getBroadCastApp: (page: number) => AxiosPromise<BroadCastAppResponse>
  searchBroadCastApp: (
    query: string,
    page: number
  ) => AxiosPromise<BroadCastAppResponse>
  deleteBroadCastApp: (id: string) => AxiosPromise<BroadCastAppResponse>
}

export default (API: API): BroadCastAppWrapper => ({
  getBroadCastApp: (page: number) => {
    const url = `/broadcasterappstore-service/618b6fdef5dacc0001a6b1b0/1194/baApp?page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  searchBroadCastApp: (query: string, page: number) => {
    const url = `broadcasterappstore-service/59ce808c99298e1e06660c09/1194/search?byName=${query}&page=${page}&sort=updatedAt,desc&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  deleteBroadCastApp: (id: string) => {
    const url = `/broadcasterappstore-service/618b6fdef5dacc0001a6b1b0/1194/baApp/${id}`
    const request = API.http.delete(url)
    return API.handleError(request)
  }
})
