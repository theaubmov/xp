import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'

export interface ContentThumbnailResponse {
  base64: string
  mimeType: string
}

export interface ContentServiceWrapper {
  getImageByThumbnailID: (
    imageID?: string
  ) => AxiosPromise<ContentThumbnailResponse>
}

export default (API: API): ContentServiceWrapper => ({
  getImageByThumbnailID: (imageID?: string) => {
    const url =
      '/content-service/v1.0/base64-content/618b6fdef5dacc0001a6b1b0/618b6fdef5dacc0001a6b1b0/1194/' +
      imageID
    const request = API.http.get(url)
    return API.handleError(request)
  }
})
