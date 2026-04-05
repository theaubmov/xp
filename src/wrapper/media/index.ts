import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'
import type { MediaResponse } from '@/interfaces/media-interface'

export interface MediaWrapper {
  getMediaImages: (page: number) => AxiosPromise<MediaResponse>
  getMediaVideos: (page: number) => AxiosPromise<MediaResponse>
  getMediaAudios: (page: number) => AxiosPromise<MediaResponse>
  deleteMedia: (id: string) => AxiosPromise<MediaResponse>
}

export default (API: API): MediaWrapper => ({
  getMediaImages: (page: number) => {
    const url = `/content-service/v1.0/files/618b6fdef5dacc0001a6b1b0?contentType=image&sort=createdDate,desc&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getMediaVideos: (page: number) => {
    const url = `/content-service/v1.0/files/618b6fdef5dacc0001a6b1b0?contentType=video&sort=createdDate,desc&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  getMediaAudios: (page: number) => {
    const url = `/content-service/v1.0/files/618b6fdef5dacc0001a6b1b0?contentType=audio&sort=createdDate,desc&page=${page}&size=20`
    const request = API.http.get(url)
    return API.handleError(request)
  },
  deleteMedia: (id: string) => {
    const url = `/content-service/v1.0/content/${id}`
    const request = API.http.delete(url)
    return API.handleError(request)
  }
})
