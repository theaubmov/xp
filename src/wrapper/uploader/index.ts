import type { AxiosPromise } from 'axios'
import type { API } from '@/wrapper'

export interface UploaderApiWrapper {
  uploadCollateral: (data: any) => AxiosPromise<any>
}

export default (API: API): UploaderApiWrapper => ({
  uploadCollateral: (data: any) => {
    const headers = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const url =
      '/content-service/v1.0/content/upload/EXP/618b6fdef5dacc0001a6b1b0/618b6fdef5dacc0001a6b1b0?overrideFile=true&filePath=618b6fdef5dacc0001a6b1b0'
    const formData = new FormData()
    formData.append('file', data)
    const request = API.http.post(url, formData, headers)
    return API.handleError(request)
  }
})
